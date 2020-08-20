import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../paneHeader/PaneHeader';
import { IHeader } from '../../shared/screenStore/headerStore/header.interface';
import { Style } from '../../utilities/interfaces';

interface IPaneHeaderContainerProps {
    isGoBack: boolean;
    screenHeader: IHeader | undefined;
    goBack: () => any;
    configDefaultHeader: Style;
}

const PaneHeaderContainer = (props: IPaneHeaderContainerProps) => {

    const { isGoBack, screenHeader, goBack, configDefaultHeader } = props;
    
    return (
        <View style={{ flex: 1 }}>
            {isGoBack ? (
                <ScreenHeader
                 style={[
                            paneHeaderContainerStyles.HeaderDefault, configDefaultHeader!
                        ]}
                    title={screenHeader?.title}
                    leftIcon={
                        screenHeader?.leftIcon ? (
                            screenHeader?.leftIcon
                        ) : (
                                <Icon name={'arrow-back'} color={'#F2F2F2'} size={20} />
                            )
                    }
                    IconPress={
                        screenHeader?.IconPress
                            ? screenHeader?.IconPress
                            : () => { goBack(); }
                    }
                />
            ) : (
                    //</View>
                    <ScreenHeader
                 style={[
                            paneHeaderContainerStyles.HeaderDefault, configDefaultHeader!
                        ]}
                        title={screenHeader?.title}
                        leftIcon={
                            screenHeader?.leftIcon &&
                            screenHeader?.leftIcon
                        }
                        IconPress={
                            screenHeader?.IconPress &&
                            screenHeader?.IconPress
                        }
                    />
                )}
        </View>
    )
}

const paneHeaderContainerStyles = StyleSheet.create({
    HeaderDefault: {
        paddingHorizontal: 25,
        backgroundColor: '#212121',
    }
});

export default PaneHeaderContainer;