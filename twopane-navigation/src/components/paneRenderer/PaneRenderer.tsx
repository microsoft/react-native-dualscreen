import { IPaneComponent, paneType } from "../../utilities/interfaces";
import { StyleSheet, View} from "react-native";
import PaneHeaderContainer from "../paneHeaderContainer/PaneHeaderContainer";
import onePane from "../../onePane/onePaneStore/onePane.methods";
import React, { Fragment, useMemo } from "react";
import twoPane from "../../twoPane/twoPaneStore/twoPane.methods";
import { WindowRect, DualScreenInfo, DeviceOrientation } from "react-native-dualscreeninfo";
import { getUtilityStore } from "../../shared/utilityStore/utilityStore.selectors";

interface IPaneRendererProps {
    paneComponent: IPaneComponent[];
    paneRects: WindowRect[];
    orientation: DeviceOrientation;

}

const PaneRenderer = (props: IPaneRendererProps) => {
    const defaultConfig = getUtilityStore().config;
    const {  paneComponent, paneRects, orientation } = props;
    const isGoBackOne = paneComponent.filter(x => x.pane === paneType.ONE).length > 1;
    const isGoBackTwo = paneComponent.filter(x => x.pane === paneType.TWO).length > 1;
    
    const renderStyles = (pane: paneType, isExtended: boolean) => {
        if(pane === paneType.TWO)
        {
            if(paneRects.length > 1)
            {
                return Object.assign({},twoPaneStyles(paneRects[1]).twoPane, defaultConfig?.twoPane?.paneBody!);
            }
            return Object.assign({},twoPaneStyles(paneRects[0]).twoPaneManual, defaultConfig?.twoPane?.paneBody!);

        } else {
            if(isExtended) {
                if(orientation === DeviceOrientation.Landscape || orientation === DeviceOrientation.LandscapeFlipped)
                {
                    if(paneRects.length > 1)
                    {
                        return Object.assign({},extendedStyles(paneRects[0], paneRects[0].height + paneRects[1].height).extendedPaneVertical, defaultConfig?.onePane?.paneBody!)
                    }
                    return Object.assign({},extendedStyles(paneRects[0], paneRects[0].height).extendedPaneVertical, defaultConfig?.onePane?.paneBody!)
                }
                return Object.assign({},extendedStyles(paneRects[0], paneRects[0].width * 2).extendedPaneHorizontal, defaultConfig?.onePane?.paneBody!)
            }
            return Object.assign({},onePaneStyles(paneRects[0]).onePane, defaultConfig?.onePane?.paneBody!)
        }
    }

// TODO MOVE TO ONE RENDER
    return (
        <Fragment>
            {
                paneComponent.map((val: IPaneComponent) =>
                <View key={val.key}>
                        <View style={renderStyles(val.pane, val.isExtended)}>
                            <View style={generalStyles.header}>
                                <PaneHeaderContainer
                                    isGoBack={ val.pane === paneType.ONE ? isGoBackOne : isGoBackTwo}
                                    screenHeader={val.header}
                                    goBack={() => (val.pane === paneType.ONE ? onePane.GoBack() : twoPane.GoBack())}
                                    configDefaultHeader={val.pane === paneType.ONE ? defaultConfig.onePane?.paneHeader! : defaultConfig.twoPane?.paneHeader!}
                                    configDefaultHeaderText={val.pane === paneType.ONE ? defaultConfig.onePane?.paneHeaderText! : defaultConfig.twoPane?.paneHeaderText!}
                                    configDefaultHeaderIcon={val.pane === paneType.ONE ? defaultConfig.onePane?.paneHeaderIcon! : defaultConfig.twoPane?.paneHeaderIcon!}
                                />
                            </View>
                            <View
                                style={generalStyles.body}>
                                {val.paneElement}
                            </View>
                        </View>
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
        height: '90%',
    }
})

const onePaneStyles = (paneRects : WindowRect) => StyleSheet.create({
    onePane: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#f2f2f2',
        left: paneRects.x,
        height: paneRects.height,
        width: paneRects.width
    }
});

const extendedStyles = (paneRects : WindowRect, length: number) => StyleSheet.create({
    extendedPaneHorizontal: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#f2f2f2',
        left: paneRects.x,
        height: paneRects.height,
        width: length + DualScreenInfo.hingeWidth
    },
    extendedPaneVertical: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#f2f2f2',
        left: paneRects.x,
        height: length  + DualScreenInfo.hingeWidth,
        width: paneRects.width
    }
});

const twoPaneStyles = (paneRects : WindowRect) => StyleSheet.create({
    twoPane: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#f2f2f2',
        left: paneRects.x,
        height: paneRects.height,
        width: paneRects.width,
        top: paneRects.y
    },
    twoPaneManual: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#f2f2f2',
        left: paneRects.width + DualScreenInfo.hingeWidth,
        height: paneRects.height,
        width: paneRects.width,
    }
});

export default PaneRenderer;