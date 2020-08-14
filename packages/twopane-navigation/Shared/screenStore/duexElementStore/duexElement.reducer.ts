
import { PUSH_DUEXELEMENT, REMOVE_KEY_DUEXELEMENT, REPLACE_DUEXELEMENT } from './duexElement.types';
import { IDuexElementState, IDuexElementAction } from './duexElement.interface';

const initialState: IDuexElementState = {
    duexElements: {}
};

const duexElementReducer = (
    state: IDuexElementState = initialState,
    action: IDuexElementAction
): IDuexElementState => {
    switch (action.type) {
        case PUSH_DUEXELEMENT: {
            return {
                ...state,
                duexElements: {
                    ...state.duexElements,
                    [action.payload.key as string]: action.payload.duexElement
                }
            };
        }
        case REPLACE_DUEXELEMENT: {
            const hasKey = action.payload.key in state.duexElements;
            if (!hasKey) {
                return { ...state };
            }
            return {
                ...state,
                duexElements: {
                    ...state.duexElements,
                    [action.payload.key as string]: action.payload.duexElement
                },
            };

        }
        case REMOVE_KEY_DUEXELEMENT: {
            // using delete over lodash.omit to reduce dependencies on external libraries
            const newData = state;
            delete newData.duexElements[action.payload.key];
            return { ...newData }
        }
        default:
            return state;
    }
};

export default duexElementReducer;
