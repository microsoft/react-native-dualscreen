package com.microsoft.reactnativedualscreen.dualscreen

import android.content.Context
import android.graphics.Rect
import android.os.Build
import android.view.Surface
import android.view.View
import android.view.WindowManager
import androidx.annotation.RequiresApi
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
			return if(currentActivity != null && isDualScreenDevice) DisplayMask.fromResourcesRect(currentActivity) else null
		}
	private val rotation: Int
		get() {
			val wm = currentActivity?.getSystemService(Context.WINDOW_SERVICE) as WindowManager?
			return wm?.defaultDisplay?.rotation ?: Surface.ROTATION_0
		}
	private val hinge: Rect
		get() {
			val boundings = mDisplayMask?.getBoundingRectsForRotation(rotation)
			return if (boundings == null || boundings.size == 0) {
				Rect(0, 0, 0, 0)
			} else boundings[0]
		}

	private val mStatusBarHeight: Int
		@RequiresApi(Build.VERSION_CODES.M)
		get() {

			val stableInsetTop = currentActivity?.window?.decorView?.rootView?.rootWindowInsets?.stableInsetTop
			return stableInsetTop ?: 0
		}

	private val mBottomNavBarHeight: Int
		@RequiresApi(Build.VERSION_CODES.M)
		get() {
			val stableInsetBottom = currentActivity?.window?.decorView?.rootView?.rootWindowInsets?.stableInsetBottom
			return stableInsetBottom ?: 0
		}

	private val mSideNavBarHeight: Int
		@RequiresApi(Build.VERSION_CODES.M)
		get() {
			val stableInsetRight = currentActivity?.window?.decorView?.rootView?.rootWindowInsets?.stableInsetRight
			return stableInsetRight ?: 0
		}

	private val windowRects: List<Rect>
		get() {
			val boundings = mDisplayMask?.getBoundingRectsForRotation(rotation)
			var barHeights = mStatusBarHeight + mBottomNavBarHeight;
			val windowBounds = windowRect;
			return if (boundings == null || boundings.size == 0) {
				if (rotationToOrientationString(rotation) == "portrait" || rotationToOrientationString(rotation) == "portraitFlipped") {
					//single screen portrait
					windowBounds.bottom = windowRect.bottom - barHeights
				} else {
					//single screen landscape
					windowBounds.bottom = windowBounds.bottom - mStatusBarHeight;
					windowBounds.right = windowBounds.right - mSideNavBarHeight
				}
				listOf(windowBounds)
			} else {
				val hingeRect = hinge
				if (hingeRect.top == 0) {
					//dual screen portrait mode
					windowBounds.bottom = windowBounds.bottom - barHeights;
					val leftRect = Rect(0, 0, hingeRect.left, windowBounds.bottom)
					val rightRect = Rect(hingeRect.right, 0, windowBounds.right, windowBounds.bottom)
					listOf(leftRect, rightRect)
				} else {
					// dual screen landscape mode
					windowBounds.right = windowBounds.right - mSideNavBarHeight;
					hingeRect.bottom = hingeRect.bottom - mStatusBarHeight
					hingeRect.top = hingeRect.top - mStatusBarHeight
					windowBounds.bottom = windowBounds.bottom - mStatusBarHeight;
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

	private val isDualScreenDevice = reactApplicationContext.packageManager.hasSystemFeature(FEATURE_NAME)
	private var mIsSpanning: Boolean = false
	private var mWindowRects: List<Rect> = emptyList()
	private var mRotation: Int = Surface.ROTATION_0

	private val onLayoutChange = View.OnLayoutChangeListener { _, _, _, _, _, _, _, _, _ ->
		emitUpdateStateEvent()
	}

	override fun getName() = "DualScreenInfo"

	override fun initialize() {
		super.initialize()
		reactApplicationContext.addLifecycleEventListener(this)
		emitUpdateStateEvent()
	}

	override fun getConstants(): Map<String, Any>? {
		val constants: MutableMap<String, Any> = HashMap()
		constants[HINGE_WIDTH_KEY] = 34
		constants[IS_DUALSCREEN_DEVICE_KEY] = isDualScreenDevice

		return constants
	}

	override fun onHostResume() {
		val rootView: View? = currentActivity?.window?.decorView?.rootView
		rootView?.addOnLayoutChangeListener(onLayoutChange)
	}

	override fun onHostPause() {
		val rootView: View? = currentActivity?.window?.decorView?.rootView
		rootView?.removeOnLayoutChangeListener(onLayoutChange)
	}

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

	private fun convertPixelsToDp(px: Int): Double {
		val metrics = reactApplicationContext.resources.displayMetrics
		return (px.toDouble() / (metrics.density))
	}

	@ReactMethod
	fun getPayload(promise: Promise) {
		if (reactApplicationContext.hasActiveCatalystInstance()) {
			val isSpanning = isSpanning()

			val params = createMap()
			val windowRectsArray = Arguments.createArray()

			windowRects.forEach {
				val rectMap = createMap()
				rectMap.putDouble("width", convertPixelsToDp(it.right - it.left))
				rectMap.putDouble("height", convertPixelsToDp(it.bottom - it.top))
				rectMap.putDouble("x", convertPixelsToDp(it.left))
				rectMap.putDouble("y", convertPixelsToDp(it.top))
				windowRectsArray.pushMap(rectMap)
			}

			params.putBoolean("isSpanning", isSpanning)
			params.putArray("windowRects", windowRectsArray)
			params.putString("orientation", rotationToOrientationString(rotation))
			promise.resolve(params);
		}
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
					rectMap.putDouble("width", convertPixelsToDp(it.right - it.left))
					rectMap.putDouble("height",  convertPixelsToDp(it.bottom - it.top))
					rectMap.putDouble("x", convertPixelsToDp(it.left))
					rectMap.putDouble("y", convertPixelsToDp(it.top))
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