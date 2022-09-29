package com.microsoft.reactnativedualscreen.dualscreen

import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.Rect
import android.util.Log
import android.view.View
import com.microsoft.device.display.DisplayMask

class Hinge(context: Context) : View(context) {
    private val mDisplayMask: DisplayMask
        get() {
            Log.i("RNFOLD","mDisplayMask")
            return DisplayMask.fromResourcesRectApproximation(context)
        }
    private val rotation: Int = 0
    private var paint: Paint = Paint()
    private val hinge: Rect
        get() {
            Log.i("RNFOLD","hinge")
            // Hinge's coordinates of its 4 edges in different mode
            // Double Landscape Rect(0, 1350 - 1800, 1434)
            // Double Portrait  Rect(1350, 0 - 1434, 1800)
            var rects = mDisplayMask.getBoundingRectsForRotation(rotation);
            if (rects.count() > 0) {
                Log.i("RNFOLD","rects exist for rotation " + rotation.toString())
                val rect = mDisplayMask.getBoundingRectsForRotation(rotation)[0]
                return rect
            } else {
                Log.i("RNFOLD","NO rects for rotation" + rotation.toString())
                return Rect()
            }
        }

    override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas)
        canvas?.drawRect(hinge, paint)
    }
}
