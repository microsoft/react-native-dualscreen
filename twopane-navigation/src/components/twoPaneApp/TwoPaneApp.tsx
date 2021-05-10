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
  const hasOnePaneDefault: boolean = screenState.some(val => val.key === (`ONE_${props.onePaneDefault.key}`));
  const hasTwoPaneDefault: boolean = screenState.some(val => val.key === (`TWO_${props.twoPaneDefault.key}`));

  const getPayloadAsync = async () => {
    const payload = await DualScreenInfo.getPayload();
    _handleSpanningChanged(payload);
  }

  useEffect(() => {
    getPayloadAsync();
    
    if (!hasOnePaneDefault && !hasTwoPaneDefault) {
      onePane.Add(props.onePaneDefault.key, props.onePaneDefault.paneElement, props?.onePaneDefault?.header!, false, props?.onePaneDefault?.extensionOptions);
      twoPane.Add(props.twoPaneDefault.key, props.twoPaneDefault.paneElement, props?.twoPaneDefault?.header!, false, props?.twoPaneDefault?.extensionOptions);

      if(props.config !== undefined)
      {
        utilityStore.pushConfig(props.config);
      }
    }

    utilityStore.pushIsTwoPane(DualScreenInfo.isSpanning)
    DualScreenInfo.addEventListener('didUpdateSpanning', _handleSpanningChanged);
    return () => {
      DualScreenInfo.removeEventListener('didUpdateSpanning', _handleSpanningChanged);
    }
  }, []);

  const _handleSpanningChanged = (update: DualScreenInfoPayload) => {
    utilityStore.pushIsTwoPane(update.isSpanning)
    utilityStore.pushOrientation(update.orientation)
    utilityStore.pushPaneRects(update.windowRects)
    
    if (update.isSpanning) {
      onePane.mergeToOppositePane();
    } else {
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
