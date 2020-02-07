/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import { Platform, NativeModules, NativeEventEmitter } from 'react-native';
import { DualScreenInfoNativeModule } from './privateTypes';

const DualScreenInfo: DualScreenInfoNativeModule | undefined =
  NativeModules.DualScreenInfo;

if (!DualScreenInfo) {
  if (Platform.OS === 'android' || Platform.OS === 'windows') {
    throw new Error(
      '@microsoft/react-native-dualscreen is null. Helpful message goes here.'
    );
  }
}

// Exporting this way to be able to fire events in tests
let nativeEventEmitter: NativeEventEmitter | null = null;
export default {
  ...(DualScreenInfo as DualScreenInfoNativeModule),
  get eventEmitter(): NativeEventEmitter {
    if (!nativeEventEmitter) {
      // @ts-ignore
      nativeEventEmitter = new NativeEventEmitter(DualScreenInfo);
    }
    // @ts-ignore
    return nativeEventEmitter;
  },
};
