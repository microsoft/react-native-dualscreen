import React, { Fragment } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { PaneHeaderStyles } from './PaneHeader.style';
import { IPaneHeaderProps } from '../../utilities/interfaces';

const PaneHeader = (props: IPaneHeaderProps) => {
  return (
    <View
      style={[PaneHeaderStyles.container, props.style]} //prop
    >
      {props?.leftIcon! !== undefined && (
        <Fragment>
          <TouchableOpacity
            style={PaneHeaderStyles.leftButton}
            onPress={() => props?.IconPress!()} //element
          >
            {props.leftIcon}
          </TouchableOpacity>
        </Fragment>
      )}

      <Text
        style={PaneHeaderStyles.title} //prop
      >
        {props?.title}
      </Text>
    </View>
  );
};

export default PaneHeader;
