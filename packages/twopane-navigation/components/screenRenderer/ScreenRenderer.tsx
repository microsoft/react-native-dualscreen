import { IScreenComponent, screenType } from "../../utilities/interfaces";
import Animated from "react-native-reanimated";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import ScreenHeaderContainer from "../screenHeaderContainer/ScreenHeaderContainer";
import singleScreen from "../../singleScreen/singleScreenStore/singleScreen.methods";
import React, { Fragment } from "react";
import dualScreen from "../../dualScreen/dualScreenStore/dualScreen.methods";

interface IScreenRendererProps {
    prependKey: string;
    screenComponent: IScreenComponent[];
}

const ScreenRenderer = (props: IScreenRendererProps) => {
    const { prependKey, screenComponent } = props;

    const isGoBackSingle = screenComponent.filter(x => x.screen === screenType.SINGLE).length > 1;
    const isGoBackDual = screenComponent.filter(x => x.screen === screenType.DUAL).length > 1;
    return (
        <Fragment>
            {
                screenComponent.map((val: IScreenComponent) =>
                    <Animated.View key={prependKey + val.key}
                        style={[ScreenRendererStyles.container, (val.screen === screenType.SINGLE ? ScreenRendererStyles.isSingle : ScreenRendererStyles.isDual)]}>
                        <View style={ScreenRendererStyles.header}>
                            <ScreenHeaderContainer
                                isGoBack={(val.screen === screenType.SINGLE ? isGoBackSingle : isGoBackDual)}
                                screenHeader={val.header}
                                goBack={() => (val.screen === screenType.SINGLE ? singleScreen.GoBack() : dualScreen.GoBack())}
                            />
                        </View>
                        <View
                            style={ScreenRendererStyles.body}>
                            {val.duexElement}
                        </View>
                    </Animated.View>
                )
            }
        </Fragment >
    )
}

const ScreenRendererStyles = StyleSheet.create({
    container: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        height: 720,
        width: 540,
        backgroundColor: 'black',
    },
    isSingle: {
        left: 0,
    },
    isDual: {
        left: 570,
    },

    header: {
        height: '10%'
    },
    body: {
        height: '85%'
    }
});

export default ScreenRenderer;