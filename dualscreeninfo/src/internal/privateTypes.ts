/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
import * as Types from './types';

export interface NativeConstants {
  isDualScreenDevice: boolean;
  isSpanned: boolean;
}

export interface HiddenNativeMethods {}

export interface ExposedNativeMethods {
  getWindowRects: () => Types.WindowRect[];
}

export interface DualScreenInfoNativeModule
  extends NativeConstants,
    HiddenNativeMethods,
    ExposedNativeMethods {}

export interface DualScreenInfoModule extends ExposedNativeMethods {
  isDualScreenDevice: () => boolean;
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
