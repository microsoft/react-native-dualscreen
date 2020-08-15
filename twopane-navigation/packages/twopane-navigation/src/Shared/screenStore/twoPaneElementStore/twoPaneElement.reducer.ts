
import { PUSH_TWOPANE_ELEMENT, REMOVE_KEY_TWOPANE_ELEMENT, REPLACE_TWOPANE_ELEMENT } from './twoPaneElement.types';
import { ITwoPaneElementState, ITwoPaneElementAction } from './twoPaneElement.interface';

const initialState: ITwoPaneElementState = {
    twoPaneElements: {}
};

const twoPaneElementReducer = (
    state: ITwoPaneElementState = initialState,
    action: ITwoPaneElementAction
): ITwoPaneElementState => {
    switch (action.type) {
        case PUSH_TWOPANE_ELEMENT: {
            return {
                ...state,
                twoPaneElements: {
                    ...state.twoPaneElements,
                    [action.payload.key as string]: action.payload.twoPaneElement
                }
            };
        }
        case REPLACE_TWOPANE_ELEMENT: {
            const hasKey = action.payload.key in state.twoPaneElements;
            if (!hasKey) {
                return { ...state };
            }
            return {
                ...state,
                twoPaneElements: {
                    ...state.twoPaneElements,
                    [action.payload.key as string]: action.payload.twoPaneElement
                },
            };

        }
        case REMOVE_KEY_TWOPANE_ELEMENT: {
            // using delete over lodash.omit to reduce dependencies on external libraries
            const newData = state;
            delete newData.twoPaneElements[action.payload.key];
            return { ...newData }
        }
        default:
            return state;
    }
};

export default twoPaneElementReducer;
