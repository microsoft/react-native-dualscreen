import React from 'react';
import { View, StyleSheet, Image, BackHandler, Alert } from 'react-native';
import ScreenHeader from '../paneHeader/PaneHeader';
import { IHeader } from '../../shared/screenStore/headerStore/header.interface';
import { Style, StyleText, StyleImage } from '../../utilities/interfaces';
import utility from '../../utilities/utility.methods'

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

    const backActionHandler = () => {
        if(isGoBack)
        {
            goBack();
        } else{
            Alert.alert("Alert!", "Are you sure you want to exit app?", [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
              },
              { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
        }
        return true;
      };

    utility.useBackHandler(backActionHandler);

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
      paddingHorizontal: 18,
      backgroundColor: '#0078d4'
    },
    defaultIcon: {
      width: 30,
      height: 30,
      tintColor: 'white'
    }
  });

export default PaneHeaderContainer;