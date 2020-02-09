/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import NativeInterface from './internal/nativeInterface';
import { DualScreenInfoModule } from './internal/privateTypes';
import { DualScreenInfoEvent, SpannedChangeHandler } from './internal/types';

export function isDualScreenDevice() {
  return NativeInterface.isDualScreenDevice;
}

export function isSpanned() {
  return NativeInterface.isSpanned;
}

export function getWindowRects() {
  return NativeInterface.getWindowRects();
}

export function addEventListener(
  type: DualScreenInfoEvent,
  handler: SpannedChangeHandler
) {
  return NativeInterface.eventEmitter.addListener(type, handler);
}

export function removeEventListener(
  type: DualScreenInfoEvent,
  handler: SpannedChangeHandler
) {
  return NativeInterface.eventEmitter.removeListener(type, handler);
}

const dualScreenInfoModule: DualScreenInfoModule = {
  isDualScreenDevice,
  isSpanned,
  getWindowRects,
  addEventListener,
  removeEventListener,
};

export default dualScreenInfoModule;
