import React, { } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../screenHeader/ScreenHeader';
import { screenHeaderContainerStyles } from './ScreenHeaderContainer.style';
import { IHeader } from '../../Shared/screenStore/headerStore/header.interface';

interface IScreenHeaderContainerProps {
    isGoBack: boolean;
    screenHeader: IHeader | undefined;
    goBack: () => any;
}

const ScreenHeaderContainer = (props: IScreenHeaderContainerProps) => {

    const { isGoBack, screenHeader, goBack } = props;

    return (
        <View style={{ flex: 1 }}>
            {isGoBack ? (
                <ScreenHeader
                    style={{
                        ...screenHeaderContainerStyles.HeaderDefault //look into header
                    }}
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
                        style={{
                            ...screenHeaderContainerStyles.HeaderDefault
                        }}
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

export default ScreenHeaderContainer;