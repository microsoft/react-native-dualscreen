import { IHeaderAction, IHeader, IHeaderObject } from "../header.interface";

export const headerActionBuilder = (type: string, key: string, header: IHeader): IHeaderAction => {
    return {
        type: type,
        payload: {
            key: key,
            header: header
        }
    }
}

export const headerObjectBuilder = (key: string, header: IHeader): IHeaderObject => {
    return {
        [key]: header
    }
}

