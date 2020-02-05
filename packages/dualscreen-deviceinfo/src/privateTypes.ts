/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import { NativeEventEmitter } from 'react-native';
import * as Types from './types';

interface NativeConstants {
  isDualScreenDevice: boolean;
  isSpanned: boolean;
}

interface HiddenNativeMethods {}

interface ExposedNativeMethods {
  getWindowRects: () => Types.WindowRect[];
}

export interface DualScreenInfoNativeModule
  extends NativeConstants,
    HiddenNativeMethods,
    ExposedNativeMethods,
    NativeEventEmitter {}

export interface DualScreenInfoModule extends ExposedNativeMethods {
  isSpanned: () => boolean;
  addEventListener: (
    type: Types.DualScreenInfoEvent,
    handler: Types.SpannedChangeHandler
  ) => void;
  removeEventListener: (
    type: Types.DualScreenInfoEvent,
    handler: Types.SpannedChangeHandler
  ) => void;
}
