import React from "react";
import { RNHinge as Hinge } from './RNHinge'
import { StyleSheet, View } from "react-native";

export interface TwoPaneViewProps {
  leftComponent: React.Component,
  rightComponent: React.Component,
}

export const RNTwoPaneView = ({ leftComponent, rightComponent}: TwoPaneViewProps) => {
  return (
    ""
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
