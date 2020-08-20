import React, { ReactElement } from 'react';
import { IHeader } from '../shared/screenStore/headerStore/header.interface';
import { StyleProp, ViewStyle, ColorValue, ScaledSize } from 'react-native';

export interface IPaneComponent extends IBasePaneComponent {
  pane?: paneType;
}

export type Style = StyleProp<ViewStyle>;

export interface IConfig {
  paneBody? : Style;
  paneHeader? : Style;
}

//TODO ADD DEFAULT HEADER HEIGHT SIZE & BODY HEIGHT
export interface IConfigComponent {
  onePane?: IConfig;
  twoPane?: IConfig;
}

export interface IBasePaneComponent {
  key: string;
  paneElement: ReactElement;
  header?: IHeader;
}

export interface IEmptyAction {
  type: string;
  payload: {
  };
}

export enum paneType {
  ONE = 'ONE',
  TWO = 'TWO'
}

export interface ITwoPaneAppProps {
  /**
   * Default element for ONE screen mode
   */
  onePaneDefault: IBasePaneComponent;

  /**
   * Default element for TWO screen mode
   */
  twoPaneDefault: IBasePaneComponent;

  /**
   * override default values of pane components
   */
  config?: IConfigComponent

  /**
   * AppContainer if using React Navigation
   */
  navigationContainer?: JSX.Element;
}

export interface IPaneHeaderProps extends IHeader {
}


