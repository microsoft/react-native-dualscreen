# react-native-dualscreen
[![npm version](https://badge.fury.io/js/react-native-dualscreen.svg)](https://badge.fury.io/js/react-native-dualscreen)
[![Dependency Status](https://david-dm.org/microsoft/react-native-dualscreen.svg)](https://david-dm.org/microsoft/react-native-dualscreen)
[![devDependencies Status](https://david-dm.org/microsoft/react-native-dualscreen/dev-status.svg)](https://david-dm.org/microsoft/react-native-dualscreen?type=dev)
[![typings included](https://img.shields.io/badge/typings-included-brightgreen.svg?t=1495378566925)](package.json)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/react-native-dualscreen)

React Native package for dual screen devices support (Surface Neo/Duo)

## Status

- Android:
  - 10+
- Windows:
  - 10X  
- react-native:
  - supported versions "<strong>&gt;= 0.60.5</strong>"

## Installation

<table>
<td>
<details style="border: 1px solid; border-radius: 5px; padding: 5px">
  <summary>with react-native "<strong>&gt;=0.60.5</strong>"</summary>

### 0. Setup Swift and Kotlin

- Modify `android/build.gradle`:

  ```diff
  buildscript {
    ext {
      ...
  +   kotlinVersion = "1.3.50"
    }
  ...

    dependencies {
  +   classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:${kotlinVersion}")
      ...
  ```

### 1. Install latest version from npm

`$ yarn add react-native-dual-screen`

### 2. Modify android:configChanges of your activity

`android:configChanges="keyboard|keyboardHidden|orientation|screenSize|smallestScreenSize|screenLayout"`

</details>
</td>
</table>

## Example

```jsx
import * as React from 'react'
import { View } from 'react-native'
import { DualScreenInfo, Hinge, SpannedChangeEvent } from 'react-native-dual-screen'

export default function App() {
  const [isDualMode, setDualMode] = useState(false)
    useEffect(() => {
        setDualMode(DualScreenInfo.isSpanned);
        
        DualScreenInfo.addEventListener('spannedChange', ({ isSpanned }: ) => {
            if (isDualMode !== isSpanned) {
                setDualMode(isSpanned)
            }
        })
    })

    if (isDualMode) {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text>Screen 1</Text>
          </View>
          <Hinge/>
          <View style={{ flex: 1 }}>
            <Text>Screen 2</Text>
          </View>
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <Text>Screen 1</Text>
      </View>  
    )
}

```

## Reference

[Documentation](https://aka.ms/dualscreendocs)
