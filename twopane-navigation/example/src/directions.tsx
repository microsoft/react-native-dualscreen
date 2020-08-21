import * as React from 'react';
import { Text, Image } from 'react-native';

export interface IDirectionsProps {
}

const Directions = (props: IDirectionsProps) => {
  return (  
    <Image source={require('./images/bingmapsdemo.png')}/>
  );
}

export default Directions;