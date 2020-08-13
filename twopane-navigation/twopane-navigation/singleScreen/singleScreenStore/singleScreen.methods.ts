import { store } from '../../appStore';
import {
  screenType
} from '../../utilities/interfaces';
import { pushKey, popToFront, popScreen, moveToFront, changeScreen } from '../../Shared/screenStore/keyStore/key.actions';
import { pushHeader, replaceHeader, removeHeaderByKey } from '../../Shared/screenStore/headerStore/header.actions';
import { pushElement, removeDuexElementByKey, replaceDuexElement } from '../../Shared/screenStore/duexElementStore/duexElement.action';
import { ReactElement } from 'react';
import { IHeader } from '../../Shared/screenStore/headerStore/header.interface';
import { IKeyState, IKeyObject } from '../../Shared/screenStore/keyStore/key.interface';

/**
 * Pushes element to the top of the single screen stack
 */
const Add = (key: string, element: ReactElement, header?: IHeader, isMerge: boolean = false) => {
  store.dispatch(pushKey(screenType.SINGLE, key, isMerge));
  store.dispatch(pushElement(`${screenType.SINGLE}_${key}`, element));
  if (header) {
    store.dispatch(pushHeader(`${screenType.SINGLE}_${key}`, header));
  }
};

/**
 * Pushes element to the top of the single screen stack or if the key is already in the stack,
    move that key to the top ofthe stack 
 */
const AddOrMoveToFront = (key: string, element: React.ReactElement, header?: IHeader, isMerge: boolean = false) => {
  const keys: IKeyState = store.getState().KeyReducers;
  const singleScreenState: IKeyObject[] = keys.keys.filter(x => x.screen === screenType.SINGLE)

  if (!singleScreenState.some(val => val.key === `${screenType.SINGLE}_${key}`)) {
    Add(key, element, header, isMerge)
  } else {
    store.dispatch(moveToFront(screenType.SINGLE, `${screenType.SINGLE}_${key}`));
  }
}

/**
 * when the app screensize changes move screens marked as isMerged to the DualScreen
 */
const mergeToOppositeScreen = () => {
  const keys: IKeyState = store.getState().KeyReducers;
  keys.keys.map(val => {
    if (val.screen === screenType.SINGLE && val.isMerge) {
      store.dispatch(changeScreen(screenType.DUAL, val.key))
    }
  })
}


/**
 * Removes all elements of the single screen stack
 * and returns the base element of the single screen stack
 */
const BackToHome = () => {
  const keys: IKeyState = store.getState().KeyReducers;
  const singleScreenState: IKeyObject[] = keys.keys.filter(x => x.screen === screenType.SINGLE)

  for (let i = 1; i < singleScreenState.length; i++) {
    store.dispatch(removeHeaderByKey(singleScreenState[i].key));
    store.dispatch(removeDuexElementByKey(singleScreenState[i].key));
  }

  store.dispatch(popToFront(screenType.SINGLE));
};

/**
 * Go back one element in the single screen stack
 */
const GoBack = () => {
  const keys: IKeyState = store.getState().KeyReducers;
  const singleScreenState: IKeyObject[] = keys.keys.filter(x => x.screen === screenType.SINGLE)

  store.dispatch(removeHeaderByKey(singleScreenState.peek().key));
  store.dispatch(removeDuexElementByKey(singleScreenState.peek().key));
  store.dispatch(popScreen(screenType.SINGLE));

};


/**
 * Replace the current element for this single screen component
 */
const ReplaceScreen = (key: string, element: React.ReactElement) => {
  store.dispatch(replaceDuexElement(`${screenType.SINGLE}_${key}`, element))
}

/**
 * Replace the default header for this single screen component
 */
const ReplaceHeader = (key: string, header: IHeader) => {
  store.dispatch(replaceHeader(`${screenType.SINGLE}_${key}`, header));
};

const _singleScreenFunctions = {
  Add,
  AddOrMoveToFront,
  mergeToOppositeScreen,
  BackToHome,
  GoBack,
  ReplaceScreen,
  ReplaceHeader,
};

type singleScreenFunctions = typeof _singleScreenFunctions;

const singleScreen: singleScreenFunctions = _singleScreenFunctions;

export default singleScreen;
