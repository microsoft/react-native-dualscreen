import React, { useEffect, useState } from 'react'
import { DualScreenInfo, DualScreenInfoPayload } from 'react-native-dualscreeninfo'
import MasterDetail from './MasterDetail'
//import TwoPage from './TwoPage'
import CompanionPane from './CompanionPane'
import DualScreenContext from './DualScreenContext'

export default function App() {
    const [isDualMode, setDualMode] = useState(DualScreenInfo.isSpanning);
    useEffect(() => {
        DualScreenInfo.addEventListener('didUpdateSpanning', ({ isSpanning }: DualScreenInfoPayload) => {
            if (isDualMode !== isSpanning) {
                setDualMode(isSpanning)
            }
        })
    });

    return (
        <DualScreenContext.Provider
            value={{ isDualMode }}
        >
            <MasterDetail />
            {/*<CompanionPane />*/}
            {/*<TwoPage />*/}
        </DualScreenContext.Provider>
    )
}
