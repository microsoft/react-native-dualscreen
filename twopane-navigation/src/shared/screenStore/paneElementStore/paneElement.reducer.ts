
import { PUSH_PANE_ELEMENT, REMOVE_KEY_PANE_ELEMENT, REPLACE_PANE_ELEMENT } from './paneElement.types';
import { IPaneElementState, IPaneElementAction } from './paneElement.interface';

const initialState: IPaneElementState = {
    PaneElements: {}
};

const PaneElementReducer = (
    state: IPaneElementState = initialState,
    action: IPaneElementAction
): IPaneElementState => {
    switch (action.type) {
        case PUSH_PANE_ELEMENT: {
            return {
                ...state,
                PaneElements: {
                    ...state.PaneElements,
                    [action.payload.key as string]: action.payload.paneElement
                }
            };
        }
        case REPLACE_PANE_ELEMENT: {
            const hasKey = action.payload.key in state.PaneElements;
            if (!hasKey) {
                return { ...state };
            }
            return {
                ...state,
                PaneElements: {
                    ...state.PaneElements,
                    [action.payload.key as string]: action.payload.paneElement
                },
            };

        }
        case REMOVE_KEY_PANE_ELEMENT: {
            // using delete over lodash.omit to reduce dependencies on external libraries
            const newData = state;
            if(newData.PaneElements[action.payload.key])
            {
                delete newData.PaneElements[action.payload.key];
            }
            return { ...newData }
        }
        default:
            return state;
    }
};

export default PaneElementReducer;
