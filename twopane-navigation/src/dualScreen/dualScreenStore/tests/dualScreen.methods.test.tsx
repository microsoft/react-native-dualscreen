import React from 'react'
import dualScreen from '../dualScreen.methods';
import * as keyActions from '../../../Shared/screenStore/keyStore/key.actions';
import * as headerActions from '../../../Shared/screenStore/headerStore/header.actions';
import * as twoPaneElementActions from '../../../Shared/screenStore/twoPaneElementStore/twoPaneElement.action';

import { Fragment } from 'react';
import { IKeyAction, IKeyState } from '../../../Shared/screenStore/keyStore/key.interface';
import { screenType } from '../../../utilities/interfaces';
import { PUSH_KEY } from '../../../Shared/screenStore/keyStore/key.types';
import { IHeaderAction } from '../../../Shared/screenStore/headerStore/header.interface';
import { PUSH_HEADER } from '../../../Shared/screenStore/headerStore/header.types';
import { ITwoPaneElementAction } from '../../../Shared/screenStore/twoPaneElementStore/twoPaneElement.interface';
import { PUSH_TWOPANE_ELEMENT } from '../../../Shared/screenStore/twoPaneElementStore/twoPaneElement.types';
import { twoPaneElementActionBuilder } from '../../../Shared/screenStore/twoPaneElementStore/tests/twoPaneElement.methods.helpers';
import { headerActionBuilder } from '../../../Shared/screenStore/headerStore/tests/header.methods.helpers';
import { KeyActionBuilder, mockKeyState } from '../../../Shared/screenStore/keyStore/tests/key.methods.helpers';
import { store } from '../../../appStore';

