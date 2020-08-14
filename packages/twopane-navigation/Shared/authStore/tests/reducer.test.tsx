import authReducer from '../auth.reducer';
import { IAuthState } from '../auth.interfaces';
import { SIGNED_IN, LOADING, SIGNED_OUT } from '../auth.types';

const initialState: IAuthState = {
  isLoading: false,
  isSignedOut: true
};

describe('auth reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return initial state', () => {
    // Act
    const reducer = authReducer(undefined, { type: '' });

    // Assert
    expect(reducer).toEqual(initialState);
  });
  it('SIGNED_IN', () => {
    // Arrange
    const signedIn = { type: SIGNED_IN };

    const finalState: IAuthState = {
      isSignedOut: false,
      isLoading: false
    };

    // Act
    const reducer = authReducer(initialState, signedIn);

    // Assert
    expect(reducer).toEqual(finalState);
  });
  it('LOADING', () => {
    // Arrange
    const loading = { type: LOADING };

    const finalState: IAuthState = {
      isSignedOut: true,
      isLoading: true
    };

    // Act
    const reducer = authReducer(initialState, loading);

    // Assert
    expect(reducer).toEqual(finalState);
  });
  it('SIGNED_OUT', () => {
    // Arrange
    const signOut = { type: SIGNED_OUT };

    const finalState: IAuthState = {
      ...initialState,
      isLoading: false
    };

    // Act
    const reducer = authReducer(initialState, signOut);

    // Assert
    expect(reducer).toEqual(finalState);
  });
});
