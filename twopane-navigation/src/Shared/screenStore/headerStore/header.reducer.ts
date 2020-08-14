import {
    IHeaderState, IHeaderAction
} from './header.interface';
import { PUSH_HEADER, REPLACE_HEADER, REMOVE_KEY_HEADER } from './header.types';

const initialState: IHeaderState = {
    headers: {}
};

const headerReducer = (
    state: IHeaderState = initialState,
    action: IHeaderAction
): IHeaderState => {
    switch (action.type) {
        case PUSH_HEADER: {
            return {
                ...state,
                headers: {
                    ...state.headers,
                    [action.payload.key as string]: action.payload.header
                }
            };
        }
        case REPLACE_HEADER: {
            const hasKey = action.payload.key in state.headers;
            if (!hasKey) {
                return { ...state };
            }
            return {
                ...state,
                headers: {
                    ...state.headers,
                    [action.payload.key as string]: action.payload.header
                }
            };
        }
        case REMOVE_KEY_HEADER: {
            // using delete over lodash.omit to reduce dependencies on external libraries
            const newData = state;
            delete newData.headers[action.payload.key];
            return { ...newData }
        }
        default:
            return state;
    }
};

export default headerReducer;
