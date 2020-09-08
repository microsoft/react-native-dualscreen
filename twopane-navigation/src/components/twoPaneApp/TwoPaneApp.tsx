import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { DualScreenInfo, DualScreenInfoPayload } from 'react-native-dualscreeninfo';
import { store } from '../../appStore';
import { ITwoPaneAppProps } from '../../utilities/interfaces';
import TwoPaneHub from '../twoPaneHub/TwoPaneHub';
import onePane from '../../onePane/onePaneStore/onePane.methods';
import twoPane from '../../twoPane/twoPaneStore/twoPane.methods';
import utilityStore from '../../shared/utilityStore/utilityStore.methods';

const TwoPaneApp = (props: ITwoPaneAppProps) => {

  const screenState = store.getState().KeyReducers.keys;
  //TODO: possibly look into utility state for things like isMount to keep data between renders
  const hasOnePaneDefault: boolean = screenState.some(val => val.key === (`ONE_${props.onePaneDefault.key}`));
  const hasTwoPaneDefault: boolean = screenState.some(val => val.key === (`TWO_${props.twoPaneDefault.key}`));

  useEffect(() => {
    if (!hasOnePaneDefault && !hasTwoPaneDefault) {
      onePane.Add(props.onePaneDefault.key, props.onePaneDefault.paneElement, props?.onePaneDefault?.header!);
      twoPane.Add(props.twoPaneDefault.key, props.twoPaneDefault.paneElement, props?.twoPaneDefault?.header!);

      if(props.config !== undefined)
      {
        utilityStore.pushConfig(props.config);
      }
    }

    utilityStore.isTwoPane(DualScreenInfo.isSpanning)
    DualScreenInfo.addEventListener('didUpdateSpanning', _handleSpanningChanged);
    return () => {
      DualScreenInfo.removeEventListener('didUpdateSpanning', _handleSpanningChanged);
    }
  }, []);

  const _handleSpanningChanged = (update: DualScreenInfoPayload) => {
    utilityStore.isTwoPane(update.isSpanning)

    if (update.isSpanning) {
      utilityStore.pushPaneRects(update.windowRects)
      onePane.mergeToOppositePane();
    } else {
      utilityStore.pushPaneRects(update.windowRects)
      twoPane.mergeToOppositePane();
    }
  };

  return (
    <Fragment key={'App Component'}>
      <Provider store={store}>
        {props.navigationContainer !== undefined ? (
          props.navigationContainer
        ) : (
            <Fragment>
              <TwoPaneHub />
            </Fragment>
          )}
      </Provider>
    </Fragment>
  );
};

export default TwoPaneApp;
