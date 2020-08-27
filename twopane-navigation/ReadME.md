![Microsoft Surface](https://assets.onestore.ms/cdnfiles/external/uhf/long/9a49a7e9d8e881327e81b9eb43dabc01de70a9bb/images/microsoft-gray.png)

# TwoPane-Navigation v.1

## Introduction

TwoPane-Navigation library is built for React Native developers working on
multi-screen phones and devices.

This library was built with the idea to work side by side with the react-navigation library or work on its own as a replacement. This allows you, the developer, to have a flexible and premium experience one requires to help pioneer the new wave of multi-screen device applications.

## Status

- Android:
  - 10+
- react-native:
  - supported versions "<strong>&gt;= 0.60.5</strong>"


## Prerequisites
react-native-twopaneview depends on the [react-native-dualscreeninfo](https://www.npmjs.com/package/react-native-dualscreeninfo) module.  Please first install react-native-dualscreeninfo.  

`$ npm install react-native-dualscreeninfo`

Also, make sure to carefully follow the installation instructions to modify your Android project, otherwise your TwoPaneView control won't be very happy on a dual screen device!

## Installation

`$ npm install react-native-twopane-navigation`

## Getting started

The TwoPane-Navigation library is built around the core concept of viewing each pane(screen) on your multi-screen device as its own stack (LIFO) like system and rendering the very top element of said stack as the current page for the user to see.

This can be seen by the picture below
![stack Example](https://user-images.githubusercontent.com/68410905/91344222-81f85b00-e792-11ea-8b4c-70cbbdb24b68.PNG)


### Hello TwoPane-Navigation

- **TwoPaneApp** is a component that must be the base for your React Native application and has the following properties

  - onePaneDefault - this will be the base pane you want when your application is in onePane View

  - twoPaneDefault - this will be the base pane you want when your application is in twoPane View

  - config? - override default values for your application

  - navigationContainer? - AppContainer if using React Navigation

```
const App = () => {
  return (
    <TwoPaneApp 
      onePaneDefault={TwoPaneAppDefaultComponents.onePaneDefault}
      twoPaneDefault={TwoPaneAppDefaultComponents.twoPaneDefault}
      config ={TwoPaneAppDefaultComponents.config}
    />
  );
};
```


```
const TwoPaneAppDefaultComponents: ITwoPaneAppProps = {
  onePaneDefault:{
    key: 'onePane',
    paneElement: <OnePane/>,
    header: {
      title: 'OnePaneTitle'
    }

  },
  twoPaneDefault: {
    key: 'twoPane',
    paneElement: <TwoPane} />,
    header : { 
      title: 'OnePane Title'
    }
  },
  config: {
    onePane: {
      paneHeader: {
        backgroundColor: 'gray'
      },
      paneBody:{
        backgroundColor: 'black'
      }
    },
    twoPane: {
      paneHeader: {
        backgroundColor: 'gray'
      },
      paneBody:{
        backgroundColor: 'black'
      }
      paneHeaderText: {
        color: 'red'
      },
      paneHeaderIcon: {
        tintColor: 'red'
      }
    }
  }
}
```

Now with our TWO App set up if we open up our app with only one active pane we will see.

![onePane Example](https://user-images.githubusercontent.com/68410905/91344270-94729480-e792-11ea-870c-22ad0ba19725.PNG)

And now if we extend our application to make use of our multi screens we will see

![twoPane Example](https://user-images.githubusercontent.com/68410905/91344311-a2281a00-e792-11ea-9c42-ad47b10e0ec0.PNG)

- Notice in twoPane how our header text is red. this is because we did an override on our default text color in our config when we set up our app
- Notice how the onePane is now showing in the first panel as its own separate entity


# Fundamentals

## __Navigating Panes__

Now with our twopane-navigation App setup we can finally start navigating.

To navigate between panes we have a variety of built-in methods one can call. For purpose of this demonstration we will be introducing you to the core methods one will be using during your development journey.

### Moving Forward

- (one | two | auto)Pane.Add(key: string, element: ReactElement, header?: IHeader, isMergeONE = false, isMergeTWO = false) - Pushes element to the top of the stack or replaces the original with the new element

  - For this example we will be pushing to twoPane if both panes are active or we will be pushing to the onePane if only using one pane

 ```
  autoPane.Add(
    'exampleScreen',
    <NextExampleScreen/>,
    header: {
      title: 'NextExampleScreen'
    },
    true,
    true) 
```

  - Now if we run our application in twoPane mode we will see that we have only pushed the new screen to the twoPane Stack

    ![twoPaneView Example](https://user-images.githubusercontent.com/68410905/91344406-c3890600-e792-11ea-9d51-ab7f5295c836.PNG)
- Notice in twoPane how our header icon is red. this is because we did an override on our default text color in our config when we set up our app

### Going Back

The header provided by twoPane-navigation automatically includes a back button when it is possible to go back from the current pane(if there is only one pane in the stack, there is nothing that you can go back to, and so there is no back button)

If you want to programmatically go back we give you the power by calling

- (ONE | TWO | auto)Pane.GoBack() - go back one element in the stack of your choosing
```
<TouchableOpacity
  onPress{() => onePane.GoBack()}>
  <Text>Press me to go back in our onePane Stack</Text>
</TouchableOpacity>
```

If you have multiple panes in the stack and would like to go back to the very first pane in your stack(defaultPane) you can call

- (ONE | TWO | auto)Pane.BackToHome() - Removes all elements of the stack and returns the base element of the stack
```
<TouchableOpacity
  onPress{() => onePane.BackToHome()}>
  <Text> Press me to go back to our default pane in our onePane Stack </Text>
</TouchableOpacity>
```

### React Navigation

To use React Navigation with the twopane-navigation library is very simple.
create all the StackNavigators,SwitchNavigators,DrawerNavigators,etc... and pass the appContainer into the navigationContainer prop in our TwoPaneApp Component. After that you can access the navigation/route objects with the useNavigation/useRoute hooks.

```
const App = () => {
  return (
    <TwoPaneApp 
      onePaneDefault={TwoPaneAppDefaultComponents.onePaneDefault}
      twoPaneDefault={TwoPaneAppDefaultComponents.twoPaneDefault}
      config ={TwoPaneAppDefaultComponents.config}
      navigationContainer={AppContainer()}
    />
  );
};

const AppContainer = () => {
  return (
      <NavigationContainer>
        <Main.Screen
          name="base"
          component={TwoPaneHub}
          options={{ headerShown: false }}
        />
      </NavigationContainer>
  );
};
```
 - note in order to use react-navigation we must set the homepage to TwoPaneHub


### Header Customization

When you want to customize your header to add a button and more just call the ReplaceHeader method for the pane you want to replace

- (ONE | TWO | auto)Pane.BackToHome() - Removes all elements of the stack and returns the base element of the stack

```
    onePane.ReplaceHeader(
      'exampleScreen',
      {
        leftIcon: <CommIcon size={20} name={'menu'} color={'#F2F2F2'} />,
        IconPress: () => {CustomMethod()}
      }
    );
```

## __Advanced__

### Pane Merging

when you want to keep panes through pane transition from onePane to twoPane mode you need to mark the screens you want as isMergeOne or isMergeTwo.

to do this is very simple, simply mark isMerge = true when you add your screen to the stack.(defaulted to false)

```
onePane.Add(
  'NextExampleScreen',
  <NextExampleScreen />,
  header: {
    title: 'NextExampleScreen'
  },
  true
)

```

now when we start with a TWO screen application and move it to ONE screen we can easily transition and keep our previous screen 

![ScreenMerge Example](https://user-images.githubusercontent.com/68410905/91344406-c3890600-e792-11ea-9d51-ab7f5295c836.PNG)

![ScreenMerge Example](https://user-images.githubusercontent.com/68410905/91344506-e1ef0180-e792-11ea-92e5-9f01bae0d360.PNG)
- Notice in twoPane how our header icon and text is now white where previously it was red. this is because we did not override the colors in our onePane config and because NextExampleScreen has now Merged into onePane it now takes on the default onePane stylings

## __Utilities__


## Components

#### ScreenOverlay

The ScreenOverlay is a view that floats above a screens content

how to use

```
<ScreenOverlay
  isVisible={true}
  overlayStyle={{
    margin: 60,
    borderWidth: 3,
    borderColor: 'gray'
  }}>
  <WelcomeOverlay/>
</ScreenOverlay>
```

![screenOverlay Example](https://user-images.githubusercontent.com/68410905/91344569-f16e4a80-e792-11ea-85bb-ce0fe393ee35.PNG)

now although above is just a very simple implementation this can be used for all sorts of things. The example below is using our  PaneOverlay component to create a scrollable picture gallery (this can be found in our example app)

![screenOverlay Example](https://user-images.githubusercontent.com/68410905/91344629-06e37480-e793-11ea-95ca-cdb60c384a19.PNG)


## Panes

onePane- will call every action specifically for the onePane stack

twoPane - will call every action specifically for the twoPane stack

autoPane - will check to see if there is onePane or twoPane currently active,
and will call the appropriate action to the current pane

- Example:
  If onePane is active will call an action only to the onePane stack

  If twoPane is active will call an action only to the twoPane stack

#### Methods

- (ONE)Pane.AddExtended - Pushes element to the top of the onePane stack thats extended over both onePane and twoPane

- (ONE | TWO )Pane.mergeToOppositePane - When the apps active panes changes move panes marked as isMerged to onePane


- (ONE | TWO | auto)Pane.Add - Pushes element to the top of the stack or replaces the original with the new element

- (ONE | TWO | auto)Pane.AddOrMoveToFront - Pushes element to the top of the stack or moves the original to the top of the stack

- (ONE | TWO | auto)Pane.AddOrMoveToFrontONE - pushes element to the top of stack or if the key is already in the ONE screen stack, move that key to the top of the ONE screen stack based on screen size

- (ONE | TWO | auto)Pane.AddOrMoveToFrontTWO -  pushes element to the top of stack or if the key is already in the  TWO screen stack, move that key to the top of the TWO screen stack based on screen size

- (ONE | TWO | auto)Pane.BackToHome - Removes all elements of the stack and returns the base element of the screen stack based on screen size

- (ONE | TWO | auto)Pane.GoBack - Go back one element in the stack based on pane

- (ONE | TWO | auto)Pane.ReplacePane - Replace replace element in the stack based on screen size

- (ONE | TWO | auto)Pane.ReplaceHeader - Replace header in the stack based on screen size

#### Hooks

- getTwoPaneElementSelector - get the state of the element Store

- getHeaderSelector() - get the state of the header Store

- getScreenKeyState() - get the state of the key Store

- getUtilityStore() - get the state of the utility store

#### Interfaces

```

  interface ITwoPaneAppProps {
    /**
    * Default element for ONE screen mode
    */
    onePaneDefault: IBasePaneComponent;

    /**
    * Default element for TWO screen mode
    */
    twoPaneDefault: IBasePaneComponent;

    /**
    * override default values for your application
    */
    config?: IConfigComponent

    /**
    * AppContainer if using React Navigation
    */
    navigationContainer?: JSX.Element;
  }

  interface IConfigComponent {
    onePane?: IConfig;
    twoPane?: IConfig;
  }

  interface IHeader {
      title?: string;
      IconPress?: () => void;
      style?: StyleProp<ViewStyle>; //expand this out
      leftIcon?: ReactElement;
  }

```