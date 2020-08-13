import { combineReducers, createStore } from 'redux';

import authReducer from './Shared/authStore/auth.reducer';
import drawerReducer from './Shared/drawerStore/drawer.reducer';
import keyReducers from './Shared/screenStore/keyStore/key.reducer';
import duexElementReducer from './Shared/screenStore/duexElementStore/duexElement.reducer';
import headerReducer from './Shared/screenStore/headerStore/header.reducer';
import utilityStoreReducer from './Shared/utilityStore/utilityStore.reducer';


require('./utilities/extensionMethods');

const rootReducer = combineReducers({
  KeyReducers: keyReducers,
  headerReducer,
  duexElementReducer,
  authReducer,
  drawerReducer,
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
