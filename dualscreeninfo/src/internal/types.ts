/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

export type DualScreenInfoEvent = 'spannedChange' | 'windowSizeChanged';

export interface WindowRect {
  width: number;
  height: number;
  x: number;
  y: number;
}

export type SpannedChangeHandler = (
  isSpanned: boolean,
  windowRects: WindowRect
) => void;
