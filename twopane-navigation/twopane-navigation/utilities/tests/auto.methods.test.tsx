import singleScreen from '../../singleScreen/singleScreenStore/singleScreen.methods';
import dualScreen from '../../dualScreen/dualScreenStore/dualScreen.methods';
import utility from '../utility.methods';
import autoScreen from '../auto.methods';
import React, { Fragment } from 'react';

describe('autoScreen methods', () => {
    describe('singleScreen Correct Methods Called', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            jest.spyOn(utility, 'isDualScreen').mockReturnValue(false);
        });

        it('Add', () => {
            // Arrange
            const singleScreenAddSpy = jest.spyOn(singleScreen, 'Add');
            const dualScreenAddSpy = jest.spyOn(dualScreen, 'Add');

            // Act
            autoScreen.Add('test', <Fragment />);

            // Assert
            expect(singleScreenAddSpy).toBeCalled();
            expect(singleScreenAddSpy).toBeCalledTimes(1);
            expect(dualScreenAddSpy).not.toBeCalled();
            expect(dualScreenAddSpy).toBeCalledTimes(0);
        });

        it('AddOrMoveToFront', () => {
            // Arrange
            const singleScreenAddOrMoveToFrontSpy = jest.spyOn(singleScreen, 'AddOrMoveToFront');
            const dualScreenAddAddOrMoveToFrontSpy = jest.spyOn(dualScreen, 'AddOrMoveToFront');

            // Act
            autoScreen.AddOrMoveToFront('test', <Fragment />);

            // Assert
            expect(singleScreenAddOrMoveToFrontSpy).toBeCalled();
            expect(singleScreenAddOrMoveToFrontSpy).toBeCalledTimes(1);
            expect(dualScreenAddAddOrMoveToFrontSpy).not.toBeCalled();
            expect(dualScreenAddAddOrMoveToFrontSpy).toBeCalledTimes(0);
        });

        it('AddOrMoveToFrontDual', () => {
            // Arrange
            const singleScreenAddSpy = jest.spyOn(singleScreen, 'Add');
            const singleScreenAddOrMoveToFrontSpy = jest.spyOn(singleScreen, 'AddOrMoveToFront');
            const dualScreenAddOrMoveToFrontSpy = jest.spyOn(dualScreen, 'AddOrMoveToFront');

            // Act
            autoScreen.AddOrMoveToFrontDual('test', <Fragment />);

            // Assert
            expect(singleScreenAddSpy).toBeCalled();
            expect(singleScreenAddSpy).toBeCalledTimes(1);
            expect(singleScreenAddOrMoveToFrontSpy).not.toBeCalled();
            expect(singleScreenAddOrMoveToFrontSpy).toBeCalledTimes(0);
            expect(dualScreenAddOrMoveToFrontSpy).not.toBeCalled();
            expect(dualScreenAddOrMoveToFrontSpy).toBeCalledTimes(0);
        });
        it('AddOrMoveToFrontSingle', () => {
            // Arrange
            const dualScreenAddSpy = jest.spyOn(dualScreen, 'Add');
            const dualScreenAddOrMoveToFrontSpy = jest.spyOn(dualScreen, 'AddOrMoveToFront');
            const singleScreenAddOrMoveToFrontSpy = jest.spyOn(singleScreen, 'AddOrMoveToFront');

            // Act
            autoScreen.AddOrMoveToFrontSingle('test', <Fragment />);

            // Assert
            expect(singleScreenAddOrMoveToFrontSpy).toBeCalled();
            expect(singleScreenAddOrMoveToFrontSpy).toBeCalledTimes(1);
            expect(dualScreenAddSpy).not.toBeCalled();
            expect(dualScreenAddSpy).toBeCalledTimes(0);
            expect(dualScreenAddOrMoveToFrontSpy).not.toBeCalled();
            expect(dualScreenAddOrMoveToFrontSpy).toBeCalledTimes(0);
        });



        it('BackToHome', () => {
            // Arrange
            const singleScreenBackToHomeSpy = jest.spyOn(singleScreen, 'BackToHome');
            const dualScreenBackToHomeSpy = jest.spyOn(dualScreen, 'BackToHome');

            // Act
            autoScreen.BackToHome();

            // Assert
            expect(singleScreenBackToHomeSpy).toBeCalled();
            expect(singleScreenBackToHomeSpy).toBeCalledTimes(1);
            expect(dualScreenBackToHomeSpy).not.toBeCalled();
            expect(dualScreenBackToHomeSpy).toBeCalledTimes(0);
        });

        it('GoBack', () => {
            // Arrange
            const singleScreenGoBackSpy = jest.spyOn(singleScreen, 'GoBack');
            const dualScreenGoBackSpy = jest.spyOn(dualScreen, 'GoBack');

            // Act
            autoScreen.GoBack();

            // Assert
            expect(singleScreenGoBackSpy).toBeCalled();
            expect(singleScreenGoBackSpy).toBeCalledTimes(1);
            expect(dualScreenGoBackSpy).not.toBeCalled();
            expect(dualScreenGoBackSpy).toBeCalledTimes(0);
        });

        it('ReplaceScreen', () => {
            // Arrange
            const singleScreenReplaceHeaderSpy = jest.spyOn(
                singleScreen,
                'ReplaceScreen'
            );
            const dualScreenReplaceHeaderSpy = jest.spyOn(
                dualScreen,
                'ReplaceScreen'
            );

            // Act
            autoScreen.ReplaceScreen('test', <Fragment />);

            // Assert
            expect(singleScreenReplaceHeaderSpy).toBeCalled();
            expect(singleScreenReplaceHeaderSpy).toBeCalledTimes(1);
            expect(dualScreenReplaceHeaderSpy).not.toBeCalled();
            expect(dualScreenReplaceHeaderSpy).toBeCalledTimes(0);
        });

        it('ReplaceHeader', () => {
            // Arrange
            const singleScreenReplaceHeaderSpy = jest.spyOn(
                singleScreen,
                'ReplaceHeader'
            );
            const dualScreenReplaceHeaderSpy = jest.spyOn(
                dualScreen,
                'ReplaceHeader'
            );

            // Act
            autoScreen.ReplaceHeader('test', { title: 'test title' });

            // Assert
            expect(singleScreenReplaceHeaderSpy).toBeCalled();
            expect(singleScreenReplaceHeaderSpy).toBeCalledTimes(1);
            expect(dualScreenReplaceHeaderSpy).not.toBeCalled();
            expect(dualScreenReplaceHeaderSpy).toBeCalledTimes(0);
        });

    });

    describe('dualScreen Correct Methods Called', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            jest.spyOn(utility, 'isDualScreen').mockReturnValue(true);
        });

        it('Add', () => {
            // Arrange
            const singleScreenAddSpy = jest.spyOn(singleScreen, 'Add');
            const dualScreenAddSpy = jest.spyOn(dualScreen, 'Add');

            // Act
            autoScreen.Add('test', <Fragment />);

            // Assert
            expect(singleScreenAddSpy).not.toBeCalled();
            expect(singleScreenAddSpy).toBeCalledTimes(0);
            expect(dualScreenAddSpy).toBeCalled();
            expect(dualScreenAddSpy).toBeCalledTimes(1);
        });

        it('AddOrMoveToFront', () => {
            // Arrange
            const singleScreenAddOrMoveToFrontSpy = jest.spyOn(singleScreen, 'AddOrMoveToFront');
            const dualScreenAddAddOrMoveToFrontSpy = jest.spyOn(dualScreen, 'AddOrMoveToFront');

            // Act
            autoScreen.AddOrMoveToFront('test', <Fragment />);

            // Assert
            expect(dualScreenAddAddOrMoveToFrontSpy).toBeCalled();
            expect(dualScreenAddAddOrMoveToFrontSpy).toBeCalledTimes(1);
            expect(singleScreenAddOrMoveToFrontSpy).not.toBeCalled();
            expect(singleScreenAddOrMoveToFrontSpy).toBeCalledTimes(0);
        });

        it('AddOrMoveToFrontDual', () => {
            // Arrange
            const singleScreenAddSpy = jest.spyOn(singleScreen, 'Add');
            const singleScreenAddOrMoveToFrontSpy = jest.spyOn(singleScreen, 'AddOrMoveToFront');
            const dualScreenAddOrMoveToFrontSpy = jest.spyOn(dualScreen, 'AddOrMoveToFront');

            // Act
            autoScreen.AddOrMoveToFrontDual('test', <Fragment />);

            // Assert
            expect(dualScreenAddOrMoveToFrontSpy).toBeCalled();
            expect(dualScreenAddOrMoveToFrontSpy).toBeCalledTimes(1);
            expect(singleScreenAddOrMoveToFrontSpy).not.toBeCalled();
            expect(singleScreenAddOrMoveToFrontSpy).toBeCalledTimes(0);
            expect(singleScreenAddSpy).not.toBeCalled();
            expect(singleScreenAddSpy).toBeCalledTimes(0);
        });

        it('AddOrMoveToFrontSingle', () => {
            // Arrange
            const singleScreenAddSpy = jest.spyOn(singleScreen, 'Add');
            const dualScreenAddSpy = jest.spyOn(dualScreen, 'Add');
            const singleScreenAddOrMoveToFrontSpy = jest.spyOn(singleScreen, 'AddOrMoveToFront');

            // Act
            autoScreen.AddOrMoveToFrontSingle('test', <Fragment />);

            // Assert
            expect(dualScreenAddSpy).toBeCalled();
            expect(dualScreenAddSpy).toBeCalledTimes(1);
            expect(singleScreenAddSpy).not.toBeCalled();
            expect(singleScreenAddSpy).toBeCalledTimes(0);
            expect(singleScreenAddOrMoveToFrontSpy).not.toBeCalled();
            expect(singleScreenAddOrMoveToFrontSpy).toBeCalledTimes(0);
        });


        it('BackToHome', () => {
            // Arrange
            const singleScreenBackToHomeSpy = jest.spyOn(singleScreen, 'BackToHome');
            const dualScreenBackToHomeSpy = jest.spyOn(dualScreen, 'BackToHome');

            // Act
            autoScreen.BackToHome();

            // Assert
            expect(singleScreenBackToHomeSpy).not.toBeCalled();
            expect(singleScreenBackToHomeSpy).toBeCalledTimes(0);
            expect(dualScreenBackToHomeSpy).toBeCalled();
            expect(dualScreenBackToHomeSpy).toBeCalledTimes(1);
        });

        it('GoBack', () => {
            // Arrange
            const singleScreenGoBackSpy = jest.spyOn(singleScreen, 'GoBack');
            const dualScreenGoBackSpy = jest.spyOn(dualScreen, 'GoBack');

            // Act
            autoScreen.GoBack();

            // Assert
            expect(singleScreenGoBackSpy).not.toBeCalled();
            expect(singleScreenGoBackSpy).toBeCalledTimes(0);
            expect(dualScreenGoBackSpy).toBeCalled();
            expect(dualScreenGoBackSpy).toBeCalledTimes(1);
        });


        it('ReplaceScreen', () => {
            // Arrange
            const singleScreenReplaceHeaderSpy = jest.spyOn(
                singleScreen,
                'ReplaceScreen'
            );
            const dualScreenReplaceHeaderSpy = jest.spyOn(
                dualScreen,
                'ReplaceScreen'
            );

            // Act
            autoScreen.ReplaceScreen('test', <Fragment />);

            // Assert
            expect(dualScreenReplaceHeaderSpy).toBeCalled();
            expect(dualScreenReplaceHeaderSpy).toBeCalledTimes(1);
            expect(singleScreenReplaceHeaderSpy).not.toBeCalled();
            expect(singleScreenReplaceHeaderSpy).toBeCalledTimes(0);
        });

        it('ReplaceHeader', () => {
            // Arrange
            const singleScreenReplaceHeaderSpy = jest.spyOn(
                singleScreen,
                'ReplaceHeader'
            );
            const dualScreenReplaceHeaderSpy = jest.spyOn(
                dualScreen,
                'ReplaceHeader'
            );

            // Act
            autoScreen.ReplaceHeader('test', { title: 'test title' });

            // Assert
            expect(dualScreenReplaceHeaderSpy).toBeCalled();
            expect(dualScreenReplaceHeaderSpy).toBeCalledTimes(1);
            expect(singleScreenReplaceHeaderSpy).not.toBeCalled();
            expect(singleScreenReplaceHeaderSpy).toBeCalledTimes(0);
        });

    });
});
