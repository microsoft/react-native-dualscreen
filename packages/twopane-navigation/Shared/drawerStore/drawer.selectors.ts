import { useSelector } from 'react-redux';
import { rootReducerType } from '../../appStore';
import { IDrawerState } from './drawer.interfaces';

export const getDrawerItems = (): JSX.Element[] => {
  return useSelector(
    (state: rootReducerType) => state.drawerReducer.drawerItems
  );
};
