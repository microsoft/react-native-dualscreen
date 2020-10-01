import React from 'react';
import { store } from '../appStore';

const isTwoPane = (): boolean => {
  return store.getState().utilityStoreReducer.isTwoPane
};

const _utilityFunctions = {
  isTwoPane,
};

type utilityFunctions = typeof _utilityFunctions;

const utility: utilityFunctions = _utilityFunctions;

export default utility;
