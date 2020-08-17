import { PUSH_PANE_ELEMENT, REMOVE_KEY_PANE_ELEMENT, REPLACE_PANE_ELEMENT } from "./paneElement.types";
import react, { ReactElement } from "react";
import { IPaneElementAction } from "./paneElement.interface";
import { IKeyOnlyAction } from "../keyStore/key.interface";

export const pushElement = (
    key: string,
    paneElement: ReactElement
): IPaneElementAction => ({
    type: PUSH_PANE_ELEMENT,
    payload: {
        key: key,
        paneElement: paneElement
    }
});

export const replacePaneElement = (
    key: string,
    paneElement: ReactElement
): IPaneElementAction => ({
    type: REPLACE_PANE_ELEMENT,
    payload: {
        key: key,
        paneElement: paneElement
    }
});


export const removePaneElementByKey = (
    twoPaneElementKey: string
): IKeyOnlyAction => ({
    type: REMOVE_KEY_PANE_ELEMENT,
    payload: {
        key: twoPaneElementKey
    }
});