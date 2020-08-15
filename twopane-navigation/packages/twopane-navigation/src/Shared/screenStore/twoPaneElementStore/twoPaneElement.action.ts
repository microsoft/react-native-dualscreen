import { PUSH_TWOPANE_ELEMENT, REMOVE_KEY_TWOPANE_ELEMENT, REPLACE_TWOPANE_ELEMENT } from "./twoPaneElement.types";
import { ReactElement } from "react";
import { ITwoPaneElementAction } from "./twoPaneElement.interface";
import { IKeyOnlyAction } from "../keyStore/key.interface";

export const pushElement = (
    key: string,
    twoPaneElement: ReactElement
): ITwoPaneElementAction => ({
    type: PUSH_TWOPANE_ELEMENT,
    payload: {
        key: key,
        twoPaneElement: twoPaneElement
    }
});

export const replacetwoPaneElement = (
    key: string,
    twoPaneElement: ReactElement
): ITwoPaneElementAction => ({
    type: REPLACE_TWOPANE_ELEMENT,
    payload: {
        key: key,
        twoPaneElement: twoPaneElement
    }
});


export const removetwoPaneElementByKey = (
    twoPaneElementKey: string
): IKeyOnlyAction => ({
    type: REMOVE_KEY_TWOPANE_ELEMENT,
    payload: {
        key: twoPaneElementKey
    }
});