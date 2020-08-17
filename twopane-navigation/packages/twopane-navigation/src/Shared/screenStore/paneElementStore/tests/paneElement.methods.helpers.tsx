import { IPaneElementAction, IPaneElementObject } from "../paneElement.interface"
import React, { ReactElement } from 'react';

export const paneElementActionBuilder = (type: string, key: string, paneElement: React.ReactElement): IPaneElementAction => {
    return {
        type: type,
        payload: {
            key: key,
            paneElement: paneElement
        }
    }
}



export const paneElementObjectBuilder = (key: string, paneElement: ReactElement): IPaneElementObject => {
    return {
        [key]: paneElement
    }
}