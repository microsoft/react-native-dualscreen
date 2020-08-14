import React from 'react'

export interface DualScreenContextInterface {
    isDualMode: boolean
}

export default React.createContext<DualScreenContextInterface>({
    isDualMode: false
})
