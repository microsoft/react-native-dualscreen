import { store } from '../../appStore';
import {
  paneType
} from '../../utilities/interfaces';
import { pushKey, popToFront, popScreen, moveToFront, changeScreen } from '../../shared/screenStore/keyStore/key.actions';
import { pushHeader, replaceHeader, removeHeaderByKey } from '../../shared/screenStore/headerStore/header.actions';
import { pushElement, removePaneElementByKey, replacePaneElement } from '../../shared/screenStore/paneElementStore/paneElement.action';
import { IHeader } from '../../shared/screenStore/headerStore/header.interface';
import { IKeyState, IKeyObject } from '../../shared/screenStore/keyStore/key.interface';
import { ReactElement } from 'react';


const AddPaneElement= (key: string, element: ReactElement, header?: IHeader, isMerge: boolean = false) => {
    store.dispatch(pushKey(paneType.TWO, key, isMerge));
    store.dispatch(pushElement(`${paneType.TWO}_${key}`, element));
    if (header) {
      store.dispatch(pushHeader(`${paneType.TWO}_${key}`, header));
    }
}

/**
 * Pushes element to the top of the twoPane stack or replaces the original with the new element
 */
const Add = (key: string, element: ReactElement, header?: IHeader, isMerge: boolean = false) => {
  const keys: IKeyState = store.getState().KeyReducers;
  const index = keys.keys.findIndex(val => val.key === `${paneType.TWO}_${key}`);
  if(index > -1) {
    //remove old entry
    store.dispatch(removeHeaderByKey(keys.keys[index].key))
    store.dispatch(removePaneElementByKey(keys.keys[index].key))
    
    // push new entry
    store.dispatch(pushElement(`${paneType.TWO}_${key}`, element));
    if (header) {
      store.dispatch(pushHeader(`${paneType.TWO}_${key}`, header));
    }
    store.dispatch(moveToFront(paneType.TWO, `${paneType.TWO}_${key}`));
  
  } else {
    AddPaneElement(key, element, header, isMerge)
  }
};

/**
 * Pushes element to the top of the twoPane stack or moves the original to the top of the stack
 */
const AddOrMoveToFront = (key: string, element: ReactElement, header?: IHeader, isMerge: boolean = false,) => {
  const keys: IKeyState = store.getState().KeyReducers;
  const twoPaneState: IKeyObject[] = keys.keys.filter(x => x.screen === paneType.TWO)

  if (!twoPaneState.some(val => val.key === `${paneType.TWO}_${key}`)) {
    AddPaneElement(key, element, header, isMerge)
  } else {
    store.dispatch(moveToFront(paneType.TWO, `${paneType.TWO}_${key}`));
  }
}
/**
 * when the app screen size changes move screens marked as isMerged to onePane
 */
const mergeToOppositeScreen = () => {
  const keys: IKeyState = store.getState().KeyReducers;
  keys.keys.map(val => {
    if (val.screen === paneType.TWO && val.isMerge) {
      store.dispatch(changeScreen(paneType.ONE, val.key))
    }
  })

}

/**
 * Removes all elements of the twoPane stack
 * and returns the base element of the twoPane stack
 */
const BackToHome = () => {
  const keys: IKeyState = store.getState().KeyReducers;
  const twoPaneState: IKeyObject[] = keys.keys.filter(x => x.screen === paneType.TWO)

  for (let i = 1; i < twoPaneState.length; i++) {
    store.dispatch(removeHeaderByKey(twoPaneState[i].key));
    store.dispatch(removePaneElementByKey(twoPaneState[i].key));
  }
  store.dispatch(popToFront(paneType.TWO));
};

/**
 * Go back one element in the twoPane stack
 */
const GoBack = () => {
  const keys: IKeyState = store.getState().KeyReducers;
  const twoPaneState: IKeyObject[] = keys.keys.filter(x => x.screen === paneType.TWO)

  store.dispatch(removeHeaderByKey(twoPaneState.peek().key));
  store.dispatch(removePaneElementByKey(twoPaneState.peek().key));
  store.dispatch(popScreen(paneType.TWO));

};

/**
 * Replace the current element for this twoPane component
 */
const ReplaceScreen = (key: string, element: ReactElement) => {
  store.dispatch(replacePaneElement(`${paneType.TWO}_${key}`, element))
}

/**
 * Replace the default header for this twoPane component
 */
const ReplaceHeader = (key: string, header: IHeader) => {
  store.dispatch(replaceHeader(key, header));
};

const _twoPaneFunctions = {
  Add,
  AddOrMoveToFront,
  mergeToOppositeScreen,
  BackToHome,
  GoBack,
  ReplaceScreen,
  ReplaceHeader,
};

type twoPaneFunctions = typeof _twoPaneFunctions;

const twoPane: twoPaneFunctions = _twoPaneFunctions;

export default twoPane;
