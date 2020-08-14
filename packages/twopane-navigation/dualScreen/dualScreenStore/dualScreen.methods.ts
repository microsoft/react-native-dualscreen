import { store } from '../../appStore';
import {
  screenType
} from '../../utilities/interfaces';
import { pushKey, popToFront, popScreen, moveToFront, changeScreen } from '../../Shared/screenStore/keyStore/key.actions';
import { pushHeader, replaceHeader, removeHeaderByKey } from '../../Shared/screenStore/headerStore/header.actions';
import { pushElement, removeDuexElementByKey, replaceDuexElement } from '../../Shared/screenStore/duexElementStore/duexElement.action';
import { IHeader } from '../../Shared/screenStore/headerStore/header.interface';
import { IKeyState, IKeyObject } from '../../Shared/screenStore/keyStore/key.interface';
import _ from 'lodash';

/**
 * Pushes element to the top of the dual screen stack.
 */
const Add = (key: string, element: React.ReactElement, header?: IHeader, isMerge: boolean = false) => {

  store.dispatch(pushKey(screenType.DUAL, key, isMerge));
  store.dispatch(pushElement(`${screenType.DUAL}_${key}`, element));
  if (header) {
    store.dispatch(pushHeader(`${screenType.DUAL}_${key}`, header));
  }
};

/**
 * Pushes element to the top of the dual screen stack or if the key is already in the stack,
    move that key to the top ofthe stack 
 */
const AddOrMoveToFront = (key: string, element: React.ReactElement, header?: IHeader, isMerge: boolean = false,) => {
  const keys: IKeyState = store.getState().KeyReducers;
  const dualScreenState: IKeyObject[] = keys.keys.filter(x => x.screen === screenType.DUAL)

  if (!dualScreenState.some(val => val.key === `${screenType.DUAL}_${key}`)) {
    Add(key, element, header, isMerge)
  } else {
    store.dispatch(moveToFront(screenType.DUAL, `${screenType.DUAL}_${key}`));
  }
}
/**
 * when the app screensize changes move screens marked as isMerged to the singleScreen
 */
const mergeToOppositeScreen = () => {
  const keys: IKeyState = store.getState().KeyReducers;
  keys.keys.map(val => {
    if (val.screen === screenType.DUAL && val.isMerge) {
      store.dispatch(changeScreen(screenType.SINGLE, val.key))
    }
  })

}

/**
 * Removes all elements of the dual screen stack
 * and returns the base element of the dual screen stack
 */
const BackToHome = () => {
  const keys: IKeyState = store.getState().KeyReducers;
  const dualScreenState: IKeyObject[] = keys.keys.filter(x => x.screen === screenType.DUAL)

  for (let i = 1; i < dualScreenState.length; i++) {
    store.dispatch(removeHeaderByKey(dualScreenState[i].key));
    store.dispatch(removeDuexElementByKey(dualScreenState[i].key));
  }
  store.dispatch(popToFront(screenType.DUAL));
};

/**
 * Go back one element in the dual screen stack
 */
const GoBack = () => {
  const keys: IKeyState = store.getState().KeyReducers;
  const dualScreenState: IKeyObject[] = keys.keys.filter(x => x.screen === screenType.DUAL)

  store.dispatch(removeHeaderByKey(dualScreenState.peek().key));
  store.dispatch(removeDuexElementByKey(dualScreenState.peek().key));
  store.dispatch(popScreen(screenType.DUAL));

};

/**
 * Replace the current element for this dual screen component
 */
const ReplaceScreen = (key: string, element: React.ReactElement) => {
  store.dispatch(replaceDuexElement(`${screenType.DUAL}_${key}`, element))
}

/**
 * Replace the default header for this dual screen component
 */
const ReplaceHeader = (key: string, header: IHeader) => {
  store.dispatch(replaceHeader(key, header));
};

const _dualScreenFunctions = {
  Add,
  AddOrMoveToFront,
  mergeToOppositeScreen,
  BackToHome,
  GoBack,
  ReplaceScreen,
  ReplaceHeader,
};

type dualScreenFunctions = typeof _dualScreenFunctions;

const dualScreen: dualScreenFunctions = _dualScreenFunctions;

export default dualScreen;
