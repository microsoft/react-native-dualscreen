import { store } from '../../appStore';

import { signedOut, signedIn, loading } from './auth.actions';

export const signIn = () => {
  store.dispatch(signedIn());
};
export const signOut = () => {
  store.dispatch(signedOut());
};
export const startLoading = () => {
  store.dispatch(loading());
};
