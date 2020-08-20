import React, { useMemo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { IPaneComponent } from '../../utilities/interfaces';

import { getPaneElementSelector } from '../../shared/screenStore/paneElementStore/paneElement.selectors';
import { getHeaderSelector } from '../../shared/screenStore/headerStore/header.selector';
import { IHeaderState } from '../../shared/screenStore/headerStore/header.interface';
import { IPaneElementState } from '../../shared/screenStore/paneElementStore/paneElement.interface';

import PaneRenderer from '../paneRenderer/PaneRenderer';
import { getScreenKeyState } from '../../shared/screenStore/keyStore/key.selector';
import { DualScreenInfo, DualScreenInfoPayload, WindowRect } from 'react-native-dualscreeninfo';
import utilityStore from '../../shared/utilityStore/utilityStore.methods';
import onePane from '../../onePane/onePaneStore/onePane.methods';
import twoPane from '../../twoPane/twoPaneStore/twoPane.methods';

const TwoPaneHub = () => {

  const twoPaneElementState: IPaneElementState = getPaneElementSelector();
  const headerState: IHeaderState = getHeaderSelector();

  const keyState = getScreenKeyState();
  const [paneRects, setPaneRects] = useState<WindowRect[]>(DualScreenInfo.windowRects);

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
        paneElement: twoPaneElementState.PaneElements[val.key],
        header: headerState.headers[val.key],
        pane: val.screen
      }
    })
  }, [keyState, twoPaneElementState, headerState])

  const _handleSpanningChanged = (update: DualScreenInfoPayload) => {
    utilityStore.isTwoPane(update.isSpanning)
    if (update.isSpanning) {
      if(paneRects.length < 2)
      {
        setPaneRects(DualScreenInfo.windowRects)
      }
      onePane.mergeToOppositeScreen();
    } else {
      twoPane.mergeToOppositeScreen();
    }
  };


  const fakeWindowRect: WindowRect[] = [
    {
      x: 0,
      y: 0,
      width: 540,
      height: 720
    },
    {
      x: 573.6,
      y: 0,
      width: 540,
      height: 720
    }
  ]


  return (
    <View>
      <PaneRenderer
        prependKey={''}
        paneComponent={screenStack} 
        paneRects={fakeWindowRect}/>
    </View>

  );
};

export default TwoPaneHub;
