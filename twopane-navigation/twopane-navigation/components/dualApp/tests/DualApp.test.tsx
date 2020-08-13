import React, { Fragment } from 'react';
import DualApp from '../DualApp';
import { IScreenComponent } from '../../../utilities/interfaces';
import { render, toJSON } from '@testing-library/react-native';

describe('DualApp Tests', () => {
    it('should render singleScreen', () => {
        // Arrange
        jest.useFakeTimers();
        const singleScreenDefault: IScreenComponent = {
            key: 'singleDefault',
            duexElement: <Fragment />,
            header: {
                title: 'singleScreenDefaultTitle'
            }
        };

        const dualScreenDefault: IScreenComponent = {
            key: 'dualDefault',
            duexElement: <Fragment />,
            header: {
                title: 'dualScreenDefaultTitle'
            }
        };

        // Act
        const { container } = render(
            <DualApp
                singleScreen={singleScreenDefault}
                dualScreen={dualScreenDefault}
            />
        );

        // Assert
        expect(toJSON(container)).toMatchSnapshot();
    });
});
