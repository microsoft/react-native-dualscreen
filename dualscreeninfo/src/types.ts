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

export enum DeviceOrientation {
  Portrait = 'portrait',
  Landscape = 'landscape',
  PortraitFlipped = 'portraitFlipped',
  LandscapeFlipped = 'landscapeFlipped',
};

export type DualScreenInfoPayload = {
  isSpanning: boolean,
  windowRects: [WindowRect],
  orientation: DeviceOrientation,
}

export type SpannedChangeHandler = (event: DualScreenInfoPayload) => void;
