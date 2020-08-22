import React from 'react';

import { TwoPaneApp, ITwoPaneAppProps }  from 'twopane-navigation';

import { IRestaurantDetails, imageRequire } from './interfaces';
import LocationsList from './locationsList';
import LocationInformation from './locationInformation';

const foodImages: imageRequire[] = [
  {
   image: require('./images/pizzaGallery/pizza1.jpg')
  },
  {
   image: require('./images/pizzaGallery/pizza2.jpg')
  },
  {
   image: require('./images/pizzaGallery/pizza3.jpg')
  },
  {
   image: require('./images/pizzaGallery/pizza4.jpg')
  },
  {
   image: require('./images/pizzaGallery/pizza5.jpg')
  },
  {
   image: require('./images/pizzaGallery/pizza6.jpg')
  },
  {
   image: require('./images/pizzaGallery/pizza7.jpg')
  },
  {
   image: require('./images/pizzaGallery/pizza8.jpg')
  },
  {
   image: require('./images/pizzaGallery/pizza9.jpg')
  },
  {
   image: require('./images/pizzaGallery/pizza10.jpg')
  }
]

const RestaurantDetails: IRestaurantDetails[] = 
[
  {
    name: 'ContosoPizza Seattle Center',
    city: 'Seattle Center',
    address: '2928 1st Ave',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily',
    gallery: foodImages
  },
  {
    name: 'ContosoPizza Westlake',
    city: 'Westlake',
    address: '714 Taylor Ave N',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily',
    gallery: foodImages
  },
  {
    name: 'ContosoPizza Pioneer Square',
    city: 'Pioneer Square',
    address: '112 1st Ave S #100',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily',
    gallery: foodImages
  },
  {
    name: 'ContosoPizza Capitol Hill',
    city: 'Capitol Hill',
    address: '1427 Broadway',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily',
    gallery: foodImages
  },
  {
    name: 'ContosoPizza Capitol Hill East',
    city: 'Capitol Hill East',
    address: 'Mount 2928 1st Ave',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily',
    gallery: foodImages
  },
  {
    name: 'ContosoPizza Bellevue',
    city: 'Bellevue',
    address: '2928 1st Ave',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily',
    gallery: foodImages
  },
  {
    name: 'ContosoPizza Redmond',
    city: 'Redmond',
    address: '2928 1st Ave',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily',
    gallery: foodImages
  },
  {
    name: 'ContosoPizza Bothell',
    city: 'Bothell',
    address: '2928 1st Ave',
    phoneNumber: '206-555-4437',
    storeHours: '10am-11pm daily',
    deliveryHours: '10am-11pm daily',
    gallery: foodImages
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
      }
    },
    twoPane: {
      paneHeader: {
          backgroundColor: '#D26441',
      },
    }
  }
}

export default App;
