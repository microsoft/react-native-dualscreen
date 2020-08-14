jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js', () => {
  const { EventEmitter } = require('events');
  return EventEmitter;
});

jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"))
