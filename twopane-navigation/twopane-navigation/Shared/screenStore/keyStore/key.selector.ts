import { useSelector } from 'react-redux';
import { rootReducerType } from '../../../appStore';
import { IKeyState } from './key.interface';

export const getScreenKeyState = (): IKeyState => {
    return useSelector((state: rootReducerType) => state.KeyReducers);
};
