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

class DualScreenInfo constructor(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    private val isDualScreenDevice: Boolean
        get() =  reactApplicationContext.packageManager.hasSystemFeature(FEATURE_NAME)
	private val mDisplayMask: DisplayMask
		get() = DisplayMask.fromResourcesRectApproximation(currentActivity)
	private val rotation: Int
		get() {
			val wm = currentActivity?.getSystemService(Context.WINDOW_SERVICE) as WindowManager?
			return wm?.defaultDisplay?.rotation ?: 0
		}
	private val hinge: Rect
		get() {
			// Hinge's coordinates of its 4 edges in different mode
			// Double Landscape Rect(0, 1350 - 1800, 1434)
			// Double Portrait  Rect(1350, 0 - 1434, 1800)
			return mDisplayMask.getBoundingRectsForRotation(rotation)[0]
		}

	override fun getName() = "DualScreenInfo"

	override fun initialize() {
		super.initialize()
		createSubscription()
	}

	override fun getConstants(): Map<String, Any>? {
        val constants: MutableMap<String, Any> = HashMap()
    	constants[HINGE_WIDTH_KEY] = 34
		constants[IS_DUALSCREEN_DEVICE_KEY] = isDualScreenDevice

    	return constants
    }

	/**
	 * Resolving a promise to detect if device is in Spanned mode
	 */
    @ReactMethod
	fun isSpanned(promise: Promise) {
        val windowRect: Rect? = getWindowRect()

		// The windowRect doesn't intersect hinge
		windowRect?.let {
			if (it.width() > 0 && it.height() > 0) {
				promise.resolve(hinge.intersect(it))
			} else {
				promise.resolve(false)
			}
		}

		promise.reject(RuntimeException())
	}

	/**
	 * Resolving a promise with window rects
	 */
    @ReactMethod
    fun getWindowRects(promise: Promise) {
		val rects: List<Rect> = mDisplayMask.getBoundingRectsForRotation(rotation)
		promise.resolve(true)
    }

	fun getScreenRects(screenRect1: Rect, screenRect2: Rect, rotation: Int) {
		val windowRect = getWindowRect()
		getScreenRects(windowRect, hinge, screenRect1, screenRect2)
	}

	/**
	 * Create event emitter of spanned mode change
	 */
	private fun createSubscription() {
		val rootView: View? = currentActivity?.window?.decorView?.rootView
		rootView?.addOnLayoutChangeListener { v, left, top, right, bottom, oldLeft, oldTop, oldRight, oldBottom ->
			val params = createMap()
			val windowRect: Rect? = getWindowRect()
			var isSpanning = false

			// The windowRect doesn't intersect hinge
			windowRect?.let {
				if (it.width() > 0 && it.height() > 0) {
					isSpanning = hinge.intersect(it)
				}
			}

			params.putBoolean("isSpanned", isDual)
			params.putArray("windowRects", Arguments.createArray())
			sendEvent(reactApplicationContext, "spannedChange", params)
		}
	}

	private fun sendEvent(reactContext: ReactContext,
	                      eventName: String,
	                      params: WritableMap?) {
		reactContext
				.getJSModule(RCTDeviceEventEmitter::class.java)
				.emit(eventName, params)
	}

	private fun getWindowRect(): Rect {
		val windowRect = Rect()
		val rootView: View? = currentActivity?.window?.decorView?.rootView
		rootView?.getDrawingRect(windowRect)
		return windowRect
	}

	private fun getScreenRects(windowRect: Rect, hinge: Rect, screenRect1: Rect, screenRect2: Rect) {
		// Hinge's coordinates of its 4 edges in different mode
		// Double Landscape Rect(0, 1350 - 1800, 1434)
		// Double Portrait  Rect(1350, 0 - 1434, 1800)
		with(screenRect1) {
			left = 0
			top = 0
			right = if (hinge.left > 0) hinge.left else windowRect.right
			bottom = if (hinge.left > 0) windowRect.bottom else hinge.top
		}

		with(screenRect2) {
			left = if (hinge.left > 0) hinge.right else 0
			top = if (hinge.left > 0) 0 else hinge.bottom
			right = windowRect.right
			bottom = windowRect.bottom
		}
	}
}
