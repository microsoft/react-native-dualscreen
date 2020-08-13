import { useRef, useEffect } from 'react';
import { store } from '../appStore';

const isDualScreen = (): boolean => {
  return store.getState().utilityStoreReducer.isDualScreen
};

export const usePrevious = <T extends {}>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const _utilityFunctions = {
  isDualScreen,
  usePrevious
};

type utilityFunctions = typeof _utilityFunctions;

const utility: utilityFunctions = _utilityFunctions;

export default utility;
