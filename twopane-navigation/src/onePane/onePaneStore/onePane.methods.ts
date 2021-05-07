import { store } from '../../appStore';
import {
  IExtensionOptions,
  paneType
} from '../../utilities/interfaces';
import { pushKey, popToFront, popScreen, moveToFront, changeScreen } from '../../shared/screenStore/keyStore/key.actions';
import { pushHeader, replaceHeader, removeHeaderByKey } from '../../shared/screenStore/headerStore/header.actions';
import { pushElement, removePaneElementByKey, replacePaneElement } from '../../shared/screenStore/paneElementStore/paneElement.action';
import { ReactElement } from 'react';
import { IHeader } from '../../shared/screenStore/headerStore/header.interface';
import { IKeyState, IKeyObject } from '../../shared/screenStore/keyStore/key.interface';

const AddPaneElement= (key: string, element: ReactElement, header?: IHeader, isMerge: boolean = false, extensionOptions?: IExtensionOptions) => {
    store.dispatch(pushKey(paneType.ONE, key, isMerge, extensionOptions));
    store.dispatch(pushElement(`${paneType.ONE}_${key}`, element));
    if (header) {
      store.dispatch(pushHeader(`${paneType.ONE}_${key}`, header));
    }
}
/**
 * Pushes element to the top of the onePane stack or replaces the original with the new element
 */
const Add = (key: string, element: ReactElement, header?: IHeader, isMerge: boolean = false, extensionOptions?: IExtensionOptions) => {
  const keys: IKeyState = store.getState().KeyReducers;
  const index = keys.keys.findIndex(val => val.key === `${paneType.ONE}_${key}`);
  if(index > -1) {
    //remove old entry
    store.dispatch(removeHeaderByKey(keys.keys[index].key))
    store.dispatch(removePaneElementByKey(keys.keys[index].key))
    
    // push new entry
    store.dispatch(pushElement(`${paneType.ONE}_${key}`, element));
    if (header) {
      store.dispatch(pushHeader(`${paneType.ONE}_${key}`, header));
    }
    store.dispatch(moveToFront(paneType.ONE, `${paneType.ONE}_${key}`));
  } else {
    AddPaneElement(key, element, header, isMerge, extensionOptions)
  }
};

/**
 * Pushes element to the top of the onePane stack or moves the original to the top of the stack
 */
const AddOrMoveToFront = (key: string, element: React.ReactElement, header?: IHeader, isMerge: boolean = false) => {
  const keys: IKeyState = store.getState().KeyReducers;
  const onePaneState: IKeyObject[] = keys.keys.filter(x => x.screen === paneType.ONE)

  if (!onePaneState.some(val => val.key === `${paneType.ONE}_${key}`)) {
    AddPaneElement(key, element, header, isMerge)
  } else {
    store.dispatch(moveToFront(paneType.ONE, `${paneType.ONE}_${key}`));
  }
}

/**
 * when the app active panes changes move panes marked as isMerged to twoPane
 */
const mergeToOppositePane= () => {
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
const ReplacePane = (key: string, element: React.ReactElement) => {
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
  AddOrMoveToFront,
  mergeToOppositePane,
  BackToHome,
  GoBack,
  ReplacePane,
  ReplaceHeader,
};

type onePaneFunctions = typeof _onePaneFunctions;

const onePane: onePaneFunctions = _onePaneFunctions;

export default onePane;
