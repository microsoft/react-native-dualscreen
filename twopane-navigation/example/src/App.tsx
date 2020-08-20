import React from 'react';

import { TwoPaneApp, ITwoPaneAppProps }  from 'twopane-navigation';

import { IRestaurantDetails } from './interfaces';
import LocationsList from './locationsList';
import LocationInformation from './locationInformation';

const RestaurantDetails: IRestaurantDetails[] = 
[
  {
    name: 'ContosoPizza Seattle Center',
    city: 'Seattle Center',
    address: '2928 1st Ave',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  },
  {
    name: 'ContosoPizza Westlake',
    city: 'Westlake',
    address: '714 Taylor Ave N',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  },
  {
    name: 'ContosoPizza Pioneer Square',
    city: 'Pioneer Square',
    address: '112 1st Ave S #100',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  },
  {
    name: 'ContosoPizza Capitol Hill',
    city: 'Capitol Hill',
    address: '1427 Broadway',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  },
  {
    name: 'ContosoPizza Capitol Hill East',
    city: 'Capitol Hill East',
    address: 'Mount 2928 1st Ave',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  },
  {
    name: 'ContosoPizza Bellevue',
    city: 'Bellevue',
    address: '2928 1st Ave',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  },
  {
    name: 'ContosoPizza Redmond',
    city: 'Redmond',
    address: '2928 1st Ave',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily'
  },
  {
    name: 'ContosoPizza Bothell',
    city: 'Bothell',
    address: '2928 1st Ave',
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
    config ={TwoPaneAppDefaultComponents.config}
  />
  );
};

const TwoPaneAppDefaultComponents: ITwoPaneAppProps = {

  onePaneDefault:{
    key: 'restaurantLocations',
    paneElement: <LocationsList listItems={RestaurantDetails}/>,
    header: {
      title: 'ContosoPizza'
    }

  },
  twoPaneDefault: {
    key: 'restaurantDetails',
    paneElement: <LocationInformation details={RestaurantDetails[0]} />,
    header : { 
      title: RestaurantDetails[0].city
    }
  },
  config: {
    onePane: {
      paneHeader: {
          backgroundColor: '#D26441'
      },
      paneBody: {
          backgroundColor: '#f2f2f2'
      }
    },
    twoPane: {
      paneHeader: {
          backgroundColor: '#D26441',
          
      },
      paneBody: {
          backgroundColor: '#f2f2f2'
      }
    }
  }
}

export default App;
