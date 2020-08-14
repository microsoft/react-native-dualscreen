import { IDrawerAction } from './drawer.interfaces';
import { PUSH_TO_DRAWER } from './drawer.types';

/**
 * Add an element to the drawer.
 */
export const pushToDrawer = (elements: JSX.Element[]): IDrawerAction => ({
  type: PUSH_TO_DRAWER,
  payload: {
    elements
  }
});
