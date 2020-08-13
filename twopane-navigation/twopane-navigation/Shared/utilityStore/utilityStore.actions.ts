import { IUtilityStoreAction } from "./utilityStore.interfaces";
import { IS_DUALSCREEN } from "./utilityStore.types";

export const isDualScreenAction = (isDualScreen: boolean):
    IUtilityStoreAction => ({
        type: IS_DUALSCREEN,
        payload: {
            isDualScreen: isDualScreen
        }
    });
