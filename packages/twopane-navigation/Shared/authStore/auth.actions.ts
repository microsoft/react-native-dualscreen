import { IAuthAction } from './auth.interfaces';
import { SIGNED_IN, SIGNED_OUT, LOADING } from './auth.types';

export const signedIn = (): IAuthAction => ({
  type: SIGNED_IN
});

export const signedOut = (): IAuthAction => ({
  type: SIGNED_OUT
});

export const loading = (): IAuthAction => ({
  type: LOADING
});
