# TwoPaneView

## Status

- Android:
  - 10+
- react-native:
  - supported versions "<strong>&gt;= 0.60.5</strong>"

## API

[Documentation](https://github.com/react-native-community/discussions-and-proposals/issues/197)
- `Auto` 
![](https://github.com/microsoft/react-native-dualscreen/raw/master/twopaneview/paneModesDemo/auto.JPG)
- `Single`
![](https://github.com/microsoft/react-native-dualscreen/raw/master/twopaneview/paneModesDemo/single.JPG)
- `Dual`
![](https://github.com/microsoft/react-native-dualscreen/raw/master/twopaneview/paneModesDemo/dual.JPG)
- `panePriority='pane2'`
![](https://github.com/microsoft/react-native-dualscreen/raw/master/twopaneview/paneModesDemo/priority2.JPG)
- `onModeChanged={()=>{console.log('onModeChanged');}`

## Installation

### Please refer to the react-native-dualscreen page to install the latest version of DualScreenInfo first.

- Current examples work by adding the following dependency in  `package.json`:

  ```diff
  + "react-native-dualscreen": "file:../dualscreeninfo",
  ```
- Then `import TwoPaneView from '../TwoPaneView'`

## How to run sample app

### 1. Yarn install

`$ yarn install`

### 2. (Optional) Clean build android  

`$ cd android ` then `$ gradlew clean `

### 3. Yarn run android

Start emulator, then run
`$ yarn run:android`

## Reference

[Documentation](https://aka.ms/dualscreendocs)
