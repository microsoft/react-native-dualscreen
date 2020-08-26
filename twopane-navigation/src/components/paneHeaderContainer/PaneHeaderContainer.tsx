import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ScreenHeader from '../paneHeader/PaneHeader';
import { IHeader } from '../../shared/screenStore/headerStore/header.interface';
import { Style, StyleText, StyleImage } from '../../utilities/interfaces';

interface IPaneHeaderContainerProps {
    isGoBack: boolean;
    screenHeader: IHeader | undefined;
    goBack: () => any;
    configDefaultHeader: Style;
    configDefaultHeaderText: StyleText;
    configDefaultHeaderIcon: StyleImage;
}

const PaneHeaderContainer = (props: IPaneHeaderContainerProps) => {

    const { isGoBack, screenHeader, goBack, configDefaultHeader, configDefaultHeaderText, configDefaultHeaderIcon } = props;
    
    return (
        <View style={{ flex: 1 }}>
            {isGoBack ? (
                <ScreenHeader
                    style={[
                            paneHeaderContainerStyles.HeaderDefault, configDefaultHeader!
                        ]}
                    defaultHeaderTitle={configDefaultHeaderText}
                    title={screenHeader?.title}
                    leftIcon={
                        screenHeader?.leftIcon ? (
                            screenHeader?.leftIcon
                        ) : (
                            <Image source={require('../images/back.png')} style={[paneHeaderContainerStyles.defaultIcon, configDefaultHeaderIcon!]}/>
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
                        defaultHeaderTitle={configDefaultHeaderText}
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
        backgroundColor: '#0078d4',
    },
    defaultIcon: {
        width: 30, 
        height: 30, 
        tintColor: 'white'
    }
});

export default PaneHeaderContainer;