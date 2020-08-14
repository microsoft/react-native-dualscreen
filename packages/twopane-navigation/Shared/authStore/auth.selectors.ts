import { useSelector } from 'react-redux';
import { rootReducerType } from '../../appStore';
import { IAuthState } from './auth.interfaces';

export const authState = (): IAuthState => {
  return useSelector((state: rootReducerType) => state.authReducer);
};
