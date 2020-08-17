import { store } from '../../appStore';
import {
  paneType
} from '../../utilities/interfaces';
import { pushKey, popToFront, popScreen, moveToFront, changeScreen } from '../../Shared/screenStore/keyStore/key.actions';
import { pushHeader, replaceHeader, removeHeaderByKey } from '../../Shared/screenStore/headerStore/header.actions';
import { pushElement, removePaneElementByKey, replacePaneElement } from '../../Shared/screenStore/paneElementStore/paneElement.action';
import { IHeader } from '../../Shared/screenStore/headerStore/header.interface';
import { IKeyState, IKeyObject } from '../../Shared/screenStore/keyStore/key.interface';

/**
 * Pushes element to the top of the Twopane stack.
 */
const Add = (key: string, element: React.ReactElement, header?: IHeader, isMerge: boolean = false) => {

  store.dispatch(pushKey(paneType.TWO, key, isMerge));
  store.dispatch(pushElement(`${paneType.TWO}_${key}`, element));
  if (header) {
    store.dispatch(pushHeader(`${paneType.TWO}_${key}`, header));
  }
};

/**
 * Pushes element to the top of the twopane stack or if the key is already in the stack,
    move that key to the top of the stack 
 */
const AddOrMoveToFront = (key: string, element: React.ReactElement, header?: IHeader, isMerge: boolean = false,) => {
  const keys: IKeyState = store.getState().KeyReducers;
  const twoPaneState: IKeyObject[] = keys.keys.filter(x => x.screen === paneType.TWO)

  if (!twoPaneState.some(val => val.key === `${paneType.TWO}_${key}`)) {
    Add(key, element, header, isMerge)
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
const ReplaceScreen = (key: string, element: React.ReactElement) => {
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
