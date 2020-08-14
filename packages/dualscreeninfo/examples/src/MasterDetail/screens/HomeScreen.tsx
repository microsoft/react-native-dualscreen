import React, { useContext } from 'react'
import { ListItem } from 'react-native-elements'
import { View } from 'react-native'
import { Person } from '../models'
import { NavigationStackProp } from 'react-navigation-stack'
import DualScreenContext, { DualScreenContextInterface } from '../../DualScreenContext'

interface HomeScreenProps {
    displayForDual?: boolean
    navigation: NavigationStackProp<{}>
}

const list: Array<Person> = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
        phone: '(717) 369-1197',
        email: 'skippy@verizon.net'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
        phone: '(457) 765-6833',
        email: 'meder@yahoo.ca'
    }
]

export default function HomeScreen({ displayForDual, navigation }: HomeScreenProps) {
    const context: DualScreenContextInterface = useContext(DualScreenContext)

    if (context.isDualMode && displayForDual !== true) {
        return <View />
    }

    const onItemClick = (person: Person) => {
        return () => {
            navigation.navigate('Details', {
                person
            })
        }
    }

    return (
        <View>
            {
                list.map((person, i) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: person.avatar_url } }}
                        title={person.name}
                        subtitle={person.subtitle}
                        bottomDivider={true}
                        onPress={onItemClick(person)}
                    />
                ))
            }
        </View>
    )
}
