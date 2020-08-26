import { IUtilityStoreState, IUtilityStoreAction } from "./utilityStore.interfaces";
import { IS_TWOPANE, PUSH_CONFIG } from './utilityStore.types'
const initialState: IUtilityStoreState = {
    isTwoPane: false,
    config: {}
};

const utilityStoreReducer = (
    state: IUtilityStoreState = initialState,
    action: IUtilityStoreAction
): IUtilityStoreState => {
    switch (action.type) {
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
