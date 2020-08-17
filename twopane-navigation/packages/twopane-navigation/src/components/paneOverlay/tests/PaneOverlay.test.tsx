import React, { Fragment } from 'react';
import renderer from 'react-test-renderer';
import PaneOverlay from '../PaneOverlay';

describe('ScreenOverlay Tests', () => {
  it('should render', () => {
    // Arrange
    jest.useFakeTimers();

    // Act
    const tree = renderer.create(
      <PaneOverlay isVisible={true}>
        <Fragment />
      </PaneOverlay>
    );

    // Assert
    expect(tree).toMatchSnapshot();
  });
});
