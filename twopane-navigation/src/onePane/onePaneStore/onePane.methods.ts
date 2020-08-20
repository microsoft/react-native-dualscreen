import { store } from '../../appStore';
import {
  paneType
} from '../../utilities/interfaces';
import { pushKey, popToFront, popScreen, moveToFront, changeScreen } from '../../shared/screenStore/keyStore/key.actions';
import { pushHeader, replaceHeader, removeHeaderByKey } from '../../shared/screenStore/headerStore/header.actions';
import { pushElement, removePaneElementByKey, replacePaneElement } from '../../shared/screenStore/paneElementStore/paneElement.action';
import { ReactElement } from 'react';
import { IHeader } from '../../shared/screenStore/headerStore/header.interface';
import { IKeyState, IKeyObject } from '../../shared/screenStore/keyStore/key.interface';

/**
 * Pushes element to the top of the onePane stack
 */
const Add = (key: string, element: ReactElement, header?: IHeader, isMerge: boolean = false) => {
  store.dispatch(pushKey(paneType.ONE, key, isMerge));
  store.dispatch(pushElement(`${paneType.ONE}_${key}`, element));
  if (header) {
    store.dispatch(pushHeader(`${paneType.ONE}_${key}`, header));
  }
};

/**
 * Pushes element to the top of the onePane stack
 */
const AddExtended = (key: string, element: ReactElement, header?: IHeader) => {
  store.dispatch(pushKey(paneType.ONE, key, false, true));
  store.dispatch(pushElement(`${paneType.ONE}_${key}`, element));
  if (header) {
    store.dispatch(pushHeader(`${paneType.ONE}_${key}`, header));
  }
};

/**
 * Pushes element to the top of the onePane stack or if the key is already in the stack,
    move that key to the top of the stack 
 */
const AddOrMoveToFront = (key: string, element: React.ReactElement, header?: IHeader, isMerge: boolean = false) => {
  const keys: IKeyState = store.getState().KeyReducers;
  const onePaneState: IKeyObject[] = keys.keys.filter(x => x.screen === paneType.ONE)

  if (!onePaneState.some(val => val.key === `${paneType.ONE}_${key}`)) {
    Add(key, element, header, isMerge)
  } else {
    store.dispatch(moveToFront(paneType.ONE, `${paneType.ONE}_${key}`));
  }
}

/**
 * when the app screen size changes move screens marked as isMerged to twoPane
 */
const mergeToOppositeScreen = () => {
  const keys: IKeyState = store.getState().KeyReducers;
  keys.keys.map(val => {
    if (val.screen === paneType.ONE && val.isMerge) {
      store.dispatch(changeScreen(paneType.TWO, val.key))
    }
  })
}


/**
 * Removes all elements of the onePane stack
 * and returns the base element of the onePane stack
 */
const BackToHome = () => {
  const keys: IKeyState = store.getState().KeyReducers;
  const onePaneState: IKeyObject[] = keys.keys.filter(x => x.screen === paneType.ONE)

  for (let i = 1; i < onePaneState.length; i++) {
    store.dispatch(removeHeaderByKey(onePaneState[i].key));
    store.dispatch(removePaneElementByKey(onePaneState[i].key));
  }

  store.dispatch(popToFront(paneType.ONE));
};

/**
 * Go back one element in the onePane stack
 */
const GoBack = () => {
  const keys: IKeyState = store.getState().KeyReducers;
  const onePaneState: IKeyObject[] = keys.keys.filter(x => x.screen === paneType.ONE)

  store.dispatch(removeHeaderByKey(onePaneState.peek().key));
  store.dispatch(removePaneElementByKey(onePaneState.peek().key));
  store.dispatch(popScreen(paneType.ONE));

};


/**
 * Replace the current element for this onePane component
 */
const ReplaceScreen = (key: string, element: React.ReactElement) => {
  store.dispatch(replacePaneElement(`${paneType.ONE}_${key}`, element))
}

/**
 * Replace the default header for this onePane component
 */
const ReplaceHeader = (key: string, header: IHeader) => {
  store.dispatch(replaceHeader(`${paneType.ONE}_${key}`, header));
};

const _onePaneFunctions = {
  Add,
  AddExtended,
  AddOrMoveToFront,
  mergeToOppositeScreen,
  BackToHome,
  GoBack,
  ReplaceScreen,
  ReplaceHeader,
};

type onePaneFunctions = typeof _onePaneFunctions;

const onePane: onePaneFunctions = _onePaneFunctions;

export default onePane;
