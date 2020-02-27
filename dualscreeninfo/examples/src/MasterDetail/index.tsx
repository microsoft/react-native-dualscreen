import { createStackNavigator, NavigationStackProp } from 'react-navigation-stack'
import HomeScreen from './screens/HomeScreen'
import DetailsScreen from './screens/DetailsScreen'
import React, { useContext } from 'react'
import { createAppContainer, NavigationNavigatorProps } from 'react-navigation'
import { View } from 'react-native'
import DualScreenContext from '../DualScreenContext'
import { Hinge } from 'react-native-dualscreen'

const MainNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
)

function MasterDetailNavigator(props: NavigationNavigatorProps) {
    const { navigation } = props
    const context = useContext(DualScreenContext)

    if (!context.isDualMode) {
        return <MainNavigator navigation={navigation} />
    }

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
                <HomeScreen
                    navigation={navigation as NavigationStackProp<{}>}
                    displayForDual={true}
                />
            </View>
            <Hinge />
            <View style={{ flex: 1 }}>
                <MainNavigator navigation={navigation} />
            </View>
        </View>
    )
}

MasterDetailNavigator.router = MainNavigator.router

const pagesContainer = createAppContainer(MasterDetailNavigator)

const MainAppNavigator = createStackNavigator(
    {
        PagesContainer: pagesContainer
    },
    {
        initialRouteName: 'PagesContainer'
    }
)

export default createAppContainer(MainAppNavigator)
