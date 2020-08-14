import * as actionsMethods from '../auth.actions';
import * as types from '../auth.types';
import { IAuthAction } from '../auth.interfaces';

describe('auth actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('loading', () => {
    it('should create action to show loading screen', () => {
      // Arrange
      const expectedAction: IAuthAction = {
        type: types.LOADING
      };

      // Act
      const callAction = actionsMethods.loading();

      // Assert
      expect(callAction).toEqual(expectedAction);
    });
  });
  describe('signedIn', () => {
    it('should create action to set user as signed in', () => {
      // Arrange
      const expectedAction: IAuthAction = {
        type: types.SIGNED_IN
      };

      // Act
      const callAction = actionsMethods.signedIn();

      // Assert
      expect(callAction).toEqual(expectedAction);
    });
  });
  describe('signedOut', () => {
    it('should create action to set user as signed out', () => {
      // Arrange
      const expectedAction: IAuthAction = {
        type: types.SIGNED_OUT
      };

      // Act
      const callAction = actionsMethods.signedOut();

      // Assert
      expect(callAction).toEqual(expectedAction);
    });
  });
});
