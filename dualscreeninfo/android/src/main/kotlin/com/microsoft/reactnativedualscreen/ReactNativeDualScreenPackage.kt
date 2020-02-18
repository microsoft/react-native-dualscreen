package com.microsoft.reactnativedualscreen

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

import com.microsoft.reactnativedualscreen.dualscreen.DualScreenInfo
import com.microsoft.reactnativedualscreen.dualscreen.HingeManager

class ReactNativeDualScreenPackage : ReactPackage {
	override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
		return listOf(
				DualScreenInfo(reactContext)
		)
	}

	override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
		return listOf(
				HingeManager()
		)
	}
}
