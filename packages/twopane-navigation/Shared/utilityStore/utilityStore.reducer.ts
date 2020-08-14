import { IUtilityStoreState, IUtilityStoreAction } from "./utilityStore.interfaces";
import { IS_DUALSCREEN } from './utilityStore.types'
const initialState: IUtilityStoreState = {
    isDualScreen: false
};

const utilityStoreReducer = (
    state: IUtilityStoreState = initialState,
    action: IUtilityStoreAction
): IUtilityStoreState => {
    switch (action.type) {
        case IS_DUALSCREEN: {
            return {
                isDualScreen: action.payload.isDualScreen
            };
        }
        default:
            return state;
    }
};

export default utilityStoreReducer;
