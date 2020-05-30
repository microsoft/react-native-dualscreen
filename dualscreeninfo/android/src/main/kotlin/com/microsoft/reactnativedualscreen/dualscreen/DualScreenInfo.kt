package com.microsoft.reactnativedualscreen.dualscreen

import android.content.Context
import android.graphics.Rect
import android.view.View
import android.view.WindowManager
import android.view.Surface
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Arguments.createMap
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter


const val HINGE_WIDTH_KEY = "hingeWidth"
const val IS_DUALSCREEN_DEVICE_KEY = "isDualScreenDevice"
const val FEATURE_NAME = "com.microsoft.device.display.displaymask"

class DualScreenInfo constructor(context: ReactApplicationContext) : ReactContextBaseJavaModule(context), LifecycleEventListener  {
	private val mDisplayMask: DisplayMaskProxy
		get() {
			return DisplayMaskProxy(currentActivity)
		}
	private val rotation: Int
		get() {
			val wm = currentActivity?.getSystemService(Context.WINDOW_SERVICE) as WindowManager?
			return wm?.defaultDisplay?.rotation ?: Surface.ROTATION_0
		}
	private val hinge: Rect
		get() {
			val boundings = mDisplayMask.getBoundingRectsForRotation(rotation)

			return if (boundings.size == 0) {
				Rect(0, 0, 0, 0)
			} else boundings[0]
		}
	private val windowRects: List<Rect>
		get() {
			val boundings = mDisplayMask.getBoundingRectsForRotation(rotation)
			val windowBounds = windowRect;
			return if (boundings.size == 0) {
				listOf(windowBounds)
			} else {
				val hingeRect = boundings[0]
				if (hingeRect.top == 0) {
					val leftRect = Rect(0, 0, hingeRect.left, windowBounds.bottom)
					val rightRect = Rect(hingeRect.right, 0, windowBounds.right, windowBounds.bottom)
					listOf(leftRect, rightRect)
				} else {
					val topRect = Rect(0, 0, windowBounds.right, hingeRect.top)
					val bottomRect = Rect(0, hingeRect.bottom, windowBounds.right, windowBounds.bottom)
					listOf(topRect, bottomRect)
				}
			}
		}
	private val windowRect: Rect
		get() {
			val windowRect = Rect()
			val rootView: View? = currentActivity?.window?.decorView?.rootView
			rootView?.getDrawingRect(windowRect)
			return windowRect
		}
	private var mIsSpanning: Boolean = false
	private var mWindowRects: List<Rect> = emptyList()
	private var mRotation: Int = Surface.ROTATION_0

	override fun getName() = "DualScreenInfo"

	override fun initialize() {
		super.initialize()
		reactApplicationContext.addLifecycleEventListener(this)

		val rootView: View? = currentActivity?.window?.decorView?.rootView
		rootView?.addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ ->
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

	private fun rotationToOrientationString(rotation : Int) : String {
		if (rotation == Surface.ROTATION_0) return "portrait"
		if (rotation == Surface.ROTATION_90) return "landscape"
		if (rotation == Surface.ROTATION_180) return "portraitFlipped"
		assert(rotation == Surface.ROTATION_270)
		return "landscapeFlipped"
	}

	private fun emitUpdateStateEvent() {
		if (reactApplicationContext.hasActiveCatalystInstance()) {
			// Don't emit an event to JS if the dimensions haven't changed
			val isSpanning = isSpanning()
			val newWindowRects = windowRects
			val newRotation = rotation
			if (mIsSpanning != isSpanning || mWindowRects != newWindowRects || mRotation != newRotation) {
				mIsSpanning = isSpanning
				mWindowRects = newWindowRects
				mRotation = newRotation

				val params = createMap()
				val windowRectsArray = Arguments.createArray()

				windowRects.forEach {
					val rectMap = createMap()
					rectMap.putInt("width", it.right - it.left)
					rectMap.putInt("height", it.bottom - it.top)
					rectMap.putInt("x", it.left)
					rectMap.putInt("y", it.top)
					windowRectsArray.pushMap(rectMap)
				}

				params.putBoolean("isSpanning", isSpanning)
				params.putArray("windowRects", windowRectsArray)
				params.putString("orientation", rotationToOrientationString(mRotation))
				reactApplicationContext
						.getJSModule(RCTDeviceEventEmitter::class.java)
						.emit("didUpdateSpanning", params)
			}
		}
	}
}
