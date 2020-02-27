import React, { useContext, useState } from 'react'
import { NativeSyntheticEvent, View } from 'react-native'
import ViewPager, { ViewPagerOnPageSelectedEventData } from '@react-native-community/viewpager'
import { PricingCard } from 'react-native-elements'
import { Hinge, DualScreenInfo } from 'react-native-dualscreen'
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

    return (
        <ViewPager
            style={{ flex: 1 }}
            initialPage={currentSlide}
            pageWidth={context.isDualMode ? 0.5 : 1.0}
            pageMargin={DualScreenInfo.hingeWidth / 2}
            onPageSelected={(event: NativeSyntheticEvent<ViewPagerOnPageSelectedEventData>) => {
                setCurrentSlide(event.nativeEvent.position)
            }}
        >
            {list.map((slide: Slide, i: number) => (
                <View key={i} style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <PricingCard
                            color='#4f9deb'
                            title={slide.title}
                            price={slide.price}
                            info={slide.info}
                            button={slide.button}
                        />
                    </View>
                    {context.isDualMode && <Hinge />}
                    {context.isDualMode && <View style={{ flex: 1 }} />}
                </View>
            ))}
        </ViewPager>
    )
}
