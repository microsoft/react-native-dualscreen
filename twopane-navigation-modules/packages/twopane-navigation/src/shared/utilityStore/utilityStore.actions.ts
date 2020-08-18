import { IUtilityStoreAction } from "./utilityStore.interfaces";
import { IS_TWOPANE } from "./utilityStore.types";

export const isTwoPaneAction = (isTwoPane: boolean):
    IUtilityStoreAction => ({
        type: IS_TWOPANE,
        payload: {
            isTwoPane: isTwoPane
        }
    });
