/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import { Platform, NativeModules } from 'react-native';
import { DualScreenInfoNativeModule } from './privateTypes';

const DualScreenInfo: DualScreenInfoNativeModule | undefined =
  NativeModules.DualscreenDeviceinfo;

if (!DualScreenInfo) {
  if (Platform.OS === 'android' || Platform.OS === 'windows') {
    throw new Error(
      '@microsoft/react-native-dualscreen is null. Helpful message goes here.'
    );
  }
}

export default DualScreenInfo as DualScreenInfoNativeModule;
