/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import DualScreenInfo from './nativeinterface';
import { DualScreenInfoModule } from './privateTypes';
import { DualScreenInfoEvent, SpannedChangeHandler } from './types';

export function getWindowRects() {
  return DualScreenInfo.getWindowRects();
}

export function isSpanned() {
  return DualScreenInfo.isSpanned;
}

export function addEventListener(
  type: DualScreenInfoEvent,
  handler: SpannedChangeHandler
) {
  return DualScreenInfo.addListener(type, handler);
}

export function removeEventListener(
  type: DualScreenInfoEvent,
  handler: SpannedChangeHandler
) {
  return DualScreenInfo.removeListener(type, handler);
}

const dualScreenInfoModule: DualScreenInfoModule = {
  getWindowRects,
  isSpanned,
  addEventListener,
  removeEventListener
};

export default dualScreenInfoModule;