describe('dualScreen methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dualScreen Add with header with merge', () => {
    // Arrange
    const expectedKey: IKeyAction = KeyActionBuilder(PUSH_KEY, screenType.DUAL, 'test1', true);

    const expectedHeader: IHeaderAction = headerActionBuilder(PUSH_HEADER, `${screenType.DUAL}_test1`, { title: 'test title' });

    const expectedtwoPaneElement: ITwoPaneElementAction = twoPaneElementActionBuilder(PUSH_TWOPANE_ELEMENT, `${screenType.DUAL}_test1`, <Fragment />);

    const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
    const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
    const pushtwoPaneElementsSpy = jest.spyOn(twoPaneElementActions, 'pushElement');

    // Act
    const _dualScreenAdd = dualScreen.Add('test1', <Fragment />, { title: 'test title' }, true);

    // Assert
    expect(pushKeySpy).toBeCalled();
    expect(pushheaderSpy).toBeCalled();
    expect(pushtwoPaneElementsSpy).toBeCalled();
    expect(pushKeySpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedKey)
    expect(pushheaderSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedHeader)
    expect(pushtwoPaneElementsSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedtwoPaneElement)
  });

  it('dualScreen Add with header with no merge', () => {
    // Arrange
    const expectedKey: IKeyAction = KeyActionBuilder(PUSH_KEY, screenType.DUAL, 'test2', false);

    const expectedHeader: IHeaderAction = headerActionBuilder(PUSH_HEADER, `${screenType.DUAL}_test2`, { title: 'test title' });

    const expectedtwoPaneElement: ITwoPaneElementAction = twoPaneElementActionBuilder(PUSH_TWOPANE_ELEMENT, `${screenType.DUAL}_test2`, <Fragment />);

    const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
    const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
    const pushtwoPaneElementsSpy = jest.spyOn(twoPaneElementActions, 'pushElement');

    // Act
    const _dualScreenAdd = dualScreen.Add('test2', <Fragment />, { title: 'test title' });

    // Assert
    expect(pushKeySpy).toBeCalled();
    expect(pushheaderSpy).toBeCalled();
    expect(pushtwoPaneElementsSpy).toBeCalled();
    expect(pushKeySpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedKey)
    expect(pushheaderSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedHeader)
    expect(pushtwoPaneElementsSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedtwoPaneElement)
  });

  it('dualScreen Add no header with merge', () => {
    // Arrange
    const expectedKey: IKeyAction = KeyActionBuilder(PUSH_KEY, screenType.DUAL, 'test3', true);

    const expectedtwoPaneElement: ITwoPaneElementAction = twoPaneElementActionBuilder(PUSH_TWOPANE_ELEMENT, `${screenType.DUAL}_test3`, <Fragment />);

    const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
    const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');

    const pushtwoPaneElementsSpy = jest.spyOn(twoPaneElementActions, 'pushElement');

    // Act
    const _dualScreenAdd = dualScreen.Add('test3', <Fragment />, undefined, true);

    // Assert
    expect(pushKeySpy).toBeCalled();
    expect(pushheaderSpy).not.toBeCalled();
    expect(pushtwoPaneElementsSpy).toBeCalled();
    expect(pushKeySpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedKey)
    expect(pushtwoPaneElementsSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedtwoPaneElement)
  });

  it('dualScreen Add with no header with no merge', () => {
    // Arrange
    const expectedKey: IKeyAction = KeyActionBuilder(PUSH_KEY, screenType.DUAL, 'test4', false);

    const expectedtwoPaneElement: ITwoPaneElementAction = twoPaneElementActionBuilder(PUSH_TWOPANE_ELEMENT, `${screenType.DUAL}_test4`, <Fragment />);

    const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
    const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
    const pushtwoPaneElementsSpy = jest.spyOn(twoPaneElementActions, 'pushElement');

    // Act
    const _dualScreenAdd = dualScreen.Add('test4', <Fragment />);

    // Assert
    expect(pushKeySpy).toBeCalled();
    expect(pushtwoPaneElementsSpy).toBeCalled();
    expect(pushheaderSpy).not.toBeCalled();

    expect(pushKeySpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedKey)
    expect(pushtwoPaneElementsSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedtwoPaneElement)
  });


  it('dualScreen AddOrMoveToFront add called', () => {
    // Arrange

    const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
    const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
    const pushtwoPaneElementsSpy = jest.spyOn(twoPaneElementActions, 'pushElement');
    const moveToFrontSpy = jest.spyOn(keyActions, 'moveToFront');

    // Act
    const _dualScreenAdd = dualScreen.AddOrMoveToFront('test5', <Fragment />, { title: 'test title' }, true);

    // Assert
    expect(pushKeySpy).toBeCalled();
    expect(pushheaderSpy).toBeCalled();
    expect(pushtwoPaneElementsSpy).toBeCalled();
    expect(moveToFrontSpy).not.toBeCalled();
  });



  it('dualScreen AddOrMoveToFront moveToFront called', () => {
    // Arrange
    const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
    const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
    const pushtwoPaneElementsSpy = jest.spyOn(twoPaneElementActions, 'pushElement');
    const moveToFrontSpy = jest.spyOn(keyActions, 'moveToFront');

    // Act
    const _dualScreenAdd = dualScreen.AddOrMoveToFront('test1', <Fragment />, { title: 'test title' }, true);

    // Assert
    expect(pushKeySpy).not.toBeCalled();
    expect(pushheaderSpy).not.toBeCalled();
    expect(pushtwoPaneElementsSpy).not.toBeCalled();
    expect(moveToFrontSpy).toBeCalled();
  });


  it('dualScreen mergeToOppositeScreen called', () => {
    // Arrange
    const moveToFrontSpy = jest.spyOn(keyActions, 'changeScreen');

    // Act
    const _dualScreenAdd = dualScreen.mergeToOppositeScreen();
    const keyStore = store.getState().KeyReducers;

    // Assert
    expect(moveToFrontSpy).toBeCalled();
    expect(moveToFrontSpy).toBeCalledTimes(3);
    expect(keyStore.keys.filter(val => val.screen === screenType.SINGLE).length).toEqual(3)
    expect(keyStore.keys.filter(val => val.screen === screenType.DUAL).length).toEqual(2)
  });


  it('dualScreenBackToHome calls BackToHome', () => {
    // Arrange
    const keyState = mockKeyState(screenType.DUAL, false);
    keyState.keys.map(val => store.dispatch(keyActions.pushKey(val.screen, val.key, val.isMerge)))

    const popToFrontSpy = jest.spyOn(keyActions, 'popToFront')
    const removeHeaderKeyBySpy = jest.spyOn(headerActions, 'removeHeaderByKey');
    const remodetwoPaneElementBySpy = jest.spyOn(twoPaneElementActions, 'removetwoPaneElementByKey');


    // Act
    const _dualScreenBackToHome = dualScreen.BackToHome();

    // Assert
    expect(popToFrontSpy).toBeCalled();
    expect(popToFrontSpy).toBeCalledTimes(1);

    expect(removeHeaderKeyBySpy).toBeCalled();
    expect(removeHeaderKeyBySpy).toBeCalledTimes(4);

    expect(remodetwoPaneElementBySpy).toBeCalled();
    expect(remodetwoPaneElementBySpy).toBeCalledTimes(4);
  });

  it('dualScreenGoBack calls GoBack', () => {
    // Arrange
    const keyState = mockKeyState(screenType.DUAL, false, `${screenType.DUAL}_`);
    keyState.keys.map(val => store.dispatch(keyActions.pushKey(val.screen, val.key, val.isMerge)))
    const expectedState: IKeyState =
    {
      keys:
        [{ key: 'DUAL_test3', isMerge: true, screen: screenType.SINGLE },
        { key: 'DUAL_test5', isMerge: true, screen: screenType.SINGLE },
        { key: 'DUAL_test1', isMerge: true, screen: screenType.SINGLE },
        { key: 'DUAL_test2', isMerge: false, screen: screenType.DUAL },
        { key: 'DUAL_DUAL_first', isMerge: false, screen: screenType.DUAL },
        { key: 'DUAL_DUAL_second', isMerge: false, screen: screenType.DUAL }]
    }

    const popScreenSpy = jest.spyOn(keyActions, 'popScreen')
    const removeHeaderKeyBySpy = jest.spyOn(headerActions, 'removeHeaderByKey');
    const removetwoPaneElementBySpy = jest.spyOn(twoPaneElementActions, 'removetwoPaneElementByKey');


    // Act
    const _dualScreenBack = dualScreen.GoBack();
    const finalState: IKeyState = store.getState().KeyReducers;
    // Assert
    expect(finalState).toStrictEqual(expectedState)

    expect(popScreenSpy).toBeCalled();
    expect(popScreenSpy).toBeCalledTimes(1);

    expect(removeHeaderKeyBySpy).toBeCalled();
    expect(removeHeaderKeyBySpy).toBeCalledTimes(1);

    expect(removetwoPaneElementBySpy).toBeCalled();
    expect(removetwoPaneElementBySpy).toBeCalledTimes(1);
  });

  it('replaceScreen calls', () => {
    // Arrange
    const replacetwoPaneElementSpy = jest.spyOn(twoPaneElementActions, 'replacetwoPaneElement');

    // Act
    const _dualScreenBack = dualScreen.ReplaceScreen('test', <Fragment />);

    // Assert
    expect(replacetwoPaneElementSpy).toBeCalled();
    expect(replacetwoPaneElementSpy).toBeCalledTimes(1);
  });

  it('ReplaceHeader calls', () => {
    // Arrange
    const replaceHeaderSpy = jest.spyOn(headerActions, 'replaceHeader');

    // Act
    const _dualScreenBack = dualScreen.ReplaceHeader('test', { title: 'test' });

    // Assert
    expect(replaceHeaderSpy).toBeCalled();
    expect(replaceHeaderSpy).toBeCalledTimes(1);
  });

});
