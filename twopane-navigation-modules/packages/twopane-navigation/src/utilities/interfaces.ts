import React, { ReactElement } from 'react';
import { IHeader } from '../shared/screenStore/headerStore/header.interface';

export interface IPaneComponent {
  key: string;
  paneElement: ReactElement;
  header?: IHeader;
  screen?: paneType;
}

export interface IPaneState {
  screen: Array<IPaneComponent>;
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
  onePaneDefault: IPaneComponent;

  /**
   * Default element for TWO screen mode
   */
  twoPaneDefault: IPaneComponent;

  /**
   * AppContainer if using React Navigation
   */
  navigationContainer?: JSX.Element;

  /**
   * Items to render in app drawer. If empty, drawer will not be included.
   */
  drawerItems?: JSX.Element[];
}

export interface IPaneHeaderProps extends IHeader {
}


