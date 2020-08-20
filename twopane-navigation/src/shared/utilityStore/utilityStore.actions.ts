import { IUtilityIsTwoPaneAction, IUtilityConfigAction } from "./utilityStore.interfaces";
import { IS_TWOPANE, PUSH_CONFIG } from "./utilityStore.types";
import { IConfigComponent } from "../../utilities/interfaces";

export const isTwoPaneAction = (isTwoPane: boolean):
    IUtilityIsTwoPaneAction => ({
        type: IS_TWOPANE,
        payload: {
            isTwoPane: isTwoPane
        }
    });

export const pushConfigAction = (config: IConfigComponent):
    IUtilityConfigAction => ({
        type: PUSH_CONFIG,
        payload: {
            config: config
        }
    });
