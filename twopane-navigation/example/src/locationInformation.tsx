import React, { Fragment, useState, useRef } from 'react';
import { IRestaurantDetails, imageRequire } from './interfaces';
import { Text, View, Image, StyleSheet, ScrollView, Button, TouchableOpacity, FlatList } from 'react-native';
import { autoPane, onePane, PaneOverlay } from 'react-native-twopane-navigation';
import Menu from './menu';
import Directions from './directions';
import  Icon  from 'react-native-vector-icons/MaterialIcons';

export interface ILocationInformationProps {
    details: IRestaurantDetails;
}

const LocationInformation = (props: ILocationInformationProps) => {
    const { details } = props;

  const [showBackDrop, setShowBackDrop] = useState<boolean>(false)
  const [currentImage, setCurrentImage] = useState<imageRequire>(details.gallery[0])
  const _index = useRef<number>(0)

  const leftArrow = () => {
    _index.current = (_index.current - 1 < 0) ? _index.current = details.gallery.length -1  : _index.current - 1;
    setCurrentImage(details.gallery[_index.current])
  }

  const rightArrow = () => {
    _index.current = (_index.current + 1 > details.gallery.length -1) ? _index.current = 0  : _index.current + 1;
    setCurrentImage(details.gallery[_index.current])
  }

  return (
    <View style={locationInformationStyles.containerView}>
      <FlatList
      nestedScrollEnabled 
      ListHeaderComponent= {
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
                    <Button title='View Menu' color='#D26441' 
                      onPress={()=> autoPane.Add(`menu ${details.name}`,
                      <Menu />,
                      {title: `${details.city} Menu`},
                      true,true)}/>
                  </View>
                  <TouchableOpacity onPress={()=> onePane.AddExtended(`directions ${details.name}`,
                      <Directions />,
                      {title: 'Directions'})}>
                    <View style={locationInformationStyles.getDirectionsView}>
                      <Image source={require('./images/directions.png')} 
                              style={locationInformationStyles.directionsImage}
                              resizeMode={'contain'}/>
                      <Text style={locationInformationStyles.getDirections}>Get directions</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        }
        data={details.gallery}
        renderItem={({ item, index }) => (
          <View style={locationInformationStyles.galleryContainer}>
            <TouchableOpacity onPress={() => {setShowBackDrop(true)
                                              _index.current = index
                                              setCurrentImage(item)}} >
              <Image style={locationInformationStyles.imageThumbnail} source={item.image} />
            </TouchableOpacity>
          </View>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item) => item.image.toString()}
      />
      <PaneOverlay
        isVisible={showBackDrop}
        onBackdropPress={() => setShowBackDrop(false)}
        overlayStyle={{ backgroundColor: 'rgba(52, 52, 52, 0.0)'}}>
        <View style={locationInformationStyles.overlayContainer}>
          <TouchableOpacity style={locationInformationStyles.icon}
                            onPress={() => leftArrow()}>
            <Icon name={'chevron-left'} size={30} 
                  style={{alignSelf:'center'}} color={'#D26441'}/>
          </TouchableOpacity>

          <Image
            style={locationInformationStyles.overlayImage}
            source={currentImage.image}
            resizeMode={'cover'}
          />
          <TouchableOpacity style={locationInformationStyles.icon}
                            onPress={() => rightArrow()}>
            <Icon name={'chevron-right'} size={30} color={'#D26441' }/>
          </TouchableOpacity>
        </View>
      </PaneOverlay>
    </View>
  );
}

const locationInformationStyles = StyleSheet.create({
  containerView: {
    width: '100%',
    height: '100%',
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
    color: '#4794CC'
  },
  directionsImage: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  galleryTitle: {
    marginTop: 24,
    fontSize: 28,
    fontWeight: '600',
    color: 'black',
    alignSelf: 'center'
  },
  galleryContainer: {
    flex: 1, 
    flexDirection: 'column', 
    margin:15
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150
  },
  overlayContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  overlayImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 360,
    height: 400,
    borderColor: '#D26441' ,
    borderWidth: 1
  },
  icon:{
    backgroundColor: 'black',
    height: 100,
    marginHorizontal:20,
    justifyContent:'center',
    borderColor: '#D26441' ,
    borderWidth:1
  }
})

export default LocationInformation;