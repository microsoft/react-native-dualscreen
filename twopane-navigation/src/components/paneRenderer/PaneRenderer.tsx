import { IExtensionOptions, IPaneComponent, paneType, Style } from "../../utilities/interfaces";
import { StyleSheet, View} from "react-native";
import PaneHeaderContainer from "../paneHeaderContainer/PaneHeaderContainer";
import onePane from "../../onePane/onePaneStore/onePane.methods";
import React, { Fragment, useMemo } from "react";
import twoPane from "../../twoPane/twoPaneStore/twoPane.methods";
import { WindowRect, DualScreenInfo, DeviceOrientation } from "react-native-dualscreeninfo";
import { getUtilityStore } from "../../shared/utilityStore/utilityStore.selectors";

interface IPaneRendererProps {
    paneComponents: IPaneComponent[];
    paneRects: WindowRect[];
    orientation: DeviceOrientation;
}

const PaneRenderer = (props: IPaneRendererProps) => {
    const defaultConfig = getUtilityStore().config;
    const {  paneComponents, paneRects, orientation } = props;
    const paneOneComponents = paneComponents.filter(x => x.pane === paneType.ONE);
    const paneTwoComponents = paneComponents.filter(x => x.pane === paneType.TWO);
    const firstPane = paneComponents[0];
    const isPaneOneExtended = () => {
        if (
          firstPane.pane === paneType.ONE &&
          firstPane.extensionOptions?.isExtendedLandscape &&
          (orientation === DeviceOrientation.Landscape ||
            orientation === DeviceOrientation.LandscapeFlipped)
        ) {
          return true;
        } else if (
          firstPane.pane === paneType.ONE &&
          firstPane.extensionOptions?.isExtendedPortrait &&
          (orientation === DeviceOrientation.Portrait ||
            orientation === DeviceOrientation.PortraitFlipped)
        ) {
          return true;
        } else {
          return false;
        }
      };
    const renderStyles = (pane: paneType, extensionOptions?: IExtensionOptions) => {
        if (pane === paneType.TWO)
        {
            if ((orientation === DeviceOrientation.Landscape || orientation === DeviceOrientation.LandscapeFlipped) && extensionOptions?.isExtendedLandscape && paneRects.length > 1)
            {    
                return Object.assign({},extendedStyles(paneRects[0], paneRects[0].height + paneRects[1].height).extendedPaneVertical, defaultConfig?.twoPane?.paneBody!)
            } 
            else if ((orientation === DeviceOrientation.Portrait || orientation === DeviceOrientation.PortraitFlipped) && extensionOptions?.isExtendedPortrait && paneRects.length > 1) 
            {
                return Object.assign({},extendedStyles(paneRects[0], paneRects[0].width * 2).extendedPaneHorizontal, defaultConfig?.twoPane?.paneBody!)
            }          
            else if(paneRects.length > 1)
            {
                if (isPaneOneExtended()) {
                    return Object.assign({},twoPaneStyles(paneRects[1]).paneOneExtended, defaultConfig?.twoPane?.paneBody!);
                }
                return Object.assign({},twoPaneStyles(paneRects[1]).twoPane, defaultConfig?.twoPane?.paneBody!);
            }
            return Object.assign({},twoPaneStyles(paneRects[0]).twoPaneManual, defaultConfig?.twoPane?.paneBody!);

        } else {
            if ((orientation === DeviceOrientation.Landscape || orientation === DeviceOrientation.LandscapeFlipped) && extensionOptions?.isExtendedLandscape && paneRects.length > 1)
            {   
                return Object.assign({},extendedStyles(paneRects[0], paneRects[0].height + paneRects[1].height).extendedPaneVertical, defaultConfig?.onePane?.paneBody!)
                
            } 
            else if ((orientation === DeviceOrientation.Portrait || orientation === DeviceOrientation.PortraitFlipped) && extensionOptions?.isExtendedPortrait && paneRects.length > 1) 
            {
                return Object.assign({},extendedStyles(paneRects[0], paneRects[0].width * 2).extendedPaneHorizontal, defaultConfig?.onePane?.paneBody!)
            }
            return Object.assign({},onePaneStyles(paneRects[0]).onePane, defaultConfig?.onePane?.paneBody!)
        }
        
    }

    const isComponentDisplayed = (component: IPaneComponent) => {
        const isTopPaneOne =
            component.pane === paneType.ONE &&
            paneOneComponents.pop()?.key === component.key;
        const isTopPaneTwo =
            component.pane === paneType.TWO &&
            paneTwoComponents.pop()?.key === component.key;
        /*
            If app is in single screen mode enable for top element of pane one. 
            If app is in two screen mode enable for top element of pane one, and top element of pane two but only if pane one is not extended across both screens.
        */
        if (
            (paneRects.length === 1 && isTopPaneOne) ||
            (paneRects.length > 1 &&
                (isTopPaneOne || (isTopPaneTwo && !isPaneOneExtended())))
        ) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <Fragment>
            {
                paneComponents.map((val: IPaneComponent) =>
                    <View importantForAccessibility={isComponentDisplayed(val) ? 'auto' : 'no-hide-descendants'} key={val.key}>
                        <View style={renderStyles(val.pane, val.extensionOptions)}>
                            <View style={generalStyles(paneType.ONE ? defaultConfig.onePane?.paneHeader! : defaultConfig.twoPane?.paneHeader!).header}>
                                <PaneHeaderContainer
                                    isGoBack={ val.pane === paneType.ONE ? paneOneComponents.length > 1 : paneTwoComponents.length > 1}
                                    screenHeader={val.header}
                                    goBack={() => (val.pane === paneType.ONE ? onePane.GoBack() : twoPane.GoBack())}
                                    configDefaultHeader={val.pane === paneType.ONE ? defaultConfig.onePane?.paneHeader! : defaultConfig.twoPane?.paneHeader!}
                                    configDefaultHeaderText={val.pane === paneType.ONE ? defaultConfig.onePane?.paneHeaderText! : defaultConfig.twoPane?.paneHeaderText!}
                                    configDefaultHeaderIcon={val.pane === paneType.ONE ? defaultConfig.onePane?.paneHeaderIcon! : defaultConfig.twoPane?.paneHeaderIcon!}
                                />
                            </View>
                            <View
                                style={generalStyles(paneType.ONE ? defaultConfig.onePane?.paneHeader! : defaultConfig.twoPane?.paneHeader!).body}>
                                {val.paneElement}
                            </View>
                        </View>
                    </View>
                )
            }
        </Fragment >
    )
}

const generalStyles = (headerConfigStyle: Style) =>
  StyleSheet.create({
    header: {
      position: 'absolute',
      top: 0,
      width: '100%'
    },
    body: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: StyleSheet.flatten(headerConfigStyle).height ?? 56
    }
  });

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
    },
    paneOneExtended: {
        left: 0,
        height: 0,
        width: 0,
        top: 0
    }
});

export default PaneRenderer;