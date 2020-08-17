import React, { useMemo, useEffect } from 'react';
import { View } from 'react-native';
import { IPaneComponent } from '../../utilities/interfaces';

import { getPaneElementSelector } from '../../Shared/screenStore/paneElementStore/paneElement.selectors';
import { getHeaderSelector } from '../../Shared/screenStore/headerStore/header.selector';
import { IHeaderState } from '../../Shared/screenStore/headerStore/header.interface';
import { IPaneElementState } from '../../Shared/screenStore/paneElementStore/paneElement.interface';

import ScreenRenderer from '../paneRenderer/PaneRenderer';
import { getScreenKeyState } from '../../Shared/screenStore/keyStore/key.selector';
import { DualScreenInfo, DualScreenInfoPayload } from 'react-native-dualscreeninfo';
import utilityStore from '../../Shared/utilityStore/utilityStore.methods';
import onePane from '../../onePane/onePaneStore/onePane.methods';
import twoPane from '../../twoPane/twoPaneStore/twoPane.methods';


const TwoPaneHub = () => {

  const twoPaneElementState: IPaneElementState = getPaneElementSelector();
  const headerState: IHeaderState = getHeaderSelector();

  const keyState = getScreenKeyState();

  useEffect(() => {
    utilityStore.isTwoPane(DualScreenInfo.isSpanning)
    DualScreenInfo.addEventListener('didUpdateSpanning', _handleSpanningChanged);

    return () => {
      DualScreenInfo.removeEventListener('didUpdateSpanning', _handleSpanningChanged);
    }
  }, [])

  const screenStack: IPaneComponent[] = useMemo(() => {
    return keyState.keys.map((val, index) => {
      return {
        key: val.key,
        twoPaneElement: twoPaneElementState.PaneElements[val.key],
        header: headerState.headers[val.key],
        screen: val.screen
      }
    })
  }, [keyState, twoPaneElementState, headerState])

  const _handleSpanningChanged = (update: DualScreenInfoPayload) => {
    utilityStore.isTwoPane(update.isSpanning)
    if (update.isSpanning) {
      onePane.mergeToOppositeScreen();
    } else {
      twoPane.mergeToOppositeScreen();
    }
  };

  return (
    <View>
      <ScreenRenderer
        prependKey={''}
        screenComponent={screenStack} />
    </View>

  );
};

export default TwoPaneHub;
