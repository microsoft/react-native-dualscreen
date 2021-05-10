import React from 'react'
import onePane from '../onePane.methods';
import * as keyActions from '../../../shared/screenStore/keyStore/key.actions';
import * as headerActions from '../../../shared/screenStore/headerStore/header.actions';
import * as paneElementActions from '../../../shared/screenStore/paneElementStore/paneElement.action';

import { Fragment } from 'react';
import { IKeyAction, IKeyState } from '../../../shared/screenStore/keyStore/key.interface';
import { paneType } from '../../../utilities/interfaces';
import { PUSH_KEY } from '../../../shared/screenStore/keyStore/key.types';
import { IHeaderAction } from '../../../shared/screenStore/headerStore/header.interface';
import { PUSH_HEADER } from '../../../shared/screenStore/headerStore/header.types';
import { IPaneElementAction, IPaneElementState } from '../../../shared/screenStore/paneElementStore/paneElement.interface';
import { PUSH_PANE_ELEMENT } from '../../../shared/screenStore/paneElementStore/paneElement.types';
import { paneElementActionBuilder } from '../../../shared/screenStore/paneElementStore/tests/paneElement.methods.helpers';
import { headerActionBuilder } from '../../../shared/screenStore/headerStore/tests/header.methods.helpers';
import { KeyActionBuilder, mockKeyState } from '../../../shared/screenStore/keyStore/tests/key.methods.helpers';
import { resetApp, store } from '../../../appStore';

