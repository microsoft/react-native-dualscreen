package com.microsoft.reactnativedualscreen.dualscreen

import android.app.Activity
import android.graphics.Rect
import kotlin.reflect.KCallable
import kotlin.reflect.full.staticFunctions

class DisplayMaskProxy(currentActivity: Activity?) {

    private val mDisplayMask: Any?
    private val getBoundingRectsForRotationDelegate: KCallable<MutableList<Rect>?>?

    init {
        var displayMask: Any? = null;
        var getBoundingRectsForRotation: KCallable<*>? = null;
        try {
            if (currentActivity != null) {
                val displayMaskClass = Class.forName("com.microsoft.device.display.DisplayMask", true, this.javaClass.classLoader)
                val fromResourcesRect = displayMaskClass.kotlin.staticFunctions.find { m -> m.name == "fromResourcesRect" }

                displayMask = fromResourcesRect?.call(currentActivity)
                getBoundingRectsForRotation = if (displayMask != null) displayMask::class.members.find { m -> m.name == "getBoundingRectsForRotation" }
                    else null
            }
        } catch (e: ClassNotFoundException) {
        }
        getBoundingRectsForRotationDelegate = getBoundingRectsForRotation as KCallable<MutableList<Rect>?>?
        mDisplayMask = displayMask
    }

    fun getBoundingRectsForRotation(rotation: Int): MutableList<Rect> {
        return getBoundingRectsForRotationDelegate?.call(mDisplayMask, rotation) ?: mutableListOf()
    }


}