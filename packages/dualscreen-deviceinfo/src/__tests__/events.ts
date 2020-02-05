/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import DualScreenInfo from '../index';
import NativeInterface from '../internal/nativeInterface';

jest.mock('NativeModules', () => {
  return {
    DualscreenDeviceinfo: {
      getWindowRects: jest.fn(),
      isSpanned: jest.fn(),
      addListener: jest.fn(),
      removeListeners: jest.fn(),
    },
  };
});

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js', () => {
  const { EventEmitter } = require('events');
  return EventEmitter;
});

describe('microsoft/react-native-dualscreeninfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Event listener callbacks', () => {
    it('should call the listener when the native event is emitted', () => {
      const handler = jest.fn();
      DualScreenInfo.addEventListener('spannedChange', handler);

      const expectedWindowRectsType = { width: 50, height: 50 };
      const expectedDualScreenInfoEvent = {
        isSpanning: true,
        windowRects: [expectedWindowRectsType, expectedWindowRectsType],
      };

      NativeInterface.eventEmitter.emit(
        'spannedChange',
        expectedDualScreenInfoEvent
      );
      expect(handler).toBeCalledWith(expectedDualScreenInfoEvent);
    });
  });
});
