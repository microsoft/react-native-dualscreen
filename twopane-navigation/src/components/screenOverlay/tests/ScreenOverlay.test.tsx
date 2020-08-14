import React, { Fragment } from 'react';
import renderer from 'react-test-renderer';
import ScreenOverlay from '../ScreenOverlay';

describe('ScreenOverlay Tests', () => {
  it('should render', () => {
    // Arrange
    jest.useFakeTimers();

    // Act
    const tree = renderer.create(
      <ScreenOverlay isVisible={true}>
        <Fragment />
      </ScreenOverlay>
    );

    // Assert
    expect(tree).toMatchSnapshot();
  });
});
