package com.reactnativedualscreenexample;

import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReactNativeDualScreenExample";
    }

    // https://docs.swmansion.com/react-native-gesture-handler/docs/guides/migrating-off-rnghenabledroot/

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
       return new ReactActivityDelegate(this, getMainComponentName()) {
          @Override
          protected ReactRootView createRootView() {
            return new ReactRootView(getContext());
          }
       };
    }
}
