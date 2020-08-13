export interface IDrawerState {
  drawerItems: JSX.Element[];
}

export interface IDrawerAction {
  type: string;
  payload: {
    elements: JSX.Element[];
  };
}
