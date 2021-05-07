import React, { ReactElement } from 'react';
import { IHeader } from '../shared/screenStore/headerStore/header.interface';
import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface IPaneComponent extends IBasePaneComponent {
  pane: paneType;
}

export type Style = StyleProp<ViewStyle>;
export type StyleText = StyleProp<TextStyle>;
export type StyleImage = StyleProp<ImageStyle>;

export interface IConfig {
  paneBody? : Style;
  paneHeader? : Style;
  paneHeaderText?: StyleText;
  paneHeaderIcon?: StyleImage;
}

export interface IConfigComponent {
  onePane?: IConfig;
  twoPane?: IConfig;
}

export interface IBasePaneComponent {
  key: string;
  paneElement: ReactElement;
  header?: IHeader;
  extensionOptions?: IExtensionOptions
}

export interface IExtensionOptions {
  isExtendedLandscape: boolean;
  isExtendedPortrait: boolean;
}

export interface IEmptyAction {
  type: string;
  payload: {
  };
}

export enum paneType {
  ONE = 'ONE',
  TWO = 'TWO',
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
   * override default values for your application
   */
  config?: IConfigComponent

  /**
   * AppContainer if using React Navigation
   */
  navigationContainer?: JSX.Element;
}



