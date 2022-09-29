import React, { useContext, useState } from 'react'
import { NativeSyntheticEvent, View } from 'react-native'
import { Hinge, DualScreenInfo } from 'react-native-dualscreeninfo'
import { Text } from 'react-native';
import DualScreenContext from '../DualScreenContext'

type Slide = {
    title: string
    price: string
    info: string[]
    button: { title: string, icon: string }
}

const list: Slide[] = [
    {
        title: 'FREE',
        price: '0$',
        info: [ '1 User', 'Basic Support', 'All Core Features' ],
        button: { title: 'FREE', icon: 'phone-in-talk' }
    },
    {
        title: 'BASIC',
        price: '10$',
        info: [ '1 User', 'Basic Support', 'All Core Features' ],
        button: { title: 'BASIC', icon: 'access-time' }
    },
    {
        title: 'ADVANCED',
        price: '20$',
        info: [ '1 User', 'Basic Support', 'All Core Features' ],
        button: { title: 'ADVANCED', icon: 'access-time' }
    },
    {
        title: 'MASTER',
        price: '30$',
        info: [ '1 User', 'Basic Support', 'All Core Features' ],
        button: { title: 'MASTER', icon: 'account-box' }
    },
    {
        title: 'WORLD CLASS',
        price: '40$',
        info: [ '1 User', 'Basic Support', 'All Core Features' ],
        button: { title: 'WORLD CLASS', icon: 'flight-takeoff' }
    }
]

export default function () {
    const [ currentSlide, setCurrentSlide ] = useState(0)
    const context = useContext(DualScreenContext)
    const pageMargin = DualScreenInfo.hingeWidth / 2

    return (
        <Text>Page</Text>
    )
}
