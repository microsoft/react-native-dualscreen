import React, { useEffect, useState } from 'react'
import { DualScreenInfo, SpannedChangeEvent } from 'react-native-dualscreen'
import MasterDetail from './MasterDetail'
import TwoPage from './TwoPage'
import CompanionPane from './CompanionPane'
import DualScreenContext from './DualScreenContext'

export default function App() {
    const [isDualMode, setDualMode] = useState(false);
    useEffect(() => {
        DualScreenInfo.isSpanned().then((isDual: boolean) => {
            setDualMode(isDual)
        });

        DualScreenInfo.addEventListener('spannedChange', ({ isSpanned }: SpannedChangeEvent) => {
            if (isDualMode !== isSpanned) {
                setDualMode(isSpanned)
            }
        })
    });

    return (
        <DualScreenContext.Provider
            value={{ isDualMode }}
        >
            {/*<MasterDetail />*/}
            {/*<CompanionPane />*/}
            <TwoPage />
        </DualScreenContext.Provider>
    )
}
