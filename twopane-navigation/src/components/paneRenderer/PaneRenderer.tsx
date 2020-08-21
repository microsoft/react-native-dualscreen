import { IPaneComponent, paneType, IConfig } from "../../utilities/interfaces";
import { StyleSheet, View, StyleProp, ViewStyle} from "react-native";
import PaneHeaderContainer from "../paneHeaderContainer/PaneHeaderContainer";
import onePane from "../../onePane/onePaneStore/onePane.methods";
import React, { Fragment } from "react";
import twoPane from "../../twoPane/twoPaneStore/twoPane.methods";
import { WindowRect } from "react-native-dualscreeninfo";
import { getUtilityStore } from "../../shared/utilityStore/utilityStore.selectors";

interface IPaneRendererProps {
    paneComponent: IPaneComponent[];
    paneRects: WindowRect[];
}

const PaneRenderer = (props: IPaneRendererProps) => {
    const defaultConfig = getUtilityStore().config;
    const {  paneComponent, paneRects } = props;
    
    const isGoBackOne = paneComponent.filter(x => x.pane === paneType.ONE).length > 1;
    const isGoBackTwo = paneComponent.filter(x => x.pane === paneType.TWO).length > 1;
    
    return (
        <Fragment>
            {
                paneComponent.map((val: IPaneComponent) =>
                <View key={val.key}>
                    { (val.pane === paneType.ONE ) &&
                        <View
                            style={(val.isExtended) ? 
                                    Object.assign({},onePaneStyles(paneRects[0]).extendedPane, defaultConfig?.onePane?.paneBody!) :
                                    Object.assign({},onePaneStyles(paneRects[0]).onePane, defaultConfig?.onePane?.paneBody!)}>
                            <View style={generalStyles.header}>
                                <PaneHeaderContainer
                                    isGoBack={ isGoBackOne}
                                    screenHeader={val.header}
                                    goBack={() => (onePane.GoBack())}
                                    configDefaultHeader={defaultConfig.onePane?.paneHeader!}
                                />
                            </View>
                            <View
                                style={generalStyles.body}>
                                {val.paneElement}
                            </View>
                        </View>
                    }
                    {(val.pane === paneType.TWO && paneRects.length > 1 ) &&
                        <View 
                            style={Object.assign({},twoPaneStyles(paneRects[1]).twoPane, defaultConfig?.twoPane?.paneBody!)}>
                            <View style={generalStyles.header}>
                                <PaneHeaderContainer
                                    isGoBack={isGoBackTwo}
                                    screenHeader={val.header}
                                    goBack={() => (twoPane.GoBack())}
                                    configDefaultHeader={defaultConfig.twoPane?.paneHeader!}
                                />
                            </View>
                            <View
                                style={generalStyles.body}>
                                {val.paneElement}
                            </View>
                        </View>
                    }
                </View>
                )
            }
        </Fragment >
    )
}

const generalStyles = StyleSheet.create({
    header: {
        height: '10%'
    },
    body: {
        height: '85%'
    }
})

const onePaneStyles = (paneRects : WindowRect) => StyleSheet.create({
    onePane: {
            flex: 1,
        ...StyleSheet.absoluteFillObject,
        color: 'black',
        left: paneRects.x,
        height: paneRects.height,
        width: paneRects.width
    },
    extendedPane: {
            flex: 1,
        ...StyleSheet.absoluteFillObject,
        color: 'black',
        left: paneRects.x,
        height: paneRects.height,
        width: paneRects.width * 2
    }
});

const twoPaneStyles = (paneRects : WindowRect) => StyleSheet.create({
    twoPane: {
            flex: 1,
        ...StyleSheet.absoluteFillObject,
        color: 'black',
        left: paneRects.x,
        height: paneRects.height,
        width: paneRects.width,
    }
});

export default PaneRenderer;