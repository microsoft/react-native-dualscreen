import React, { Fragment } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScreenHeaderStyles } from './ScreenHeader.style';
import { IHeader } from '../../Shared/screenStore/headerStore/header.interface';

export interface IScreenheaderProps extends IHeader {
}

const ScreenHeader = (props: IScreenheaderProps) => {
  return (
    <View
      style={[ScreenHeaderStyles.container, props.style]} //prop
    >
      {props?.leftIcon! !== undefined && (
        <Fragment>
          <TouchableOpacity
            style={ScreenHeaderStyles.leftButton}
            onPress={() => props?.IconPress!()} //element
          >
            {props.leftIcon}
          </TouchableOpacity>
        </Fragment>
      )}

      <Text
        style={ScreenHeaderStyles.title} //prop
      >
        {props?.title}
      </Text>
    </View>
  );
};

export default ScreenHeader;
