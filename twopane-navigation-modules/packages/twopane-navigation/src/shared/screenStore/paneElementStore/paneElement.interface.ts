import react, { ReactElement } from "react";

export interface IPaneElementObject {
    [key: string]: ReactElement;
}

export interface IPaneElementState {
    PaneElements: IPaneElementObject;
}

export interface IPaneElementAction {
    type: string;
    payload: {
        key: string
        paneElement: ReactElement;
    };
}
