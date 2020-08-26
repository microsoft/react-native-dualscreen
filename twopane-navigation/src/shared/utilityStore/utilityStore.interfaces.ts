import { IConfigComponent } from "../../utilities/interfaces";

export interface IUtilityStoreState {
    isTwoPane: boolean;
    config: IConfigComponent;
}

export interface IUtilityStoreAction {
    type: string;
    payload: {
        isTwoPane: boolean;
        config: IConfigComponent;
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

