import { ReactElement } from "react";

export interface ITwoPaneElementObject {
    [key: string]: ReactElement;
}

export interface ITwoPaneElementState {
    twoPaneElements: ITwoPaneElementObject;
}

export interface ITwoPaneElementAction {
    type: string;
    payload: {
        key: string
        twoPaneElement: ReactElement;
    };
}
