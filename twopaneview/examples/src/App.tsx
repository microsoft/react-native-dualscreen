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

// let MapControl = requireNativeComponent('MapControl');

const Header = () => (
  <View style={styles.header2}>
    <Image source={require('./images/titleIcon.png')} style={styles.titleImage}/>
    <Image source={require('./images/hamburger.png')} style={styles.titleImage2}/>
  </View>
);

const MasterContent = () => (
  <View style={styles.paneAContainer}>
    {/* <View  style={styles.mapView}/> */}
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
        <TouchableHighlight>
          <View style={styles.listItem}>
            <Text style={styles.sectionTitle}>5. ContosoPizza Capitol Hill East</Text>
            <Text style={styles.sectionDescription}>Mount 2928 1st Ave</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={styles.listItem}>
            <Text style={styles.sectionTitle}>6. ContosoPizza Bellevue</Text>
            <Text style={styles.sectionDescription}>2928 1st Ave</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={styles.listItem}>
            <Text style={styles.sectionTitle}>7. ContosoPizza Redmond</Text>
            <Text style={styles.sectionDescription}>2928 1st Ave</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={styles.listItem}>
            <Text style={styles.sectionTitle}>8. ContosoPizza Bothell</Text>
            <Text style={styles.sectionDescription}>2928 1st Ave</Text>
          </View>
        </TouchableHighlight>
      </View>
    </ScrollView>
  </View>
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
      <View style={styles.divisor}/>
      <View>
        <Text style={styles.mediumTitle}>Specials</Text>
      </View>
      <View style={styles.columns}>
        <View style={styles.rows}>
          <View style={styles.columnLeftItem}>
            <Text style={styles.specialsSectionTitle}>The Popeye</Text>
            <Text style={styles.specialsSectionDescription}>
              fresh spinach, mozzarella, red onion, artichoke, sausage, red sauce
            </Text>
          </View>
          <View style={styles.columnRightItem}>
            <Text style={styles.specialsSectionTitle}>The Calista</Text>
            <Text style={styles.specialsSectionDescription}>
              roasted jalapenos, black olives, pineapple, pepperoni, mozzarella, red sauce
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.columns}>
        <View style={styles.rows}>
          <View style={styles.columnLeftItem}>
            <Text style={styles.specialsSectionTitle}>The Kate (V)</Text>
            <Text style={styles.specialsSectionDescription}>
              roasted eggplant, cremini mushrooms, kalamata olives, vegan cheese, red sause
            </Text>
          </View>
          <View style={styles.columnRightItem}>
            <Text style={styles.specialsSectionTitle}>The Space Noodle</Text>
            <Text style={styles.specialsSectionDescription}>
              mac and cheese pizza: elbow macaroni in a five cheese sauce, topped with breadcrumbs
            </Text>
          </View>
        </View>
      </View>
    </View>
  </ScrollView>
);

const App = class App extends React.Component {
  state = {
    dims: Dimensions.get('window'),
    isFullScreen: false,
    panePriority: 'pane1',
    mapAspectRatio: new Animated.Value(1.333333333333333),
    mapWidth: new Animated.Value(Dimensions.get('window').width/2)
  };

  expandMap = () => {
    var isFullScreen = !this.state.isFullScreen;
    this.setState({
      isFullScreen: !this.state.isFullScreen
    });
    this.animateSizes(isFullScreen, this.state.dims);
  }

  animateSizes(isFullScreen:any, dims:any) {
    Animated.parallel([
      Animated.timing(this.state.mapAspectRatio, {
        toValue: isFullScreen ? (dims.width / (dims.height - 50)) : 1.333333333333333,
        duration: 250
      }),
      Animated.timing(this.state.mapWidth, {
        toValue: (isFullScreen || (dims.height > dims.width)) ? dims.width : (dims.width / 2),
        duration: 250
      })
    ]).start();
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this._handleDimensionsChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this._handleDimensionsChange);
  }

  _handleDimensionsChange = (dimensions: { window: any; }) => {
    this.setState({
      dims: dimensions.window
    });
    this.animateSizes(this.state.isFullScreen, dimensions.window);
  };

  render() { return (
    <View style={styles.container}>
      {/* Orange header - Only show content on paneA */}
      <View style={styles.header}>
        <TwoPaneView panePriority='pane1' panePriorityVerticalSpanning='pane1'>

          {/* Pane A */}
          <Header/>

          {/* Empty Pane B */}

        </TwoPaneView>
      </View>
      <TwoPaneView panePriority={this.state.panePriority} panePriorityVerticalSpanning={this.state.panePriority} >

        {/* Pane A */}
        <MasterContent/>

        {/* Pane B */}
        <DetailContent/>

      </TwoPaneView>
      <View style={styles.mapContainer}>
      <Animated.View style={{
            aspectRatio: this.state.mapAspectRatio, 
            width: this.state.mapWidth,
            height: undefined}}>
          {/* <MapControl style={styles.map}/> */}
          {/* <TouchableOpacity onPress={this.expandMap} style={styles.mapExpandButtonContainer} activeOpacity={0}>
            <Image style={styles.mapExpandButtonImage} source={this.state.isFullScreen ? require('./images/backtowindow.png') : require('./images/expand.png')}/>
          </TouchableOpacity> */}
        </Animated.View>
      </View>
    </View>
  );
}};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
    flex: 1
  },
  paneAContainer: {
    flex: 1
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
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
  highlight: {
    fontWeight: '700',
  },
  firstListItem: {
    borderColor: 'gray',
    paddingBottom: 12,
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: '#E1E1E1',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  selectedListItem: {
    borderTopWidth: 4,
    borderColor: 'black',
    paddingTop: 6,
    paddingBottom: 12,
    paddingLeft: 16,
    backgroundColor: 'gray',
  },
  footer: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  header2: {
    width: '100%',
    height: 50,
    backgroundColor: '#D26441',
    justifyContent: 'center'
  },
  titleImage: {
    resizeMode: 'contain',
    width: 150,
    alignSelf: 'center'
  },
  titleImage2: {
    position: 'absolute',
    resizeMode: 'contain',
    width: 20,
    margin: 20,
    alignSelf: 'flex-start'
  },
  mapView: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.333333333333333,
  },
  mapContainer: {
    position: 'absolute',
    width: '100%', 
    height: '100%', 
    paddingTop: 50
  },
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  mapExpandButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 38,
    height: 38,
    margin: 20
  },
  mapExpandButtonImage: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
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
  divisor: {
    borderBottomWidth: 1,
    height: 1,
    width: '100%',
    borderColor: '#E1E1E1',
    marginTop: 20
  }
});

export default App;
// import React, { useEffect, useState } from 'react'
// import { DualScreenInfo, DualScreenInfoPayload } from 'react-native-dualscreen'
// import MasterDetail from './MasterDetail'
// import TwoPage from './TwoPage'
// import CompanionPane from './CompanionPane'
// import DualScreenContext from './DualScreenContext'

// export default function App() {
//     const [isDualMode, setDualMode] = useState(DualScreenInfo.isSpanning);
//     useEffect(() => {
//         DualScreenInfo.addEventListener('didUpdateSpanning', ({ isSpanning }: DualScreenInfoPayload) => {
//             if (isDualMode !== isSpanning) {
//                 setDualMode(isSpanning)
//             }
//         })
//     });

//     return (
//         <DualScreenContext.Provider
//             value={{ isDualMode }}
//         >
//             {/*<MasterDetail />*/}
//             {/*<CompanionPane />*/}
//             <TwoPage />
//         </DualScreenContext.Provider>
//     )
// }
