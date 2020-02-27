/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import * as React from "react";
import { NativeProps, NativeHinge } from './NativeHinge'

type Props = NativeProps

const RefComponent = (props: Props, forwardedRef?: React.Ref<React.Component<NativeProps>>) => (
  <NativeHinge
    {...props}
    style={{ width: 33 }}
    ref={forwardedRef}
  />
);

export const RNHinge = React.forwardRef(RefComponent);
RNHinge.displayName = 'Hinge';
