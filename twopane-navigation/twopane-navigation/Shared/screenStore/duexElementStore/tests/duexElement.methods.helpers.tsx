import { IDuexElementAction, IDuexElementObject } from "../duexElement.interface"
import React, { ReactElement } from 'react';

export const duexElementActionBuilder = (type: string, key: string, duexElement: React.ReactElement): IDuexElementAction => {
    return {
        type: type,
        payload: {
            key: key,
            duexElement: duexElement
        }
    }
}



export const duexElementObjectBuilder = (key: string, duexElement: ReactElement): IDuexElementObject => {
    return {
        [key]: duexElement
    }
}