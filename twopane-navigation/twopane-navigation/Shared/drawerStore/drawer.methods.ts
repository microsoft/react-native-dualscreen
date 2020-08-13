import { store } from '../../appStore';
import { pushToDrawer } from './drawer.actions';

export const addToDrawer = (elements: JSX.Element[]) => {
  store.dispatch(pushToDrawer(elements));
};
