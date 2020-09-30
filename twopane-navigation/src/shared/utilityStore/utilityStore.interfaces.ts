import { IConfigComponent } from "../../utilities/interfaces";
import { DeviceOrientation, WindowRect } from "react-native-dualscreeninfo";

export interface IUtilityStoreState {
    paneRects: WindowRect[];
    orientation: DeviceOrientation;
    isTwoPane: boolean;
    config: IConfigComponent;
}

export interface IUtilityStoreAction {
    type: string;
    payload: {
        paneRects: WindowRect[];
        orientation: DeviceOrientation;
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

export interface IUtilityOrientationAction {
    type: string;
    payload: {
        orientation: DeviceOrientation;
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