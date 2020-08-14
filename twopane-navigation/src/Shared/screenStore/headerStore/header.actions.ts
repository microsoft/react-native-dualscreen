import { IHeaderAction, IHeader } from "./header.interface";
import { PUSH_HEADER, REPLACE_HEADER, REMOVE_KEY_HEADER } from "./header.types";
import { IKeyAction, IKeyOnlyAction } from "../keyStore/key.interface";

export const pushHeader = (
    key: string,
    header: IHeader
): IHeaderAction => ({
    type: PUSH_HEADER,
    payload: {
        key: key,
        header: header
    }
});

export const replaceHeader = (
    key: string,
    header: IHeader
): IHeaderAction => ({
    type: REPLACE_HEADER,
    payload: {
        key: key,
        header: header
    }
});

export const removeHeaderByKey = (
    headerKey: string
): IKeyOnlyAction => ({
    type: REMOVE_KEY_HEADER,
    payload: {
        key: headerKey
    }
});

