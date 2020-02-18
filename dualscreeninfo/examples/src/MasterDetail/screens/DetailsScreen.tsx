import React from 'react'
import { View } from 'react-native'
import { Avatar, Text } from 'react-native-elements'
import { Person } from '../models'
import { NavigationStackProp } from 'react-navigation-stack'

type DetailsScreenProps = {
    navigation: NavigationStackProp<{ person: Person }>;
}

export default function DetailsScreen({ navigation }: DetailsScreenProps) {
    const person: Person = navigation.getParam('person', {})

    return (
        <View style={{ flex: 1, padding: 30, flexDirection: 'row' }}>
            <Avatar rounded={true} size='xlarge' source={{ uri: person.avatar_url }} />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text h4={true}>{person.name}</Text>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>{person.subtitle}</Text>
                <Text>Email: {person.email}</Text>
                <Text>Phone: {person.phone}</Text>
            </View>
        </View>
    )
}
