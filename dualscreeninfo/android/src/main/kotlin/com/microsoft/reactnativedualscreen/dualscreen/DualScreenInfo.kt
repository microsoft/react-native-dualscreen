package com.microsoft.reactnativedualscreen.dualscreen

import android.graphics.Rect
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Arguments.createMap
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.microsoft.device.dualscreen.layout.ScreenHelper
import com.microsoft.device.dualscreen.layout.ScreenModeListener
import com.microsoft.device.dualscreen.layout.SurfaceDuoScreenManager

const val HINGE_WIDTH_KEY = "hingeWidth"
const val IS_DUALSCREEN_DEVICE_KEY = "isDualScreenDevice"

class DualScreenInfo constructor(context: ReactApplicationContext) :
	ReactContextBaseJavaModule(context), LifecycleEventListener, ScreenModeListener {
	private val surfaceDuoScreenManager: SurfaceDuoScreenManager?
		get() = if (currentActivity != null) SurfaceDuoScreenManager.init(currentActivity!!.application) else null
	private val windowRects: List<Rect>?
		get() = if (currentActivity != null) ScreenHelper.getScreenRectangles(currentActivity!!) else null
	private val isDualMode: Boolean
			get() = if (currentActivity != null) ScreenHelper.isDualMode(currentActivity!!) else false
	private var mIsSpanning = false

	override fun getName() = "DualScreenInfo"

	override fun initialize() {
		super.initialize()
		reactApplicationContext.addLifecycleEventListener(this)
		surfaceDuoScreenManager?.addScreenModeListener(this)
	}

	override fun getConstants(): Map<String, Any>? {
		val constants: MutableMap<String, Any> = HashMap()
		constants[HINGE_WIDTH_KEY] = 34
		constants[IS_DUALSCREEN_DEVICE_KEY] = if (currentActivity != null) ScreenHelper.isDeviceSurfaceDuo(currentActivity!!) else false

		return constants
	}

	override fun onHostResume() {
		emitUpdateStateEvent(isDualMode)
	}

	override fun onHostPause() {}

	override fun onHostDestroy() {}

	override fun onSwitchToDualScreenMode() {
		emitUpdateStateEvent(true)
	}

	override fun onSwitchToSingleScreenMode() {
		emitUpdateStateEvent(false)
	}

	private fun emitUpdateStateEvent(isSpanning: Boolean) {
		if (reactApplicationContext.hasActiveCatalystInstance()) {
			// Don't emit an event to JS if the dimensions haven't changed
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
