import { ITwoPaneElementAction, ITwoPaneElementObject } from "../twoPaneElement.interface"
import React, { ReactElement } from 'react';

export const twoPaneElementActionBuilder = (type: string, key: string, twoPaneElement: React.ReactElement): ITwoPaneElementAction => {
    return {
        type: type,
        payload: {
            key: key,
            twoPaneElement: twoPaneElement
        }
    }
}



export const twoPaneElementObjectBuilder = (key: string, twoPaneElement: ReactElement): ITwoPaneElementObject => {
    return {
        [key]: twoPaneElement
    }
}