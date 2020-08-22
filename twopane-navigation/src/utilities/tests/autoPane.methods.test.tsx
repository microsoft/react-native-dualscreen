import onePane from '../../onePane/onePaneStore/onePane.methods';
import twoPane from '../../twoPane/twoPaneStore/twoPane.methods';
import utility from '../utility.methods';
import autoPane from '../autoPane.methods';
import React, { Fragment } from 'react';

describe('autoPane methods', () => {
    describe('onePane Correct Methods Called', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            jest.spyOn(utility, 'isTwoPane').mockReturnValue(false);
        });

        it('Add', () => {
            // Arrange
            const onePaneAddSpy = jest.spyOn(onePane, 'Add');
            const twoPaneAddSpy = jest.spyOn(twoPane, 'Add');

            // Act
            autoPane.Add('test', <Fragment />);

            // Assert
            expect(onePaneAddSpy).toBeCalled();
            expect(onePaneAddSpy).toBeCalledTimes(1);
            expect(twoPaneAddSpy).not.toBeCalled();
            expect(twoPaneAddSpy).toBeCalledTimes(0);
        });

        it('AddOrMoveToFront', () => {
            // Arrange
            const onePaneAddOrMoveToFrontSpy = jest.spyOn(onePane, 'AddOrMoveToFront');
            const twoPaneAddAddOrMoveToFrontSpy = jest.spyOn(twoPane, 'AddOrMoveToFront');

            // Act
            autoPane.AddOrMoveToFront('test', <Fragment />);

            // Assert
            expect(onePaneAddOrMoveToFrontSpy).toBeCalled();
            expect(onePaneAddOrMoveToFrontSpy).toBeCalledTimes(1);
            expect(twoPaneAddAddOrMoveToFrontSpy).not.toBeCalled();
            expect(twoPaneAddAddOrMoveToFrontSpy).toBeCalledTimes(0);
        });

        it('AddOrMoveToFrontTWO', () => {
            // Arrange
            const onePaneAddSpy = jest.spyOn(onePane, 'Add');
            const onePaneAddOrMoveToFrontSpy = jest.spyOn(onePane, 'AddOrMoveToFront');
            const twoPaneAddOrMoveToFrontSpy = jest.spyOn(twoPane, 'AddOrMoveToFront');

            // Act
            autoPane.AddOrMoveToFrontTWO('test', <Fragment />);

            // Assert
            expect(onePaneAddSpy).toBeCalled();
            expect(onePaneAddSpy).toBeCalledTimes(1);
            expect(onePaneAddOrMoveToFrontSpy).not.toBeCalled();
            expect(onePaneAddOrMoveToFrontSpy).toBeCalledTimes(0);
            expect(twoPaneAddOrMoveToFrontSpy).not.toBeCalled();
            expect(twoPaneAddOrMoveToFrontSpy).toBeCalledTimes(0);
        });
        it('AddOrMoveToFrontONE', () => {
            // Arrange
            const twoPaneAddSpy = jest.spyOn(twoPane, 'Add');
            const twoPaneAddOrMoveToFrontSpy = jest.spyOn(twoPane, 'AddOrMoveToFront');
            const onePaneAddOrMoveToFrontSpy = jest.spyOn(onePane, 'AddOrMoveToFront');

            // Act
            autoPane.AddOrMoveToFrontONE('test', <Fragment />);

            // Assert
            expect(onePaneAddOrMoveToFrontSpy).toBeCalled();
            expect(onePaneAddOrMoveToFrontSpy).toBeCalledTimes(1);
            expect(twoPaneAddSpy).not.toBeCalled();
            expect(twoPaneAddSpy).toBeCalledTimes(0);
            expect(twoPaneAddOrMoveToFrontSpy).not.toBeCalled();
            expect(twoPaneAddOrMoveToFrontSpy).toBeCalledTimes(0);
        });



        it('BackToHome', () => {
            // Arrange
            const onePaneBackToHomeSpy = jest.spyOn(onePane, 'BackToHome');
            const twoPaneBackToHomeSpy = jest.spyOn(twoPane, 'BackToHome');

            // Act
            autoPane.BackToHome();

            // Assert
            expect(onePaneBackToHomeSpy).toBeCalled();
            expect(onePaneBackToHomeSpy).toBeCalledTimes(1);
            expect(twoPaneBackToHomeSpy).not.toBeCalled();
            expect(twoPaneBackToHomeSpy).toBeCalledTimes(0);
        });

        it('GoBack', () => {
            // Arrange
            const onePaneGoBackSpy = jest.spyOn(onePane, 'GoBack');
            const twoPaneGoBackSpy = jest.spyOn(twoPane, 'GoBack');

            // Act
            autoPane.GoBack();

            // Assert
            expect(onePaneGoBackSpy).toBeCalled();
            expect(onePaneGoBackSpy).toBeCalledTimes(1);
            expect(twoPaneGoBackSpy).not.toBeCalled();
            expect(twoPaneGoBackSpy).toBeCalledTimes(0);
        });

        it('ReplacePane', () => {
            // Arrange
            const onePaneReplaceHeaderSpy = jest.spyOn(
                onePane,
                'ReplacePane'
            );
            const twoPaneReplaceHeaderSpy = jest.spyOn(
                twoPane,
                'ReplacePane'
            );

            // Act
            autoPane.ReplacePane('test', <Fragment />);

            // Assert
            expect(onePaneReplaceHeaderSpy).toBeCalled();
            expect(onePaneReplaceHeaderSpy).toBeCalledTimes(1);
            expect(twoPaneReplaceHeaderSpy).not.toBeCalled();
            expect(twoPaneReplaceHeaderSpy).toBeCalledTimes(0);
        });

        it('ReplaceHeader', () => {
            // Arrange
            const onePaneReplaceHeaderSpy = jest.spyOn(
                onePane,
                'ReplaceHeader'
            );
            const twoPaneReplaceHeaderSpy = jest.spyOn(
                twoPane,
                'ReplaceHeader'
            );

            // Act
            autoPane.ReplaceHeader('test', { title: 'test title' });

            // Assert
            expect(onePaneReplaceHeaderSpy).toBeCalled();
            expect(onePaneReplaceHeaderSpy).toBeCalledTimes(1);
            expect(twoPaneReplaceHeaderSpy).not.toBeCalled();
            expect(twoPaneReplaceHeaderSpy).toBeCalledTimes(0);
        });

    });

    describe('twoPane Correct Methods Called', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            jest.spyOn(utility, 'isTwoPane').mockReturnValue(true);
        });

        it('Add', () => {
            // Arrange
            const onePaneAddSpy = jest.spyOn(onePane, 'Add');
            const twoPaneAddSpy = jest.spyOn(twoPane, 'Add');

            // Act
            autoPane.Add('test', <Fragment />);

            // Assert
            expect(onePaneAddSpy).not.toBeCalled();
            expect(onePaneAddSpy).toBeCalledTimes(0);
            expect(twoPaneAddSpy).toBeCalled();
            expect(twoPaneAddSpy).toBeCalledTimes(1);
        });

        it('AddOrMoveToFront', () => {
            // Arrange
            const onePaneAddOrMoveToFrontSpy = jest.spyOn(onePane, 'AddOrMoveToFront');
            const twoPaneAddAddOrMoveToFrontSpy = jest.spyOn(twoPane, 'AddOrMoveToFront');

            // Act
            autoPane.AddOrMoveToFront('test', <Fragment />);

            // Assert
            expect(twoPaneAddAddOrMoveToFrontSpy).toBeCalled();
            expect(twoPaneAddAddOrMoveToFrontSpy).toBeCalledTimes(1);
            expect(onePaneAddOrMoveToFrontSpy).not.toBeCalled();
            expect(onePaneAddOrMoveToFrontSpy).toBeCalledTimes(0);
        });

        it('AddOrMoveToFrontTWO', () => {
            // Arrange
            const onePaneAddSpy = jest.spyOn(onePane, 'Add');
            const onePaneAddOrMoveToFrontSpy = jest.spyOn(onePane, 'AddOrMoveToFront');
            const twoPaneAddOrMoveToFrontSpy = jest.spyOn(twoPane, 'AddOrMoveToFront');

            // Act
            autoPane.AddOrMoveToFrontTWO('test', <Fragment />);

            // Assert
            expect(twoPaneAddOrMoveToFrontSpy).toBeCalled();
            expect(twoPaneAddOrMoveToFrontSpy).toBeCalledTimes(1);
            expect(onePaneAddOrMoveToFrontSpy).not.toBeCalled();
            expect(onePaneAddOrMoveToFrontSpy).toBeCalledTimes(0);
            expect(onePaneAddSpy).not.toBeCalled();
            expect(onePaneAddSpy).toBeCalledTimes(0);
        });

        it('AddOrMoveToFrontONE', () => {
            // Arrange
            const onePaneAddSpy = jest.spyOn(onePane, 'Add');
            const twoPaneAddSpy = jest.spyOn(twoPane, 'Add');
            const onePaneAddOrMoveToFrontSpy = jest.spyOn(onePane, 'AddOrMoveToFront');

            // Act
            autoPane.AddOrMoveToFrontONE('test', <Fragment />);

            // Assert
            expect(twoPaneAddSpy).toBeCalled();
            expect(twoPaneAddSpy).toBeCalledTimes(1);
            expect(onePaneAddSpy).not.toBeCalled();
            expect(onePaneAddSpy).toBeCalledTimes(0);
            expect(onePaneAddOrMoveToFrontSpy).not.toBeCalled();
            expect(onePaneAddOrMoveToFrontSpy).toBeCalledTimes(0);
        });


        it('BackToHome', () => {
            // Arrange
            const onePaneBackToHomeSpy = jest.spyOn(onePane, 'BackToHome');
            const twoPaneBackToHomeSpy = jest.spyOn(twoPane, 'BackToHome');

            // Act
            autoPane.BackToHome();

            // Assert
            expect(onePaneBackToHomeSpy).not.toBeCalled();
            expect(onePaneBackToHomeSpy).toBeCalledTimes(0);
            expect(twoPaneBackToHomeSpy).toBeCalled();
            expect(twoPaneBackToHomeSpy).toBeCalledTimes(1);
        });

        it('GoBack', () => {
            // Arrange
            const onePaneGoBackSpy = jest.spyOn(onePane, 'GoBack');
            const twoPaneGoBackSpy = jest.spyOn(twoPane, 'GoBack');

            // Act
            autoPane.GoBack();

            // Assert
            expect(onePaneGoBackSpy).not.toBeCalled();
            expect(onePaneGoBackSpy).toBeCalledTimes(0);
            expect(twoPaneGoBackSpy).toBeCalled();
            expect(twoPaneGoBackSpy).toBeCalledTimes(1);
        });


        it('ReplaceScreen', () => {
            // Arrange
            const onePaneReplaceHeaderSpy = jest.spyOn(
                onePane,
                'ReplaceScreen'
            );
            const twoPaneReplaceHeaderSpy = jest.spyOn(
                twoPane,
                'ReplaceScreen'
            );

            // Act
            autoPane.ReplaceScreen('test', <Fragment />);

            // Assert
            expect(twoPaneReplaceHeaderSpy).toBeCalled();
            expect(twoPaneReplaceHeaderSpy).toBeCalledTimes(1);
            expect(onePaneReplaceHeaderSpy).not.toBeCalled();
            expect(onePaneReplaceHeaderSpy).toBeCalledTimes(0);
        });

        it('ReplaceHeader', () => {
            // Arrange
            const onePaneReplaceHeaderSpy = jest.spyOn(
                onePane,
                'ReplaceHeader'
            );
            const twoPaneReplaceHeaderSpy = jest.spyOn(
                twoPane,
                'ReplaceHeader'
            );

            // Act
            autoPane.ReplaceHeader('test', { title: 'test title' });

            // Assert
            expect(twoPaneReplaceHeaderSpy).toBeCalled();
            expect(twoPaneReplaceHeaderSpy).toBeCalledTimes(1);
            expect(onePaneReplaceHeaderSpy).not.toBeCalled();
            expect(onePaneReplaceHeaderSpy).toBeCalledTimes(0);
        });

    });
});
