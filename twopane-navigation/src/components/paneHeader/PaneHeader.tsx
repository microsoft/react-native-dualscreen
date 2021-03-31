import React, { Fragment } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { PaneHeaderStyles } from './PaneHeader.style';
import { IHeader } from '../../shared/screenStore/headerStore/header.interface';
import { StyleText } from '../../utilities/interfaces';

interface IPaneHeaderProps extends IHeader {
  defaultHeaderTitle: StyleText
}
const PaneHeader = (props: IPaneHeaderProps) => {
  const { defaultHeaderTitle }= props;
  return (
    <View
      style={[PaneHeaderStyles.container, props.style]} //prop
    >
      {props?.leftIcon! !== undefined && (
        <Fragment>
          <TouchableOpacity
            accessibilityLabel={'header_button'}
            style={PaneHeaderStyles.leftButton}
            onPress={() => props?.IconPress!()} //element
          >
            {props.leftIcon}
          </TouchableOpacity>
        </Fragment>
      )}

      <Text
        style={[PaneHeaderStyles.title, defaultHeaderTitle]} //prop
      >
        {props?.title}
      </Text>
    </View>
  );
};

export default PaneHeader;
