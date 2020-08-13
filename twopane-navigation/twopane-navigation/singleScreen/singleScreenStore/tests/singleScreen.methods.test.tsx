import React from 'react'
import singleScreen from '../singleScreen.methods';
import * as keyActions from '../../../Shared/screenStore/keyStore/key.actions';
import * as headerActions from '../../../Shared/screenStore/headerStore/header.actions';
import * as duexElementActions from '../../../Shared/screenStore/duexElementStore/duexElement.action';

import { Fragment } from 'react';
import { IKeyAction, IKeyState } from '../../../Shared/screenStore/keyStore/key.interface';
import { screenType } from '../../../utilities/interfaces';
import { PUSH_KEY } from '../../../Shared/screenStore/keyStore/key.types';
import { IHeaderAction } from '../../../Shared/screenStore/headerStore/header.interface';
import { PUSH_HEADER } from '../../../Shared/screenStore/headerStore/header.types';
import { IDuexElementAction } from '../../../Shared/screenStore/duexElementStore/duexElement.interface';
import { PUSH_DUEXELEMENT } from '../../../Shared/screenStore/duexElementStore/duexElement.types';
import { duexElementActionBuilder } from '../../../Shared/screenStore/duexElementStore/tests/duexElement.methods.helpers';
import { headerActionBuilder } from '../../../Shared/screenStore/headerStore/tests/header.methods.helpers';
import { KeyActionBuilder, mockKeyState } from '../../../Shared/screenStore/keyStore/tests/key.methods.helpers';
import { store } from '../../../appStore';
describe('singleScreen methods', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('singleScreen Add with header with merge', () => {
        // Arrange
        const expectedKey: IKeyAction = KeyActionBuilder(PUSH_KEY, screenType.SINGLE, 'test1', true);

        const expectedHeader: IHeaderAction = headerActionBuilder(PUSH_HEADER, `${screenType.SINGLE}_test1`, { title: 'test title' });

        const expectedDuexElement: IDuexElementAction = duexElementActionBuilder(PUSH_DUEXELEMENT, `${screenType.SINGLE}_test1`, <Fragment />);

        const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
        const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
        const pushduexElementsSpy = jest.spyOn(duexElementActions, 'pushElement');

        // Act
        const _singleScreenAdd = singleScreen.Add('test1', <Fragment />, { title: 'test title' }, true);

        // Assert
        expect(pushKeySpy).toBeCalled();
        expect(pushheaderSpy).toBeCalled();
        expect(pushduexElementsSpy).toBeCalled();
        expect(pushKeySpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedKey)
        expect(pushheaderSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedHeader)
        expect(pushduexElementsSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedDuexElement)
    });

    it('singleScreen Add with header with no merge', () => {
        // Arrange
        const expectedKey: IKeyAction = KeyActionBuilder(PUSH_KEY, screenType.SINGLE, 'test2', false);

        const expectedHeader: IHeaderAction = headerActionBuilder(PUSH_HEADER, `${screenType.SINGLE}_test2`, { title: 'test title' });

        const expectedDuexElement: IDuexElementAction = duexElementActionBuilder(PUSH_DUEXELEMENT, `${screenType.SINGLE}_test2`, <Fragment />);

        const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
        const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
        const pushduexElementsSpy = jest.spyOn(duexElementActions, 'pushElement');

        // Act
        const _singleScreenAdd = singleScreen.Add('test2', <Fragment />, { title: 'test title' });

        // Assert
        expect(pushKeySpy).toBeCalled();
        expect(pushheaderSpy).toBeCalled();
        expect(pushduexElementsSpy).toBeCalled();
        expect(pushKeySpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedKey)
        expect(pushheaderSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedHeader)
        expect(pushduexElementsSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedDuexElement)
    });

    it('singleScreen Add no header with merge', () => {
        // Arrange
        const expectedKey: IKeyAction = KeyActionBuilder(PUSH_KEY, screenType.SINGLE, 'test3', true);

        const expectedDuexElement: IDuexElementAction = duexElementActionBuilder(PUSH_DUEXELEMENT, `${screenType.SINGLE}_test3`, <Fragment />);

        const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
        const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');

        const pushduexElementsSpy = jest.spyOn(duexElementActions, 'pushElement');

        // Act
        const _singleScreenAdd = singleScreen.Add('test3', <Fragment />, undefined, true);

        // Assert
        expect(pushKeySpy).toBeCalled();
        expect(pushheaderSpy).not.toBeCalled();
        expect(pushduexElementsSpy).toBeCalled();
        expect(pushKeySpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedKey)
        expect(pushduexElementsSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedDuexElement)
    });

    it('singleScreen Add with no header with no merge', () => {
        // Arrange
        const expectedKey: IKeyAction = KeyActionBuilder(PUSH_KEY, screenType.SINGLE, 'test4', false);

        const expectedDuexElement: IDuexElementAction = duexElementActionBuilder(PUSH_DUEXELEMENT, `${screenType.SINGLE}_test4`, <Fragment />);

        const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
        const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
        const pushduexElementsSpy = jest.spyOn(duexElementActions, 'pushElement');

        // Act
        const _singleScreenAdd = singleScreen.Add('test4', <Fragment />);

        // Assert
        expect(pushKeySpy).toBeCalled();
        expect(pushduexElementsSpy).toBeCalled();
        expect(pushheaderSpy).not.toBeCalled();

        expect(pushKeySpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedKey)
        expect(pushduexElementsSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedDuexElement)
    });


    it('singleScreen AddOrMoveToFront add called', () => {
        // Arrange

        const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
        const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
        const pushduexElementsSpy = jest.spyOn(duexElementActions, 'pushElement');
        const moveToFrontSpy = jest.spyOn(keyActions, 'moveToFront');

        // Act
        const _singleScreenAdd = singleScreen.AddOrMoveToFront('test5', <Fragment />, { title: 'test title' }, true);

        // Assert
        expect(pushKeySpy).toBeCalled();
        expect(pushheaderSpy).toBeCalled();
        expect(pushduexElementsSpy).toBeCalled();
        expect(moveToFrontSpy).not.toBeCalled();
    });



    it('singleScreen AddOrMoveToFront moveToFront called', () => {
        // Arrange
        const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
        const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
        const pushduexElementsSpy = jest.spyOn(duexElementActions, 'pushElement');
        const moveToFrontSpy = jest.spyOn(keyActions, 'moveToFront');

        // Act
        const _singleScreenAdd = singleScreen.AddOrMoveToFront('test1', <Fragment />, { title: 'test title' }, true);

        // Assert
        expect(pushKeySpy).not.toBeCalled();
        expect(pushheaderSpy).not.toBeCalled();
        expect(pushduexElementsSpy).not.toBeCalled();
        expect(moveToFrontSpy).toBeCalled();
    });


    it('singleScreen mergeToOppositeScreen called', () => {
        // Arrange
        const moveToFrontSpy = jest.spyOn(keyActions, 'changeScreen');

        // Act
        const _singleScreenAdd = singleScreen.mergeToOppositeScreen();
        const keyStore = store.getState().KeyReducers;

        // Assert
        expect(moveToFrontSpy).toBeCalled();
        expect(moveToFrontSpy).toBeCalledTimes(3);
        expect(keyStore.keys.filter(val => val.screen === screenType.DUAL).length).toEqual(3)
        expect(keyStore.keys.filter(val => val.screen === screenType.SINGLE).length).toEqual(2)
    });


    it('singleScreenBackToHome calls BackToHome', () => {
        // Arrange
        const keyState = mockKeyState(screenType.SINGLE, false);
        keyState.keys.map(val => store.dispatch(keyActions.pushKey(val.screen, val.key, val.isMerge)))

        const popToFrontSpy = jest.spyOn(keyActions, 'popToFront')
        const removeHeaderKeyBySpy = jest.spyOn(headerActions, 'removeHeaderByKey');
        const remodeDuexElementBySpy = jest.spyOn(duexElementActions, 'removeDuexElementByKey');


        // Act
        const _singleScreenBackToHome = singleScreen.BackToHome();

        // Assert
        expect(popToFrontSpy).toBeCalled();
        expect(popToFrontSpy).toBeCalledTimes(1);

        expect(removeHeaderKeyBySpy).toBeCalled();
        expect(removeHeaderKeyBySpy).toBeCalledTimes(4);

        expect(remodeDuexElementBySpy).toBeCalled();
        expect(remodeDuexElementBySpy).toBeCalledTimes(4);
    });

    it('singleScreenGoBack calls GoBack', () => {
        // Arrange
        const keyState = mockKeyState(screenType.SINGLE, false, `${screenType.SINGLE}_`);
        keyState.keys.map(val => store.dispatch(keyActions.pushKey(val.screen, val.key, val.isMerge)))
        const expectedState: IKeyState =
        {
            keys:
                [{ key: 'SINGLE_test2', isMerge: false, screen: screenType.SINGLE },
                { key: 'SINGLE_SINGLE_first', isMerge: false, screen: screenType.SINGLE },
                { key: 'SINGLE_SINGLE_second', isMerge: false, screen: screenType.SINGLE },
                { key: 'SINGLE_test3', isMerge: true, screen: screenType.DUAL },
                { key: 'SINGLE_test5', isMerge: true, screen: screenType.DUAL },
                { key: 'SINGLE_test1', isMerge: true, screen: screenType.DUAL }]
        }

        const popScreenSpy = jest.spyOn(keyActions, 'popScreen')
        const removeHeaderKeyBySpy = jest.spyOn(headerActions, 'removeHeaderByKey');
        const removeDuexElementBySpy = jest.spyOn(duexElementActions, 'removeDuexElementByKey');


        // Act
        const _singleScreenBack = singleScreen.GoBack();
        const finalState: IKeyState = store.getState().KeyReducers;

        // Assert
        expect(finalState).toStrictEqual(expectedState)

        expect(popScreenSpy).toBeCalled();
        expect(popScreenSpy).toBeCalledTimes(1);

        expect(removeHeaderKeyBySpy).toBeCalled();
        expect(removeHeaderKeyBySpy).toBeCalledTimes(1);

        expect(removeDuexElementBySpy).toBeCalled();
        expect(removeDuexElementBySpy).toBeCalledTimes(1);
    });

    it('replaceScreen calls', () => {
        // Arrange
        const replaceDuexElementSpy = jest.spyOn(duexElementActions, 'replaceDuexElement');

        // Act
        const _singleScreenBack = singleScreen.ReplaceScreen('test', <Fragment />);

        // Assert
        expect(replaceDuexElementSpy).toBeCalled();
        expect(replaceDuexElementSpy).toBeCalledTimes(1);
    });

    it('ReplaceHeader calls', () => {
        // Arrange
        const replaceHeaderSpy = jest.spyOn(headerActions, 'replaceHeader');

        // Act
        const _singleScreenBack = singleScreen.ReplaceHeader('test', { title: 'test' });

        // Assert
        expect(replaceHeaderSpy).toBeCalled();
        expect(replaceHeaderSpy).toBeCalledTimes(1);
    });

});
