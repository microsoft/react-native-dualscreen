import { PUSH_TO_DRAWER } from './drawer.types';
import { IDrawerState, IDrawerAction } from './drawer.interfaces';

const initialState: IDrawerState = {
  drawerItems: []
};

const drawerReducer = (
  state: IDrawerState = initialState,
  action: IDrawerAction
) => {
  switch (action.type) {
    case PUSH_TO_DRAWER: {
      const newItems = state.drawerItems;
      action.payload.elements.forEach(element => {
        newItems.push(element);
      });
      return {
        ...state,
        drawerItems: newItems
      };
    }
    default:
      return state;
  }
};

export default drawerReducer;
