![Microsoft Surface](https://assets.onestore.ms/cdnfiles/external/uhf/long/9a49a7e9d8e881327e81b9eb43dabc01de70a9bb/images/microsoft-gray.png)

# Duex v.1

## Introduction

Duex library is built for React Native developers working on
multi-screen phones and devices.

This library was built with the idea to work side by side with the react-navigation library or work on its own as a replacement. This allows you, the developer, to have a flexible and premium experience to help pioneer the new wave of multi-screen device applications.

## Getting started

The Dual Navigation library is built around the core concept of viewing each screen on your multi-screen device as its own stack (LIFO) like system and rendering the very top element of said stack as the current page for the user to see.

This can be seen by the picture below
![stack Example](docs/stackExample.png)

### installation

coming soon

### Hello Dual Navigation

- **Dual App** is a component that must be the base for your React Native application and has the following properites

  - singleScreen - this will be the base screen you want to show when in single mode

  - dualScreen - this will be the base screen you want to show when in dual mode with the singleScreen showing on the other available screen

  - navigationContainer? - AppContainer if using React Navigation

![DualApp Example](docs/DualApp.png)

Now with our Dual App set up if we open up our app with only one active screen we will see.

![singleScreen Example](docs/SingleScreenExample.png)

And now if we extend our application to make use of our multi screens we will see
![dualScreen Example](docs/DualScreenExample.png)
\*notice how the singleScreen is now showing in the first panel as its own seperate entity

### Fundamentals

#### Navigating Screens

Now with our Dual App set up we can finally start navigating.

To navigate between screens we have a variety of built-in methods you can call. For purpose of this demonstration we will be introducing you to the core methods you will use during your development journey.

##### Moving Forward

- (single | dual | auto)screen.Add(element: IScreenComponent) - Push a new screen to the stack of your choosing

  - For this example we will be pushing to the dual screen if both screens are active or we will be pushing to the single screen if only using one screen

    ![dualScreen Example](docs/addingScreenExample.png)

  - Now if we run our application in dual mode we will see that we have only pushed the new screen to the dualStack

    ![dualScreenView Example](docs/addingScreenViewExample.png)

##### Going Back

The header provided by Dual Navigator automatically includes a back button when it is possible to go back from the current screen(if there is only one screen in the stack, there is nothing that you can go back to, and so there is no back button)

If you want to programmatically go back we give you the power by calling

- (single | dual | auto)Screen.GoBack() - go back one element in the stack of your choosing
  ![goBack Example](docs/GoBackExample.png)

If you have multiple screens in the stack and would like to go back to the very first screen in your stack(defaultScreen) you can call

- (single | dual | auto)Screen.BackToHome() - go back to the base element of the stack
  ![goBackToHome Example](docs/BackToHomeExample.png)

##### React Navigation

To use React Navigation with the Dual Navigation library is very simple.
create all the StackNavigators,SwitchNavigators,DrawerNavigators,etc... and pass the appContainer into the navigationContainer prop in our DualApp Component. After that you can access the navigation/route objects with the useNavigation/useRoute hooks.

- In the example we are opening a DrawerNavigator on icon press
  ![NavigationService Example](docs/navigationReferenceExample.PNG)

##### Header customization

Coming Soon

### Advanced

#### Screen Merging

when you want to keep screens through screen transition from single screen to dual screen mode you need to mark the screens you want as mergeable.

to do this is very simple, simply mark isMerge = true when you add your screen to the stack.(defaulted to false)

![ScreenMerge Code Example](docs/ScreenMergeCodeExample.PNG)

now when we start with a dual screen application and move it to single screen we can easily transition and keep our previous screen 

![ScreenMerge Example](docs/addingScreenViewExample.png)
![ScreenMerge Example](docs/ScreenMergeExample.png)


### Utilities

#### Components

##### ScreenOverlay

The ScreenOverlay is a view that floats above a screens content

![screenOverlay Example](docs/screenOverlayExample.png)

how to use

![screenOverlayCode Example](docs/screenOverlayCodeExample.png)

#### Screens

singleScreen- will call every action specifically for the singleScreen stack

dualScreen - will call every action specifically for the dualScreen stack

autoScreen - will check to see if the user is currently in singleScreen or DualScreen mode,
and will call the appropriate action the current modes stack.

- Example:
  If in singleScreen mode will call an action only to the single screen stack.

  If in dualScreen mode will call an action only to the dual screen stack

#### Methods

- (single | dual | auto)Screen.Add - Pushes element to the top of the stack

- (single | dual | auto)Screen.AddOrMoveToFront - Automatically pushes element to the top of stack or if the key is already in the stack,move that key to the top of the stack based on screen size

- (single | dual | auto)Screen.BackToHome - Removes all elements of the stack and returns the base element of the stack

- (single | dual | auto)Screen.GoBack - Go back one element in the stack

- (single | dual | auto)Screen.ReplaceScreen - Replace the default element for this component

- (single | dual | auto)Screen.ReplaceHeader - Replace the default header for this component

#### Hooks

- getDuexElementSelector - get the state of the element Store

- getHeaderSelector() - get the state of the header Store

- getScreenKeyState() - get the state of the key Store

#### Interfaces

- IHeader {
  IconPress?: () => void;
  navigationCommand?: string;
  style?: StyleProp<ViewStyle>; //expand this out
  leftIcon?: React.ReactElement;
  }
