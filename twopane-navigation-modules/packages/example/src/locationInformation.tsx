import * as React from 'react';
import { IRestaurantDetails } from './interfaces';
import { Text } from 'react-native';

export interface ILocationInformationProps {
    details: IRestaurantDetails;
}

const LocationInformation = (props: ILocationInformationProps)  =>{
    const { details } = props;
  return (
    <Text>{details.name}</Text>
  );
}

export default LocationInformation;