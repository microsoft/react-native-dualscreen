import { useRef, useEffect } from 'react';
import { store } from '../appStore';

const isDualScreen = (): boolean => {
  return store.getState().utilityStoreReducer.isDualScreen
};

const _utilityFunctions = {
  isDualScreen,
};

type utilityFunctions = typeof _utilityFunctions;

const utility: utilityFunctions = _utilityFunctions;

export default utility;
