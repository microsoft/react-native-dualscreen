import { IUtilityIsTwoPaneAction, IUtilityConfigAction, IUtilityPaneRectsAction } from "./utilityStore.interfaces";
import { PUSH_PANERECTS, IS_TWOPANE, PUSH_CONFIG } from "./utilityStore.types";
import { IConfigComponent } from "../../utilities/interfaces";
import { WindowRect } from "react-native-dualscreeninfo";

export const pushPaneRectsActions = (paneRects: WindowRect[]):
    IUtilityPaneRectsAction => ({
        type: PUSH_PANERECTS,
        payload: {
            paneRects: paneRects
        }
    });

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
