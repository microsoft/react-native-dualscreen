import React from "react";
import { RNHinge as Hinge } from './RNHinge'
import { StyleSheet, View } from "react-native";

export interface TwoPaneViewProps {
  leftComponent: React.Component,
  rightComponent: React.Component,
}

export const RNTwoPaneView = ({ leftComponent, rightComponent}: TwoPaneViewProps) => {
  return (
    <View style={_styles.containerStyle}>
      <View style={_styles.innerContainerStyle}>
        {leftComponent}
      </View>
      <Hinge/>
      <View style={_styles.innerContainerStyle}>
        {rightComponent}
      </View>
    </View>
  );
};

const _styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  innerContainerStyle: {
    flex: 1,
  }
});
