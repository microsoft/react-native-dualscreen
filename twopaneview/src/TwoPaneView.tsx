import React, {Fragment, Component} from 'react';
import {
  View,
  Dimensions,
} from 'react-native';
import { DualScreenInfo, DualScreenInfoPayload, WindowRect } from 'react-native-dualscreeninfo'
import {Orientation, PanePriority, PaneMode} from "./types"

type Props = {
} & Partial<DefaultProps>;

type DefaultProps = Readonly<typeof defaultProps>;

const defaultProps = { panePriority: PanePriority.Pane1, 
  paneMode: PaneMode.Auto
}

type State = {
  windowRects: WindowRect[],
  spanning: boolean, 
  panePriority?: string,
  paneMode?: string,
  rotation: number,
};

export class TwoPaneView extends Component<Props, State> {
  state: State = {
    windowRects: DualScreenInfo.windowRects,
    spanning: DualScreenInfo.isSpanning, 
    panePriority: PanePriority.Pane1, // TODO:  how to get this.props as initial value?
    paneMode: PaneMode.Auto,
    rotation: DualScreenInfo.rotation,
  };

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

    if (this.state.paneMode === PaneMode.Auto) {
      // TODO:  add logic for auto-detecting width > threshold
      if (this.state.spanning) {
        return this.renderBothPanes();
      }
      this.renderPaneWithPriority();
    }
    if (this.state.paneMode === PaneMode.Single) {
      this.renderPaneWithPriority();
    }
    if (this.state.paneMode === PaneMode.Double) {
      return this.renderBothPanes();
    }
  }

  renderPaneWithPriority() {
    if (this.state.panePriority === PanePriority.Pane1) {
      return this.renderPane1();
    }
    else {
      return this.renderPane2();
    }
  }
  
  renderBothPanes() {
    const children = React.Children.toArray(this.props.children);

    const items = [];
    if (children.length > 0) {
      items.push(this.renderPane1());
    }

    items.push(this.renderSeparator());

    if (children.length > 1) {
      items.push(this.renderPane2());
    }

    return items;
  }

  renderPane1() {
    const children = React.Children.toArray(this.props.children);
    if (children.length > 0) {
      return (
        <View key={PanePriority.Pane1} style={{flex: 1}}>
          {children[0]}
        </View>
      );
    }
  }

  renderPane2() {
    const children = React.Children.toArray(this.props.children);
    if (children.length > 1) {
      return (
        <View key={PanePriority.Pane2} style={{flex: 1}}>
          {children[1]}
        </View>
      );
    }
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
    return (this.state.rotation === 0 || this.state.rotation === 2);
  }
}
  