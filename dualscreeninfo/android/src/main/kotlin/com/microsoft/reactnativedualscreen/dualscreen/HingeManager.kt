package com.microsoft.reactnativedualscreen.dualscreen

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

@ReactModule(name = HingeManager.reactClass)
class HingeManager : SimpleViewManager<Hinge>() {

    companion object {
        const val reactClass = "RNHinge"
    }

    override fun getName(): String {
        return reactClass
    }

    override fun createViewInstance(reactContext: ThemedReactContext): Hinge {
        return Hinge(reactContext)
    }
}
