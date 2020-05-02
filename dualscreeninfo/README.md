# react-native-dualscreeninfo

React Native package for dual screen devices support (Surface Duo)

## Status

- Android:
  - 10+
- react-native:
  - supported versions "<strong>&gt;= 0.60.5</strong>"

## Installation

### 0. Setup Kotlin

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

`$ yarn add react-native-dualscreeninfo`

### 2. Modify android:configChanges of your activity, in AndroidManifest.xml

`android:configChanges="keyboard|keyboardHidden|orientation|screenSize|smallestScreenSize|screenLayout"`


## Example

```jsx
import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { DualScreenInfo, Hinge, DualScreenInfoPayload } from 'react-native-dualscreeninfo'

export default function App() {
  const [isDualMode, setDualMode] = useState(DualScreenInfo.isSpanning)
    useEffect(() => {
        DualScreenInfo.addEventListener('didUpdateSpanning', ({ isSpanning }: DualScreenInfoPayload) => {
            if (isDualMode !== isSpanning) {
                setDualMode(isSpanning)
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

[API Documentation](https://github.com/react-native-community/discussions-and-proposals/issues/189)

[Dual-Screen](https://aka.ms/dualscreendocs)
