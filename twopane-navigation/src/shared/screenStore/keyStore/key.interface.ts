import {  IExtensionOptions, paneType } from "../../../utilities/interfaces";

export interface IKeyState {
    keys: Array<IKeyObject>;
}

export interface IKeyAction {
    type: string;
    payload: {
        screen: paneType,
        key: string;
        isMerge: boolean;
        extensionOptions?: IExtensionOptions
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
        screen: paneType;
    };
}

export interface IKeyScreenAction {
    type: string;
    payload: {
        screen: paneType;
        key: string;
    };
}



export interface IKeyObject {
    key: string,
    isMerge: boolean;
    screen: paneType;
    extensionOptions?: IExtensionOptions
}