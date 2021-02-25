import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { store } from '../appStore';

const isTwoPane = (): boolean => {
  return store.getState().utilityStoreReducer.isTwoPane
};

function useBackHandler(handler: () => boolean) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)

    return () => BackHandler.removeEventListener('hardwareBackPress', handler)
  }, [handler])
}

const _utilityFunctions = {
  isTwoPane,
  useBackHandler
};
type utilityFunctions = typeof _utilityFunctions;

const utility: utilityFunctions = _utilityFunctions;

export default utility;
