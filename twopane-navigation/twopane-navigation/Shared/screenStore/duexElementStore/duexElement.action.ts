import { PUSH_DUEXELEMENT, REMOVE_KEY_DUEXELEMENT, REPLACE_DUEXELEMENT } from "./duexElement.types";
import { ReactElement } from "react";
import { IDuexElementAction } from "./duexElement.interface";
import { IKeyOnlyAction } from "../keyStore/key.interface";

export const pushElement = (
    key: string,
    duexElement: ReactElement
): IDuexElementAction => ({
    type: PUSH_DUEXELEMENT,
    payload: {
        key: key,
        duexElement: duexElement
    }
});

export const replaceDuexElement = (
    key: string,
    duexElement: ReactElement
): IDuexElementAction => ({
    type: REPLACE_DUEXELEMENT,
    payload: {
        key: key,
        duexElement: duexElement
    }
});


export const removeDuexElementByKey = (
    duexElementKey: string
): IKeyOnlyAction => ({
    type: REMOVE_KEY_DUEXELEMENT,
    payload: {
        key: duexElementKey
    }
});