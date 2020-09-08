import { IConfigComponent } from "../../utilities/interfaces";
import { WindowRect } from "react-native-dualscreeninfo";

export interface IUtilityStoreState {
    paneRects: WindowRect[];
    isTwoPane: boolean;
    config: IConfigComponent;
}

export interface IUtilityStoreAction {
    type: string;
    payload: {
        paneRects: WindowRect[];
        isTwoPane: boolean;
        config: IConfigComponent;
    };
}

export interface IUtilityPaneRectsAction {
    type: string;
    payload: {
        paneRects: WindowRect[];
    };
}

export interface IUtilityIsTwoPaneAction {
    type: string;
    payload: {
        isTwoPane: boolean;
    };
}
export interface IUtilityConfigAction {
    type: string;
    payload: {
        config: IConfigComponent;
    };
}