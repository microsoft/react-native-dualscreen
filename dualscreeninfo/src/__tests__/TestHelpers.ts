declare type DoneFn = (error?: any) => void;

const { EventEmitter } = require('events');
const dualScreenEmitter = new EventEmitter();

jest.mock('NativeModules', () => {
  return {
    DualScreenInfo: {
      getWindowRects: jest.fn(),
      isSpanned: jest.fn(),
      addListener: jest.fn(),
      removeListeners: jest.fn(),
    },
  };
});

jest.mock('NativeEventEmitter', () => {
  function mockedNativeEventEmitter() {
    return dualScreenEmitter;
  }
  return mockedNativeEventEmitter;
});

function beforeHelper(done: DoneFn) {
  //general setup
  jest.clearAllMocks();
  done();
}

function afterHelper(done: DoneFn) {
  //general setup
  done();
}

export function getEventEmitter() {
  return dualScreenEmitter;
}

export function runTests(testSuiteName: string, spec: () => void) {
  // Iterate across all the test suites that we have
  describe(testSuiteName + ' Wrapper' , () => {
    beforeEach(done => {
      beforeHelper(done);
    });

    afterEach(done => {
      afterHelper(done);
    });

    // Set value before we call spec to ensure that any inline conditionals in test definition get respected
    describe(testSuiteName, spec);
  });
}
