import { IUtilityStoreState, IUtilityStoreAction } from "./utilityStore.interfaces";
import { IS_TWOPANE, PUSH_CONFIG, PUSH_PANERECTS } from './utilityStore.types'
const initialState: IUtilityStoreState = {
    paneRects: [],
    isTwoPane: false,
    config: {}
};

const utilityStoreReducer = (
    state: IUtilityStoreState = initialState,
    action: IUtilityStoreAction
): IUtilityStoreState => {
    switch (action.type) {
        case PUSH_PANERECTS: {
            return {
                ...state,
                paneRects: action.payload.paneRects
            }
        }
        case IS_TWOPANE: {
            return {
                ...state,
                isTwoPane: action.payload.isTwoPane
            };
        } 
        case PUSH_CONFIG: {
                return {
                    ...state,
                    config: action.payload.config
                }
            }
        default:
            return state;
    }
};

export default utilityStoreReducer;
