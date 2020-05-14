/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

export type DualScreenInfoEvent = 'didUpdateSpanning' | 'windowSizeChanged';

export type WindowRect = {
  width: number;
  height: number;
  x: number;
  y: number;
}

export type DeviceRotation = 'rotation0' | 'rotation90' | 'rotation180' | 'rotation270';

export type DualScreenInfoPayload = {
  isSpanning: boolean,
  windowRects: [WindowRect],
  rotation: DeviceRotation,
}

export type SpannedChangeHandler = (event: DualScreenInfoPayload) => void;
