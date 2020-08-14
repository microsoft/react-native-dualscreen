/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import React from 'react'
import { requireNativeComponent, ViewProps } from 'react-native'

export type NativeProps = ViewProps & {
}

export const NativeHinge: React.ComponentClass<NativeProps> = requireNativeComponent(
    'RNHinge'
)
