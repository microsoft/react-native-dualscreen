/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  ViewProps,
  Text,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  Image,
  Button,
  requireNativeComponent,
  TouchableOpacity
} from 'react-native';

import { TwoPaneView } from 'react-native-twopaneview';

const Header = () => (
  <View style={styles.header}>
    <Image source={require('./images/titleIcon.png')} style={styles.titleImage}/>
  </View>
);

const MasterContent = () => (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <View style={styles.sectionContainer}>
        <TouchableHighlight>
          <View style={styles.listItem}>
            <Text style={styles.sectionTitle}>1. ContosoPizza Seattle Center</Text>
            <Text style={styles.sectionDescription}>2928 1st Ave</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={styles.listItem}>
            <Text style={styles.sectionTitle}>2. ContosoPizza Westlake</Text>
            <Text style={styles.sectionDescription}>714 Taylor Ave N</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={styles.listItem}>
            <Text style={styles.sectionTitle}>3. ContosoPizza Pioneer Square</Text>
            <Text style={styles.sectionDescription}>112 1st Ave S #100</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={styles.listItem}>
            <Text style={styles.sectionTitle}>4. ContosoPizza Capitol Hill</Text>
            <Text style={styles.sectionDescription}>1427 Broadway</Text>
          </View>
        </TouchableHighlight>
      </View>
    </ScrollView>
);

const DetailContent = () => (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    style={styles.scrollView}>
    <View style={styles.sectionContainerWithPadding}>
      <View>
        <Image source={require('./images/pizza.png')} style={styles.pizzaImage}/>
      </View>
      <View>
        <Text style={styles.largerTitle}>ContosoPizza Seattle Center</Text>
      </View>
      <View style={styles.columns}>
        <View style={styles.rows}>
          <View style={styles.columnLeftItem}>
            <Text style={styles.subSectionContainer}>
              <Text style={styles.subSectionTitle}>Address: </Text>
              <Text style={styles.subSectionDescription}>
                2928 1st Ave, Seattle, WA 98121
              </Text>
            </Text>
            <Text style={styles.subSectionContainer}>
              <Text style={styles.subSectionTitle}>Phone: </Text>
              <Text style={styles.subSectionDescription}>
                206-555-4437
              </Text>
            </Text>
            <Text style={styles.subSectionContainer}>
              <Text style={styles.subSectionTitle}>Store Hours: </Text>
              <Text style={styles.subSectionDescription}>
                10am-11pm daily
              </Text>
            </Text>
            <Text style={styles.subSectionContainer}>
              <Text style={styles.subSectionTitle}>Delivery Hours: </Text>
              <Text style={styles.subSectionDescription}>
                10am-11pm daily
              </Text>
            </Text>
          </View>
          <View style={styles.columnRightItem}>
            <View>
              <View>
                <Button title='Order now' color='#D26441' onPress={()=> {console.log('works');}}/>
              </View>
              <View style={styles.getDirectionsView}>
                <Image source={require('./images/directions.png')} style={styles.directionsImage}/>
                <Text style={styles.getDirections}>Get directions</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  </ScrollView>
);

const App = class App extends React.Component {
  render() { return (
    <View style={styles.container}>
      {/* Orange header - Only show content on paneA */}
      <View style={styles.header}>
        <TwoPaneView>

          {/* Pane A */}
          <Header/>

          {/* Empty Pane B */}
        </TwoPaneView>
      </View>
      <TwoPaneView>

        {/* Pane A */}
        <MasterContent/>

        {/* Pane B */}
        <DetailContent/>
      </TwoPaneView>
    </View>
  );
}};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: 50,
    backgroundColor: '#D26441',
  },
  scrollView: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  sectionContainer: {
    backgroundColor: 'white',
    marginTop: 0,
  },
  sectionContainerWithPadding: {
    backgroundColor: 'white',
    paddingHorizontal: 48,
    marginTop: 32,
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '400',
    color: '#777777',
  },
  largerTitle: {
    marginTop: 24,
    fontSize: 28,
    fontWeight: '600',
    color: 'black',
  },
  mediumTitle: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
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
    fontSize: 13,
    fontWeight: '200',
    color: 'black',
  },
  specialsSectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'black',
  },
  specialsSectionDescription: {
    marginBottom: 12,
    fontSize: 13,
    fontWeight: '200',
    color: 'black',
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: '#E1E1E1',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  titleImage: {
    resizeMode: 'contain',
    width: 150,
    alignSelf: 'center'
  },
  pizzaImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 2.066666666666667,
    resizeMode: 'contain',
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
  },
});

export default App;
