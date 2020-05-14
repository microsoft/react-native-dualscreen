import React, {Fragment, Component} from 'react';
import {
  View,
  Dimensions,
} from 'react-native';
import { DualScreenInfo, DualScreenInfoPayload, WindowRect, DeviceRotation } from 'react-native-dualscreeninfo'
import {Orientation, PanePriority, PaneMode} from "./types"

type State = {
  windowRects: WindowRect[],
  spanning: boolean, 
  rotation: DeviceRotation,
}

export interface TwoPaneViewProps {
  panePriority: PanePriority,
  paneMode: PaneMode,
}

export class TwoPaneView extends Component<TwoPaneViewProps, State> {
  state: State = {
    windowRects: DualScreenInfo.windowRects,
    spanning: DualScreenInfo.isSpanning, 
    rotation: DualScreenInfo.rotation,
  };

  getPanePriority() {
    return this.props.panePriority || PanePriority.Pane1;
  }

  getPaneMode() {
    return this.props.paneMode || PaneMode.Auto;    
  }

  componentDidMount() {
    DualScreenInfo.addEventListener('didUpdateSpanning', this._handleSpanningChanged);
  }

  componentWillUnmount() {
    DualScreenInfo.removeEventListener('didUpdateSpanning', this._handleSpanningChanged);
  }

  _handleSpanningChanged = (update: DualScreenInfoPayload) => {
    this.setState({
      spanning: update.isSpanning,
      windowRects: update.windowRects,
      rotation: update.rotation       
    });
  };

  render() {    
    return (
      <View style={{flexDirection: this.isHorizontalOrientation() ? 'row' : 'column'}}>
        {this.renderChildPanes()}
      </View>
    );
  }

  renderChildPanes() {
    const children = React.Children.toArray(this.props.children);

    const paneMode = this.getPaneMode();
    if (paneMode === PaneMode.Auto) {
      // TODO:  add logic for auto-detecting width > threshold
      if (this.state.spanning) {
        return this.renderBothPanes();
      }
      return this.renderPaneWithPriority();
    }
    if (paneMode === PaneMode.Single) {
      return this.renderPaneWithPriority();
    }
    if (paneMode === PaneMode.Double) {
      return this.renderBothPanes();
    }
  }

  renderPaneWithPriority() {
    if (this.getPanePriority() === PanePriority.Pane1) {
      return this.renderPane1();
    }
    else {
      return this.renderPane2();
    }
  }
  
  renderBothPanes() {
    const children = React.Children.toArray(this.props.children);

    const items = [];
    items.push(this.renderPane1());
    items.push(this.renderSeparator());
    items.push(this.renderPane2());

    return items;
  }

  renderPane1() {
    const children = React.Children.toArray(this.props.children);
    return (
      <View key={PanePriority.Pane1} style={{flex: 1}}>
        {children.length > 0 ? children[0] : null}
      </View>
    );
  }

  renderPane2() {
    const children = React.Children.toArray(this.props.children);
    return (
      <View key={PanePriority.Pane2} style={{flex: 1}}>
        {children.length > 1 ? children[1] : null}
      </View>
    );
  }

  renderSeparator() {
    // TODO - render Hinge
    let horizontal = this.isHorizontalOrientation();
    let separatorWidth = horizontal ? DualScreenInfo.hingeWidth: '100%';
    let separatorHeight = '100%';
    return (
      <View
        key="separator"
        style={{width: separatorWidth, height: separatorHeight}}
      />
    );
  }

  isHorizontalOrientation() {
    return (this.state.rotation === 'rotation0' || this.state.rotation === 'rotation180');
  }
}