package com.microsoft.reactnativedualscreen.dualscreen

import android.content.Context
import android.graphics.Rect
import android.view.View
import android.view.WindowManager
import com.facebook.react.bridge.*
import com.facebook.react.bridge.Arguments.createMap
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.microsoft.device.display.DisplayMask


const val HINGE_WIDTH_KEY = "hingeWidth"
const val IS_DUALSCREEN_DEVICE_KEY = "isDualScreenDevice"
const val FEATURE_NAME = "com.microsoft.device.display.displaymask"

class DualScreenInfo constructor(context: ReactApplicationContext) : ReactContextBaseJavaModule(context), LifecycleEventListener  {
	private val mDisplayMask: DisplayMask?
		get() {
			return if(currentActivity != null) DisplayMask.fromResourcesRect(currentActivity) else null
		}
	private val rotation: Int
		get() {
			val wm = currentActivity?.getSystemService(Context.WINDOW_SERVICE) as WindowManager?
			return wm?.defaultDisplay?.rotation ?: 0
		}
	private val hinge: Rect
		get() {
			val boundings = mDisplayMask?.getBoundingRectsForRotation(rotation)
			return if (boundings == null || boundings.size == 0) {
				Rect(0, 0, 0, 0)
			} else boundings[0]
		}
	private val windowRects: List<Rect>?
		get() = mDisplayMask?.getBoundingRectsForRotation(rotation)
	private val windowRect: Rect
		get() {
			val windowRect = Rect()
			val rootView: View? = currentActivity?.window?.decorView?.rootView
			rootView?.getDrawingRect(windowRect)
			return windowRect
		}
	private var mIsSpanning: Boolean = false

	override fun getName() = "DualScreenInfo"

	override fun initialize() {
		super.initialize()
		reactApplicationContext.addLifecycleEventListener(this)

		val rootView: View? = currentActivity?.window?.decorView?.rootView
		rootView?.addOnLayoutChangeListener { v, left, top, right, bottom, oldLeft, oldTop, oldRight, oldBottom ->
			emitUpdateStateEvent()
		}
	}

	override fun getConstants(): Map<String, Any>? {
        val constants: MutableMap<String, Any> = HashMap()
    	constants[HINGE_WIDTH_KEY] = 34
		constants[IS_DUALSCREEN_DEVICE_KEY] = reactApplicationContext.packageManager.hasSystemFeature(FEATURE_NAME)

    	return constants
    }

	override fun onHostResume() {
		emitUpdateStateEvent()
	}

	override fun onHostPause() {}

	override fun onHostDestroy() {}

	/**
	 * Resolving a promise detecting if device is in Dual modes
	 */
	private fun isSpanning(): Boolean {
		if (windowRect.width() > 0 && windowRect.height() > 0) {
			return hinge.intersect(windowRect)
		}

		return false
	}

	private fun emitUpdateStateEvent() {
		if (reactApplicationContext.hasActiveCatalystInstance()) {
			// Don't emit an event to JS if the dimensions haven't changed
			val isSpanning = isSpanning()
			if (mIsSpanning != isSpanning) {
				mIsSpanning = isSpanning

				val params = createMap()
				val windowRectsArray = Arguments.createArray()

				windowRects?.forEach {
					val rectMap = createMap()
					rectMap.putInt("width", it.right - it.left)
					rectMap.putInt("height", it.top - it.bottom)
					rectMap.putInt("x", it.left)
					rectMap.putInt("y", it.top)
					windowRectsArray.pushMap(rectMap)
				}

				params.putBoolean("isSpanning", isSpanning)
				params.putArray("windowRects", windowRectsArray)
				reactApplicationContext
						.getJSModule(RCTDeviceEventEmitter::class.java)
						.emit("didUpdateSpanning", params)
			}
		}
	}
}
