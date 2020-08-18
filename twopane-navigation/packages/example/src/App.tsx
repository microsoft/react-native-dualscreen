/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {TwoPaneApp, ITwoPaneAppProps} from "twopane-navigation"
import { IRestaurantDetails } from './interfaces';
import LocationsList from './locationsList';
import LocationInformation from './locationInformation';

const RestaurantDetails: IRestaurantDetails[] = 
[
  {
    name: 'ContosoPizza Seattle Center',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  },
  {
    name: 'ContosoPizza Westlake',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  },
  {
    name: 'ContosoPizza Pioneer Square',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  },
  {
    name: 'ContosoPizza Capitol Hill',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  },
  {
    name: 'ContosoPizza Capitol Hill East',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  },
  {
    name: 'ContosoPizza Bellevue',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  },
  {
    name: 'ContosoPizza Redmond',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  },
  {
    name: 'ContosoPizza Bothell',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  }
]

const App = () => {
  return (
  <TwoPaneApp 
    onePaneDefault={TwoPaneAppDefaultComponents.onePaneDefault}
    twoPaneDefault={TwoPaneAppDefaultComponents.twoPaneDefault}
  />
  );
};

const TwoPaneAppDefaultComponents: ITwoPaneAppProps = {

  onePaneDefault:{
    key: 'restaurantLocations',
    paneElement: <LocationsList listItems={RestaurantDetails}/>

  },
  twoPaneDefault: {
    key: 'restaurantDetails',
    paneElement: <LocationInformation details={RestaurantDetails[0]} />
  }  
}


export default App;
