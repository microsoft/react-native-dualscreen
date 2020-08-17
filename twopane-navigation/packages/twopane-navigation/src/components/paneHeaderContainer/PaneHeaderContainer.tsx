import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../paneHeader/PaneHeader';
import { paneHeaderContainerStyles } from './PaneHeaderContainer.style';
import { IHeader } from '../../Shared/screenStore/headerStore/header.interface';

interface IPaneHeaderContainerProps {
    isGoBack: boolean;
    screenHeader: IHeader | undefined;
    goBack: () => any;
}

const PaneHeaderContainer = (props: IPaneHeaderContainerProps) => {

    const { isGoBack, screenHeader, goBack } = props;

    return (
        <View style={{ flex: 1 }}>
            {isGoBack ? (
                <ScreenHeader
                    style={{
                        ...paneHeaderContainerStyles.HeaderDefault //look into header
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
                            ...paneHeaderContainerStyles.HeaderDefault
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

export default PaneHeaderContainer;