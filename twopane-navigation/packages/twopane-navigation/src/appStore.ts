import { combineReducers, createStore } from 'redux';


import keyReducers from './Shared/screenStore/keyStore/key.reducer';
import twoPaneElementReducer from './Shared/screenStore/twoPaneElementStore/twoPaneElement.reducer';
import headerReducer from './Shared/screenStore/headerStore/header.reducer';
import utilityStoreReducer from './Shared/utilityStore/utilityStore.reducer';


require('./utilities/extensionMethods');

const rootReducer = combineReducers({
  KeyReducers: keyReducers,
  headerReducer,
  twoPaneElementReducer,
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