describe('onePane methods', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('onePane Add with header with merge', () => {
        // Arrange
        const expectedKey: IKeyAction = KeyActionBuilder(PUSH_KEY, paneType.ONE, 'test1', true);

        const expectedHeader: IHeaderAction = headerActionBuilder(PUSH_HEADER, `${paneType.ONE}_test1`, { title: 'test title' });

        const expectedPaneElement: IPaneElementAction = paneElementActionBuilder(PUSH_PANE_ELEMENT, `${paneType.ONE}_test1`, <Fragment />);

        const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
        const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
        const pushPaneElementsSpy = jest.spyOn(paneElementActions, 'pushElement');

        // Act
        const _onePaneAdd = onePane.Add('test1', <Fragment />, { title: 'test title' }, true);

        // Assert
        expect(pushKeySpy).toBeCalled();
        expect(pushheaderSpy).toBeCalled();
        expect(pushPaneElementsSpy).toBeCalled();
        expect(pushKeySpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedKey)
        expect(pushheaderSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedHeader)
        expect(pushPaneElementsSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedPaneElement)
    });

    it('onePane Add with header with no merge', () => {
        // Arrange
        const expectedKey: IKeyAction = KeyActionBuilder(PUSH_KEY, paneType.ONE, 'test2', false);

        const expectedHeader: IHeaderAction = headerActionBuilder(PUSH_HEADER, `${paneType.ONE}_test2`, { title: 'test title' });

        const expectedPaneElement: IPaneElementAction = paneElementActionBuilder(PUSH_PANE_ELEMENT, `${paneType.ONE}_test2`, <Fragment />);

        const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
        const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
        const pushPaneElementsSpy = jest.spyOn(paneElementActions, 'pushElement');

        // Act
        const _onePaneAdd = onePane.Add('test2', <Fragment />, { title: 'test title' });

        // Assert
        expect(pushKeySpy).toBeCalled();
        expect(pushheaderSpy).toBeCalled();
        expect(pushPaneElementsSpy).toBeCalled();
        expect(pushKeySpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedKey)
        expect(pushheaderSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedHeader)
        expect(pushPaneElementsSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedPaneElement)
    });

    it('onePane Add no header with merge', () => {
        // Arrange
        const expectedKey: IKeyAction = KeyActionBuilder(PUSH_KEY, paneType.ONE, 'test3', true);

        const expectedPaneElement: IPaneElementAction = paneElementActionBuilder(PUSH_PANE_ELEMENT, `${paneType.ONE}_test3`, <Fragment />);

        const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
        const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');

        const pushPaneElementsSpy = jest.spyOn(paneElementActions, 'pushElement');

        // Act
        const _onePaneAdd = onePane.Add('test3', <Fragment />, undefined, true);

        // Assert
        expect(pushKeySpy).toBeCalled();
        expect(pushheaderSpy).not.toBeCalled();
        expect(pushPaneElementsSpy).toBeCalled();
        expect(pushKeySpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedKey)
        expect(pushPaneElementsSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedPaneElement)
    });

    it('onePane Add with no header with no merge', () => {
        // Arrange
        const expectedKey: IKeyAction = KeyActionBuilder(PUSH_KEY, paneType.ONE, 'test4', false);

        const expectedPaneElement: IPaneElementAction = paneElementActionBuilder(PUSH_PANE_ELEMENT, `${paneType.ONE}_test4`, <Fragment />);

        const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
        const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
        const pushPaneElementsSpy = jest.spyOn(paneElementActions, 'pushElement');

        // Act
        const _onePaneAdd = onePane.Add('test4', <Fragment />);

        // Assert
        expect(pushKeySpy).toBeCalled();
        expect(pushPaneElementsSpy).toBeCalled();
        expect(pushheaderSpy).not.toBeCalled();

        expect(pushKeySpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedKey)
        expect(pushPaneElementsSpy.mock.results.find(x => x.value)?.value).toStrictEqual(expectedPaneElement)
    });


    it('onePane AddOrMoveToFront add called', () => {
        // Arrange

        const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
        const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
        const pushPaneElementsSpy = jest.spyOn(paneElementActions, 'pushElement');
        const moveToFrontSpy = jest.spyOn(keyActions, 'moveToFront');

        // Act
        const _onePaneAdd = onePane.AddOrMoveToFront('test5', <Fragment />, { title: 'test title' }, true);

        // Assert
        expect(pushKeySpy).toBeCalled();
        expect(pushheaderSpy).toBeCalled();
        expect(pushPaneElementsSpy).toBeCalled();
        expect(moveToFrontSpy).not.toBeCalled();
    });



    it('onePane AddOrMoveToFront moveToFront called', () => {
        // Arrange
        const pushKeySpy = jest.spyOn(keyActions, 'pushKey');
        const pushheaderSpy = jest.spyOn(headerActions, 'pushHeader');
        const pushPaneElementsSpy = jest.spyOn(paneElementActions, 'pushElement');
        const moveToFrontSpy = jest.spyOn(keyActions, 'moveToFront');

        // Act
        const _onePaneAdd = onePane.AddOrMoveToFront('test1', <Fragment />, { title: 'test title' }, true);

        // Assert
        expect(pushKeySpy).not.toBeCalled();
        expect(pushheaderSpy).not.toBeCalled();
        expect(pushPaneElementsSpy).not.toBeCalled();
        expect(moveToFrontSpy).toBeCalled();
    });


    it('onePane mergeToOppositePane called', () => {
        // Arrange
        const moveToFrontSpy = jest.spyOn(keyActions, 'changeScreen');

        // Act
        const _onePaneAdd = onePane.mergeToOppositePane();
        const keyStore = store.getState().KeyReducers;

        // Assert
        expect(moveToFrontSpy).toBeCalled();
        expect(moveToFrontSpy).toBeCalledTimes(3);
        expect(keyStore.keys.filter(val => val.screen === paneType.TWO).length).toEqual(3)
        expect(keyStore.keys.filter(val => val.screen === paneType.ONE).length).toEqual(2)
    });


    it('onePaneBackToHome calls BackToHome', () => {
        // Arrange
        const keyState = mockKeyState(paneType.ONE, false);
        keyState.keys.map(val => store.dispatch(keyActions.pushKey(val.screen, val.key, val.isMerge)))

        const popToFrontSpy = jest.spyOn(keyActions, 'popToFront')
        const removeHeaderKeyBySpy = jest.spyOn(headerActions, 'removeHeaderByKey');
        const removePaneElementBySpy = jest.spyOn(paneElementActions, 'removePaneElementByKey');


        // Act
        const _onePaneBackToHome = onePane.BackToHome();

        // Assert
        expect(popToFrontSpy).toBeCalled();
        expect(popToFrontSpy).toBeCalledTimes(1);

        expect(removeHeaderKeyBySpy).toBeCalled();
        expect(removeHeaderKeyBySpy).toBeCalledTimes(4);

        expect(removePaneElementBySpy).toBeCalled();
        expect(removePaneElementBySpy).toBeCalledTimes(4);
    });

    it('onePaneGoBack calls GoBack', () => {
        // Arrange
        const keyState = mockKeyState(paneType.ONE, false, `${paneType.ONE}_`);
        keyState.keys.map(val => store.dispatch(keyActions.pushKey(val.screen, val.key, val.isMerge)))
        const expectedState: IKeyState =
        {
            keys:
                [{ key: 'ONE_test2', isMerge: false, screen: paneType.ONE },
                { key: 'ONE_ONE_first', isMerge: false, screen: paneType.ONE },
                { key: 'ONE_ONE_second', isMerge: false, screen: paneType.ONE },
                { key: 'ONE_test3', isMerge: true, screen: paneType.TWO },
                { key: 'ONE_test5', isMerge: true, screen: paneType.TWO },
                { key: 'ONE_test1', isMerge: true, screen: paneType.TWO }]
        }

        const popScreenSpy = jest.spyOn(keyActions, 'popScreen')
        const removeHeaderKeyBySpy = jest.spyOn(headerActions, 'removeHeaderByKey');
        const removePaneElementBySpy = jest.spyOn(paneElementActions, 'removePaneElementByKey');


        // Act
        const _onePaneBack = onePane.GoBack();
        const finalState: IKeyState = store.getState().KeyReducers;

        // Assert
        expect(finalState).toStrictEqual(expectedState)

        expect(popScreenSpy).toBeCalled();
        expect(popScreenSpy).toBeCalledTimes(1);

        expect(removeHeaderKeyBySpy).toBeCalled();
        expect(removeHeaderKeyBySpy).toBeCalledTimes(1);

        expect(removePaneElementBySpy).toBeCalled();
        expect(removePaneElementBySpy).toBeCalledTimes(1);
    });

    it('replacePane calls', () => {
        // Arrange
        const replacePaneElementSpy = jest.spyOn(paneElementActions, 'replacePaneElement');

        // Act
        const _onePaneBack = onePane.ReplacePane('test', <Fragment />);

        // Assert
        expect(replacePaneElementSpy).toBeCalled();
        expect(replacePaneElementSpy).toBeCalledTimes(1);
    });

    it('ReplaceHeader calls', () => {
        // Arrange
        const replaceHeaderSpy = jest.spyOn(headerActions, 'replaceHeader');

        // Act
        const _onePaneBack = onePane.ReplaceHeader('test', { title: 'test' });

        // Assert
        expect(replaceHeaderSpy).toBeCalled();
        expect(replaceHeaderSpy).toBeCalledTimes(1);
    });

});
