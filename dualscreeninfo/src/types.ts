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

export type DualScreenInfoPayload = {
  isSpanning: boolean,
  windowRects: [WindowRect],
  rotation: number
}

export type SpannedChangeHandler = (event: DualScreenInfoPayload) => void;
