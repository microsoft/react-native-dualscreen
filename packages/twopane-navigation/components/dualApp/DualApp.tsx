import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';

import { store } from '../../appStore';
import { IScreenComponent } from '../../utilities/interfaces';
import DualHub from '../dualHub/DualHub';
import singleScreen from '../../singleScreen/singleScreenStore/singleScreen.methods';
import dualScreen from '../../dualScreen/dualScreenStore/dualScreen.methods';

export interface IDualAppProps {
  /**
   * Default element for single screen mode
   */
  singleScreen: IScreenComponent;

  /**
   * Default element for dual screen mode
   */
  dualScreen: IScreenComponent;

  /**
   * AppContainer if using React Navigation
   */
  navigationContainer?: JSX.Element;

  /**
   * Items to render in app drawer. If empty, drawer will not be included.
   */
  drawerItems?: JSX.Element[];
}

const DualApp = (props: IDualAppProps) => {

  const screenState = store.getState().KeyReducers.keys;
  //TODO: possibly look into utility state for things like isMount to keep data between renders
  const hasSingle: boolean = screenState.some(val => val.key === (`SINGLE_${props.singleScreen.key}`));
  const hasDual: boolean = screenState.some(val => val.key === (`DUAL_${props.singleScreen.key}`));

  useEffect(() => {
    if (!hasSingle && !hasDual) {
      singleScreen.Add(props.singleScreen.key, props.singleScreen.duexElement, props?.singleScreen?.header!);
      dualScreen.Add(props.dualScreen.key, props.dualScreen.duexElement, props?.dualScreen?.header!);
    }
  }, []);

  return (
    <Fragment key={'App Component'}>
      <Provider store={store}>
        {props.navigationContainer !== undefined ? (
          props.navigationContainer
        ) : (
            <Fragment>
              <DualHub />
            </Fragment>
          )}
      </Provider>
    </Fragment>
  );
};

export default DualApp;
