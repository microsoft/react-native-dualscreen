import React, { useContext } from 'react'
import { ListItem, Avatar } from 'react-native-elements'
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
        avatar_url: 'https://randomuser.me/api/portraits/women/44.jpg',
        subtitle: 'Vice President',
        phone: '(717) 555-1197',
        email: 'skippy@contoso.com'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://randomuser.me/api/portraits/men/86.jpg',
        subtitle: 'Vice Chairman',
        phone: '(457) 555-6833',
        email: 'meder@contoso.com'
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
                    <ListItem key={i} onPress={onItemClick(person)}>
                        <Avatar rounded={true} source={{ uri: person.avatar_url }} />
                        <ListItem.Content>
                        <ListItem.Title>{person.name}</ListItem.Title>
                        <ListItem.Subtitle>{person.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>

                ))
            }
        </View>
    )
}
