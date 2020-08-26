import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, Button, TextInput, KeyboardAvoidingView } from 'react-native';
import { IMenuItem, pizzaSize } from './interfaces';
import { PaneOverlay } from 'react-native-twopane-navigation';

export interface IMenuProps {
}

const menuItems:IMenuItem[] = [
  {
    name: 'Small pizza',
    size: 'SMALL',
    price: 9.99
  },
  {
    name: 'Medium pizza',
    size: 'MEDIUM',
    price: 11.99
  },
  {
    name: 'Large pizza',
    size: 'LARGE',
    price: 13.99
  }
]

const Menu = (props: IMenuProps) => {

  const [smallPizzas, setSmallPizzas] = useState<number>(0)
  const [mediumPizzas, setMediumPizzas] = useState<number>(0)
  const [largePizzas, setLargePizzas] = useState<number>(0)
  const [showBackDrop, setShowBackDrop] = useState<boolean>(false)

  const calculateTotal = ():number => {
    const smallPrice: number = smallPizzas * menuItems[0].price;
    const mediumPrice: number = mediumPizzas * menuItems[1].price;    
    const largePrice: number = largePizzas * menuItems[2].price;    

    return smallPrice + mediumPrice + largePrice;
  }  

  const addToCart = (size: pizzaSize) => {
    switch(size) {
      case 'SMALL': {
        setSmallPizzas(count => count + 1);
        break;
      }
      case 'MEDIUM': {
        setMediumPizzas(count => count + 1);
        break;
      }
      case 'LARGE': {
        setLargePizzas(count => count + 1);
        break;
      }      
      default:{
        break;
      }
    }
  }

  const subtractFromCart = (size: pizzaSize) => {
    switch(size) {
      case 'SMALL': {
        setSmallPizzas(count => (count - 1 >= 0) ? count - 1: count);
        break;
      }
      case 'MEDIUM': {
        setMediumPizzas(count =>(count - 1 >= 0) ? count - 1: count);
        break;
      }
      case 'LARGE': {
        setLargePizzas(count => (count - 1 >= 0) ? count - 1: count);
        break;
      }
      default:{
        break;
      }
    }
  }

  const setQuantity = (text: string, size: pizzaSize) => {
    if(Number.isInteger(+text))
    {
      switch(size) {
        case 'SMALL': {
          setSmallPizzas(+text);
          break;
        }
        case 'MEDIUM': {
          setMediumPizzas(+text);
          break;
        }
        case 'LARGE': {
          setLargePizzas(+text);
          break;
        }
        default: {
          break;

        }
      }
    }
  }

  const quantity = (size: pizzaSize) => {
    switch(size) {
      case 'SMALL': {
        return smallPizzas
      }
      case 'MEDIUM': {
        return mediumPizzas
      }
      case 'LARGE': {
        return largePizzas
      }
    }
  }

  return (
    <KeyboardAvoidingView style={MenuStyles.viewContainer}>
      <FlatList
        nestedScrollEnabled={true} 
        ListHeaderComponent={(
        <Text style={MenuStyles.title}>
          Add to Cart
        </Text>
        )}
        data={menuItems}
        renderItem={({item}) => (
          <View style={MenuStyles.ItemContainer}>
            <Image source={require('./images/pizzaCheckout.jpg')} style={MenuStyles.image}/>
            <Text style={MenuStyles.name}>{item.name}</Text>
            <Text style={MenuStyles.price}>{item.price}</Text>
            <View style={MenuStyles.itemButton}>
              <Button title={'+'} 
                      color={'#D26441'}
                      onPress={()=> addToCart(item.size)} />
            </View>
            <View style={MenuStyles.itemButton}>
              <Button title={'-'} 
                      color={'#D26441'}
                      onPress={()=> subtractFromCart(item.size)} />
            </View>   
            <TextInput 
              keyboardType={'number-pad'}
              onChangeText={text => setQuantity(text,item.size)}
              value={quantity(item.size).toString()}/>
          </View>
        )}
        ListFooterComponent={(
          <View style={MenuStyles.footerContainer}>
            <Text style={MenuStyles.title}>Total: ${calculateTotal()}</Text>
            <View style={MenuStyles.checkout}>
              <Button 
                title={'Checkout'}
                color={'#D26441'}
                onPress={()=> setShowBackDrop(true)}
                />
            </View>
          </View>
        )}
        keyExtractor={item => item.name}
        />
      <PaneOverlay
        isVisible={showBackDrop}
        onBackdropPress={() => setShowBackDrop(false)}>
          <View style={MenuStyles.overlay}>
            <Text style={MenuStyles.overlayText}>Thank you for your purchase</Text>
            <Text style={MenuStyles.overlayTotal}>Total: ${calculateTotal()}</Text>
          </View>
      </PaneOverlay>
    </KeyboardAvoidingView>
  );
}

  const MenuStyles = StyleSheet.create({
    viewContainer: {
      margin: 20,
      height: '90%'
    },
    title: {
      fontSize:15,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 20
    },
    ItemContainer:{
      flex: 1,
      flexDirection: "row",
      justifyContent: 'space-evenly', 
      alignItems:'center',
      borderBottomWidth: 1,
      borderColor: '#E1E1E1',
      marginLeft: 10,
      marginRight: 20,
      paddingTop: 8,
      paddingBottom: 16,
    },
    image: {
      height: 75,
      width: 75
    },
    name: {
      width: 100
    },
    price: {
      width:50
    },
    itemButton: {
      width: 25
    },
    footerContainer: {
      height: 150,
      flex: 1,
      flexDirection: 'column',
      justifyContent: "space-between",
      alignItems:'center'
    },
    checkout: {
      width: '50%',
      borderColor: '#E1E1E1',
      borderWidth: 1
    },
    overlay: {
      width: 300,
      height: 250,
      justifyContent: 'center',
      alignItems:'center',
      borderColor: '#E1E1E1',
      borderWidth:1
    },
    overlayText: {
      fontSize:30,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    overlayTotal: {
      fontSize:20,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 20
    }
  })

export default Menu;
