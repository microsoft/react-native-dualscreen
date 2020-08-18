import React, { Fragment } from 'react';
import DualApp from '../twoPaneApp';
import { IPaneComponent } from '../../../utilities/interfaces';
import { render, toJSON } from '@testing-library/react-native';

describe('DualApp Tests', () => {
    it('should render singleScreen', () => {
        // Arrange
        jest.useFakeTimers();
        const _onePaneDefault: IPaneComponent = {
            key: 'singleDefault',
            twoPaneElement: <Fragment />,
            header: {
                title: 'singleScreenDefaultTitle'
            }
        };

        const _twoPaneDefault: IPaneComponent = {
            key: 'dualDefault',
            twoPaneElement: <Fragment />,
            header: {
                title: 'onePaneDefaultTitle'
            }
        };

        // Act
        const { container } = render(
            <DualApp
                onePaneDefault={_onePaneDefault}
                twoPaneDefault={_twoPaneDefault}
            />
        );

        // Assert
        expect(toJSON(container)).toMatchSnapshot();
    });
});
