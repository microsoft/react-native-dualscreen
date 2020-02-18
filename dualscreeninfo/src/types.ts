/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

export type DualScreenInfoEvent = 'spannedChange' | 'windowSizeChanged';

export type WindowRect = {
  width: number;
  height: number;
  x: number;
  y: number;
}

export type SpannedChangeEvent = {
  isSpanned: boolean,
  windowRects: [WindowRect]
}

export type SpannedChangeHandler = (event: SpannedChangeEvent) => void;
