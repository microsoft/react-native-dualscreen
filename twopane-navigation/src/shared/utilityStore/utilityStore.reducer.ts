import { DeviceOrientation } from "react-native-dualscreeninfo";
import { IUtilityStoreState, IUtilityStoreAction } from "./utilityStore.interfaces";
import { IS_TWOPANE, PUSH_CONFIG, PUSH_ORIENTATION, PUSH_PANERECTS } from './utilityStore.types'
const initialState: IUtilityStoreState = {
    paneRects: [],
    orientation: DeviceOrientation.Portrait,
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
        case PUSH_ORIENTATION: {
            return {
                ...state,
                orientation: action.payload.orientation
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
