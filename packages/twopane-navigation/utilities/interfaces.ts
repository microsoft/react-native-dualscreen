import React, { ReactElement } from 'react';
import { IHeader } from '../Shared/screenStore/headerStore/header.interface';

export interface IScreenComponent {
  key: string;
  duexElement: ReactElement;
  header?: IHeader;
  screen?: screenType;
}

export interface IScreenState {
  screen: Array<IScreenComponent>;
}


export interface IEmptyAction {
  type: string;
  payload: {
  };
}

export enum screenType {
  SINGLE = 'SINGLE',
  DUAL = 'DUAL'
}
