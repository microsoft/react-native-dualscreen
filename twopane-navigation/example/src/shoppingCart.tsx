import * as React from 'react';
import { Text } from 'react-native';

export interface IShoppingCartProps {
}

const ShoppingCart = (props: IShoppingCartProps) => {
  return (
    <Text>HELLO WORLD FROM SHOPPING CART{Math.random()}</Text>
  );
}

export default ShoppingCart;
