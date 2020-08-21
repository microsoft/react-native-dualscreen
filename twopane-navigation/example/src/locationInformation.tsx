import React from 'react';
import { IRestaurantDetails } from './interfaces';
import { Text, View, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { autoPane, onePane } from 'twopane-navigation';
import ShoppingCart from './shoppingCart';
import Directions from './directions';

export interface ILocationInformationProps {
    details: IRestaurantDetails;
}

const LocationInformation = (props: ILocationInformationProps)  =>{
    const { details } = props;
  return (
    <ScrollView
    contentInsetAdjustmentBehavior="automatic"
      style={locationInformationStyles.scrollView}
      >
      <View style={locationInformationStyles.informationContainer}>
        <Image source={require('./images/pizza.png')} style={locationInformationStyles.pizzaImage}/>
        <Text style={locationInformationStyles.informationTitle}>{details.name}</Text>
        <View style={locationInformationStyles.columns}>
          <View style={locationInformationStyles.rows}>
            <View style={locationInformationStyles.columnLeftItem}>
              <Text style={locationInformationStyles.subSectionContainer}>
                <Text style={locationInformationStyles.subSectionTitle}>Address: </Text>
                <Text style={locationInformationStyles.subSectionDescription}>
                  {details.address}
                </Text>
              </Text>
              <Text style={locationInformationStyles.subSectionContainer}>
                <Text style={locationInformationStyles.subSectionTitle}>Phone: </Text>
                <Text style={locationInformationStyles.subSectionDescription}>
                  {details.phoneNumber}
                </Text>
              </Text>
              <Text style={locationInformationStyles.subSectionContainer}>
                <Text style={locationInformationStyles.subSectionTitle}>Store Hours: </Text>
                <Text style={locationInformationStyles.subSectionDescription}>
                  {details.storeHours}
                </Text>
              </Text>
              <Text style={locationInformationStyles.subSectionContainer}>
                <Text style={locationInformationStyles.subSectionTitle}>Delivery Hours: </Text>
                <Text style={locationInformationStyles.subSectionDescription}>
                  {details.deliveryHours}
                </Text>
              </Text>
            </View>
            <View style={locationInformationStyles.columnRightItem}>
              <View>
                <View>
                  <Button title='Order now' color='#D26441' 
                    onPress={()=> autoPane.Add(`checkout ${details.name}`,
                    <ShoppingCart />,
                    undefined,
                    true,true)}/>
                </View>
                <TouchableOpacity onPress={()=> onePane.AddExtended(`directions ${details.name}`,
                    <Directions />,
                    {title: 'Directions'})}>
                  <View style={locationInformationStyles.getDirectionsView}>
                    <Image source={require('./images/directions.png')} style={locationInformationStyles.directionsImage}/>
                    <Text style={locationInformationStyles.getDirections}>Get directions</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>

  );
}

const locationInformationStyles = StyleSheet.create({
  scrollView: {
    width: '100%',
    height: '100%'
  },
  informationContainer: {
    paddingHorizontal: 48,
    marginTop: 32,
    marginBottom: 24
  },
  pizzaImage:{
    width: '100%',
    height: undefined,
    aspectRatio: 2.066666666666667,
    resizeMode: 'contain',
  },
  informationTitle: {
    marginTop: 24,
    fontSize: 28,
    fontWeight: '600',
    color: 'black',
  },
  columns: {
    marginTop: 24,
    flex: 1,
    flexDirection: 'column',
  },
  rows: {
    width: '50%',
    flex: 1,
    flexDirection: 'row',
  },
  columnLeftItem: {
    flexDirection: 'column',
    paddingRight: 30,
    width: '100%',
    height: '100%',
    alignItems: 'stretch'
  },
  columnRightItem: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'stretch'
  },
  subSectionContainer: {
    marginBottom: 8,
  },
  subSectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'black',
  },
  subSectionDescription: {
    fontSize: 12,
    fontWeight: '200',
    color: 'black',
  },
  getDirectionsView: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  getDirections: {
    fontSize: 12,
    color: "#4794CC"
  },
  directionsImage: {
    width: 24,
    height: 24,
    marginRight: 10
  }
})

export default LocationInformation;