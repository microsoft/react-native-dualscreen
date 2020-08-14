import { IAuthAction, IAuthState } from './auth.interfaces';
import { SIGNED_IN, SIGNED_OUT, LOADING } from './auth.types';

const initialState: IAuthState = {
  isLoading: false,
  isSignedOut: true
};

const authReducer = (state: IAuthState = initialState, action: IAuthAction) => {
  switch (action.type) {
    case SIGNED_IN:
      return {
        isSignedOut: false,
        isLoading: false
      };
    case LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SIGNED_OUT:
      return {
        isSignedOut: true,
        isLoading: false
      };
    default:
      return state;
  }
};

export default authReducer;
