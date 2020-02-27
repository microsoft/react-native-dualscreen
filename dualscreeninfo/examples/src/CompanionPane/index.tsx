import React, { useContext, useState } from 'react'
import { NativeSyntheticEvent, View } from 'react-native'
import ViewPager, { ViewPagerOnPageSelectedEventData } from '@react-native-community/viewpager'
import { ListItem, PricingCard } from 'react-native-elements'
import { Hinge } from 'react-native-dualscreen'
import DualScreenContext from '../DualScreenContext'

const list = [
    {
        title: 'FREE',
        price: '0$',
        info: ['1 User', 'Basic Support', 'All Core Features'],
        button: { title: 'FREE', icon: 'phone-in-talk' }
    },
    {
        title: 'BASIC',
        price: '10$',
        info: ['1 User', 'Basic Support', 'All Core Features'],
        button: { title: 'BASIC', icon: 'access-time' }
    },
    {
        title: 'ADVANCED',
        price: '20$',
        info: ['1 User', 'Basic Support', 'All Core Features'],
        button: { title: 'ADVANCED', icon: 'access-time' }
    },
    {
        title: 'MASTER',
        price: '30$',
        info: ['1 User', 'Basic Support', 'All Core Features'],
        button: { title: 'MASTER', icon: 'account-box' }
    },
    {
        title: 'WORLD CLASS',
        price: '40$',
        info: ['1 User', 'Basic Support', 'All Core Features'],
        button: { title: 'WORLD CLASS', icon: 'flight-takeoff' }
    }
]

export default function () {
    const [ currentSlide, setCurrentSlide ] = useState(0)
    const context = useContext(DualScreenContext)
    let viewPagerRef: ViewPager | null

    const viewPager = (
        <ViewPager
            style={{ flex: 1 }}
            ref={(ref) => viewPagerRef = ref}
            initialPage={currentSlide}
            onPageSelected={(event: NativeSyntheticEvent<ViewPagerOnPageSelectedEventData>) => {
                setCurrentSlide(event.nativeEvent.position)
            }}
        >
            {
                list.map((slide, i) => (
                    <View key={i}>
                        <PricingCard
                            color='#4f9deb'
                            title={slide.title}
                            price={slide.price}
                            info={slide.info}
                            button={slide.button}
                        />
                    </View>
                ))
            }
        </ViewPager>
    )

    if (!context.isDualMode) {
        return (
            <View style={{ flex: 1 }}>
                {viewPager}
            </View>
        )
    }

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
                {viewPager}
            </View>
            <Hinge />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {
                    list.map((slide, i) => (
                        <ListItem
                            key={i}
                            title={slide.title}
                            bottomDivider={true}
                            onPress={() => {
                                viewPagerRef && viewPagerRef.setPage(i)
                                setCurrentSlide(i)
                            }}
                        />
                    ))
                }
            </View>
        </View>
    )
}
