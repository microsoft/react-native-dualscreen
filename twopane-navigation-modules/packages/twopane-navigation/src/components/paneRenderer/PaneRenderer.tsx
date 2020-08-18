import { IPaneComponent, paneType } from "../../utilities/interfaces";
import { StyleSheet, View} from "react-native";
import ScreenHeaderContainer from "../paneHeaderContainer/PaneHeaderContainer";
import onePane from "../../onePane/onePaneStore/onePane.methods";
import React, { Fragment } from "react";
import twoPane from "../../twoPane/twoPaneStore/twoPane.methods";

interface IScreenRendererProps {
    prependKey: string;
    screenComponent: IPaneComponent[];
}

const ScreenRenderer = (props: IScreenRendererProps) => {
    const { prependKey, screenComponent } = props;

    const isGoBackONE = screenComponent.filter(x => x.screen === paneType.ONE).length > 1;
    const isGoBackTWO = screenComponent.filter(x => x.screen === paneType.TWO).length > 1;
    return (
        <Fragment>
            {
                screenComponent.map((val: IPaneComponent) =>
                    <View key={prependKey + val.key}
                        style={[ScreenRendererStyles.container, (val.screen === paneType.ONE ? ScreenRendererStyles.isONE : ScreenRendererStyles.isTWO)]}>
                        <View style={ScreenRendererStyles.header}>
                            <ScreenHeaderContainer
                                isGoBack={(val.screen === paneType.ONE ? isGoBackONE : isGoBackTWO)}
                                screenHeader={val.header}
                                goBack={() => (val.screen === paneType.ONE ? onePane.GoBack() : twoPane.GoBack())}
                            />
                        </View>
                        <View
                            style={ScreenRendererStyles.body}>
                            {val.paneElement}
                        </View>
                    </View>
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
    isONE: {
        left: 0,
    },
    isTWO: {
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