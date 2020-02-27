import * as TestHelpers from "./TestHelpers";
import { DualScreenInfo } from "../dualscreeninfo";
import { EventEmitter } from 'events';

TestHelpers.runTests("DualScreenInfo", () => {

  const nativeEventEmitter = new EventEmitter();

  describe('spannedChange event', () => {
    it('should call the listener when the native event is emitted', () => {
      const handler = jest.fn();
      DualScreenInfo.addEventListener('spannedChange', handler);

      const expectedWindowRectsType = { width: 50, height: 50 };
      const expectedDualScreenInfoEvent = {
        isSpanning: true,
        windowRects: [expectedWindowRectsType, expectedWindowRectsType],
      };

      TestHelpers.getEventEmitter().emit(
        'spannedChange',
        expectedDualScreenInfoEvent
      );

      expect(handler).toBeCalledWith(expectedDualScreenInfoEvent);
    });
  });
});
