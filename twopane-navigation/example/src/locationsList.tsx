import React, { Fragment } from 'react';
import { IRestaurantDetails } from './interfaces';
import { FlatList, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { autoPane } from 'react-native-twopane-navigation';
import LocationInformation from './locationInformation';

export interface ILocationsList {
    listItems: IRestaurantDetails[];
}

const LocationsList = (props: ILocationsList) => {
    const {listItems} = props;
  return (
    <FlatList 
        data={listItems}
        renderItem={({ item }) => (
        <TouchableOpacity onPress={ () =>
            autoPane.AddOrMoveToFront(`${item.name}`,
              <LocationInformation details={item}/>,
              {title: item.city},true,true
              )} >
          <View style={locationListStyles.listItemContainer} >
              <Text style={locationListStyles.listItemTitle}>{item.name}</Text>
              <Text style={locationListStyles.listItemAddress}>{item.address}</Text>
          </View>
        </TouchableOpacity>

        )}
        keyExtractor={item => item.name}
    />
  );
}

const locationListStyles = StyleSheet.create({
  listItemContainer: {
    borderBottomWidth: 1,
    borderColor: '#E1E1E1',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  listItemAddress: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '400',
    color: '#777777',
  }
})

export default LocationsList;
