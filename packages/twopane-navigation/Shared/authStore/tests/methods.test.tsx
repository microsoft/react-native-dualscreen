import * as actions from '../auth.actions';
import { signIn, signOut, startLoading } from '../auth.methods';

describe('auth methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('signIn calls signedIn', () => {
    const signedInSpy = jest.spyOn(actions, 'signedIn');
    const _signIn = signIn();

    expect(signedInSpy).toBeCalledTimes(1);
  });
  it('startLoading calls loading', () => {
    const loadingSpy = jest.spyOn(actions, 'loading');
    const _startLoading = startLoading();

    expect(loadingSpy).toBeCalledTimes(1);
  });
  it('signOut calls signedOut', () => {
    const signedOutSpy = jest.spyOn(actions, 'signedOut');
    const _signOut = signOut();

    expect(signedOutSpy).toBeCalledTimes(1);
  });
});
