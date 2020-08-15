import { screenType } from "../../../utilities/interfaces";

export interface IKeyState {
    keys: Array<IKeyObject>;
}

export interface IKeyAction {
    type: string;
    payload: {
        screen: screenType,
        key: string;
        isMerge: boolean;
    };
}

export interface IKeyOnlyAction {
    type: string;
    payload: {
        key: string;
    };
}

export interface IScreenOnlyAction {
    type: string;
    payload: {
        screen: screenType;
    };
}

export interface IKeyScreenAction {
    type: string;
    payload: {
        screen: screenType;
        key: string;
    };
}



export interface IKeyObject {
    key: string,
    isMerge: boolean;
    screen: screenType;
}