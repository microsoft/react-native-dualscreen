/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import NativeInterface from './internal/nativeInterface';
import { DualScreenInfoModule } from './internal/privateTypes';
import { DualScreenInfoEvent, SpannedChangeHandler } from './internal/types';

export function getWindowRects() {
  return NativeInterface.getWindowRects();
}

export function isSpanned() {
  return NativeInterface.isSpanned;
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
  getWindowRects,
  isSpanned,
  addEventListener,
  removeEventListener,
};

export default dualScreenInfoModule;
