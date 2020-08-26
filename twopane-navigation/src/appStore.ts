import { combineReducers, createStore } from 'redux';


import keyReducers from './shared/screenStore/keyStore/key.reducer';
import PaneElementReducer from './shared/screenStore/paneElementStore/paneElement.reducer';
import headerReducer from './shared/screenStore/headerStore/header.reducer';
import utilityStoreReducer from './shared/utilityStore/utilityStore.reducer';


require('./utilities/extensionMethods');

const rootReducer = combineReducers({
  KeyReducers: keyReducers,
  headerReducer,
  PaneElementReducer,
  utilityStoreReducer
});


const RESET_APP: string = 'RESET_APP';

interface IEmptyApp {
  type: string;
}

// TODO CONVERT ANY TO TYPE
const TestReducer = (state: any, action: any) => {
  switch (action.type) {
    case RESET_APP:
      state = undefined;
      return rootReducer(state, action);
    default:
      return rootReducer(state, action);
  }
}

export type rootReducerType = ReturnType<typeof rootReducer>;

export const resetApp = (): IEmptyApp => ({
  type: RESET_APP
})

export const store = createStore(TestReducer);
