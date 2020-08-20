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
            paneElement: <Fragment />,
            header: {
                title: 'singleScreenDefaultTitle'
            }
        };

        const _twoPaneDefault: IPaneComponent = {
            key: 'dualDefault',
            paneElement: <Fragment />,
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
        // TODO MOCK TEST
        // Assert
        expect(toJSON(container)).toMatchSnapshot();
    });
});
