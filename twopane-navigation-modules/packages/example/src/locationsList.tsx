import react, { Fragment } from 'react';
import { IRestaurantDetails } from './interfaces';
import { FlatList, Text } from 'react-native';

export interface ILocationsList {
    listItems: IRestaurantDetails[];
}

const LocationsList = (props: ILocationsList) => {
    const {listItems} = props;
  return (
    <FlatList 
        data={listItems}
        renderItem={({ item }) => (
        <Fragment>
            <Text>{item.name}</Text>
        </Fragment>
        )}
        keyExtractor={item => item.name}
    />
  );
}

export default LocationsList;
