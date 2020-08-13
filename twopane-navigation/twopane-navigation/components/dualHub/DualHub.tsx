import React, { useMemo, useEffect } from 'react';
import { View } from 'react-native';
import { IScreenComponent } from '../../utilities/interfaces';

import { getDuexElementSelector } from '../../Shared/screenStore/duexElementStore/duexElement.selectors';
import { getHeaderSelector } from '../../Shared/screenStore/headerStore/header.selector';
import { IHeaderState } from '../../Shared/screenStore/headerStore/header.interface';
import { IDuexElementState } from '../../Shared/screenStore/duexElementStore/duexElement.interface';

import ScreenRenderer from '../screenRenderer/ScreenRenderer';
import { getScreenKeyState } from '../../Shared/screenStore/keyStore/key.selector';
import { DualScreenInfo, DualScreenInfoPayload } from 'react-native-dualscreeninfo';
import utilityStore from '../../Shared/utilityStore/utilityStore.methods';
import singleScreen from '../../singleScreen/singleScreenStore/singleScreen.methods';
import dualScreen from '../../dualScreen/dualScreenStore/dualScreen.methods';


const DualHub = () => {

  const duexElementState: IDuexElementState = getDuexElementSelector();
  const headerState: IHeaderState = getHeaderSelector();

  const keyState = getScreenKeyState();

  useEffect(() => {
    utilityStore.isDualScreen(DualScreenInfo.isSpanning)
    DualScreenInfo.addEventListener('didUpdateSpanning', _handleSpanningChanged);

    return () => {
      DualScreenInfo.removeEventListener('didUpdateSpanning', _handleSpanningChanged);
    }
  }, [])

  const screenStack: IScreenComponent[] = useMemo(() => {
    return keyState.keys.map((val, index) => {
      return {
        key: val.key,
        duexElement: duexElementState.duexElements[val.key],
        header: headerState.headers[val.key],
        screen: val.screen
      }
    })
  }, [keyState, duexElementState, headerState])

  const _handleSpanningChanged = (update: DualScreenInfoPayload) => {
    utilityStore.isDualScreen(update.isSpanning)
    if (update.isSpanning) {
      singleScreen.mergeToOppositeScreen();
    } else {
      dualScreen.mergeToOppositeScreen();
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

export default DualHub;
