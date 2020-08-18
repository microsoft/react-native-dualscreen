import { IUtilityStoreState, IUtilityStoreAction } from "./utilityStore.interfaces";
import { IS_TWOPANE } from './utilityStore.types'
const initialState: IUtilityStoreState = {
    isTwoPane: false
};

const utilityStoreReducer = (
    state: IUtilityStoreState = initialState,
    action: IUtilityStoreAction
): IUtilityStoreState => {
    switch (action.type) {
        case IS_TWOPANE: {
            return {
                isTwoPane: action.payload.isTwoPane
            };
        }
        default:
            return state;
    }
};

export default utilityStoreReducer;
