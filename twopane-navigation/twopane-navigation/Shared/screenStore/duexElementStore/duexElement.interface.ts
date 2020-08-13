import { ReactElement } from "react";

export interface IDuexElementObject {
    [key: string]: ReactElement;
}

export interface IDuexElementState {
    duexElements: IDuexElementObject;
}

export interface IDuexElementAction {
    type: string;
    payload: {
        key: string
        duexElement: ReactElement;
    };
}
