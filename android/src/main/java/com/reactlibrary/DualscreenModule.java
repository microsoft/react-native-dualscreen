package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.microsoft.device.display.DisplayMask;

import android.content.Context;
import android.app.Activity;
import android.graphics.Rect;
import java.util.List;

public class DualscreenModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private DisplayMask displayMask = null;

    public DualscreenModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        Context context = reactContext.getBaseContext();
        if (context.getPackageManager().hasSystemFeature("com.microsoft.device.display.displaymask")) {
            this.displayMask = DisplayMask.fromResourcesRectApproximation(context);
        }
    }

    @Override
    public String getName() {
        return "Dualscreen";
    }

    @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
        // TODO: Implement some actually useful functionality
        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    }

    private void updateDeviceInfo() {
        Activity activity = reactContext.getCurrentActivity();
        if (activity != null) {

        }
    }
}
