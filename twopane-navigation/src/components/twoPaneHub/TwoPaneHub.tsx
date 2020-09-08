import React, { useMemo, useEffect, useState, Fragment } from 'react';
import { View } from 'react-native';
import { IPaneComponent } from '../../utilities/interfaces';

import { getPaneElementSelector } from '../../shared/screenStore/paneElementStore/paneElement.selectors';
import { getHeaderSelector } from '../../shared/screenStore/headerStore/header.selector';
import { IHeaderState } from '../../shared/screenStore/headerStore/header.interface';
import { IPaneElementState } from '../../shared/screenStore/paneElementStore/paneElement.interface';

import PaneRenderer from '../paneRenderer/PaneRenderer';
import { getScreenKeyState } from '../../shared/screenStore/keyStore/key.selector';
import { IUtilityStoreState } from '../../shared/utilityStore/utilityStore.interfaces';
import { getUtilityStore } from '../../shared/utilityStore/utilityStore.selectors';

const TwoPaneHub = () => {

  const utilityState: IUtilityStoreState = getUtilityStore();
  const twoPaneElementState: IPaneElementState = getPaneElementSelector();
  const headerState: IHeaderState = getHeaderSelector();

  const keyState = getScreenKeyState();
  const screenStack: IPaneComponent[] = useMemo(() => {
    return keyState.keys.map((val, index) => {
      return {
        key: val.key,
        paneElement: twoPaneElementState.PaneElements[val.key],
        header: headerState.headers[val.key],
        pane: val.screen,
        isExtended: val.isExtended
      }
    })
  }, [keyState, twoPaneElementState, headerState])

  return (
    <Fragment>
      { utilityState.paneRects.length > 0 &&
        <PaneRenderer
          paneComponent={screenStack} 
          paneRects={utilityState.paneRects}/>
      }
    </Fragment>

  );
};

export default TwoPaneHub;
