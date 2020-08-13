export interface IAuthAction {
  type: string;
}

export interface IAuthState {
  isSignedOut: boolean;
  isLoading: boolean;
}
