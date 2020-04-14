/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

export type PaneModeType = "Auto" | "Single" | "Dual";
export type PaneModeTypes = {
  Auto: PaneModeType,
  Single: PaneModeType,
  Dual: PaneModeType
}
export type PanePriorityType = "pane1" | "pane2" ;
export type PanePriorityTypes = {
  Pane1: PanePriorityType,
  Pane2: PanePriorityType
}
export type PaneOrientationType = "horizontal" | "vertical" ;
export type PaneOrientationTypes = {
  Horizontal: PaneOrientationType,
  Vertical: PaneOrientationType
}