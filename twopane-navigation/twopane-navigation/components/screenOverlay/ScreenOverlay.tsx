import React, { Fragment} from 'react';

import {
  View, ViewStyle, StyleProp,
} from 'react-native';
import { ScreenOverlayStyles } from './ScreenOverlay.styles';

interface IScreenOverlayProps {
   /**
   * Content of the overlay
   */
    children: React.ReactElement<any>;
   /**
   * If true, the overlay is visible
   */
    isVisible:  boolean;
   /**
   * Style for the backdrop
   */
    backdropStyle?: StyleProp<ViewStyle>;
   /**
   * Style of the actual overlay
   */
    overlayStyle?: StyleProp<ViewStyle>;
   /**
   * Callback when user touches the backdrop
   */
    onBackdropPress?:()=> void;
}

const ScreenOverlay = (props: IScreenOverlayProps) => {
  return (
    <Fragment>
      {props.isVisible && (
        <View
          style={[ScreenOverlayStyles.backdrop, props.backdropStyle]}
            onTouchEndCapture={event => {
              //check if we are clicking ourselves or a different component
              if (
                String(event.currentTarget) === String(event.nativeEvent.target)
              ) {
                if(props?.onBackdropPress)
                {
                  props?.onBackdropPress!();
                }
              }
            }}>
            <View
              pointerEvents={'box-none'}
              style={[ScreenOverlayStyles.overlay, props.overlayStyle]}>
              {props.children}
            </View>
          </View>
      )}
    </Fragment>
  );
};

export default ScreenOverlay;
