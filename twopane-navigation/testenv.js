jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js', () => {
  const { EventEmitter } = require('events');
  return EventEmitter;
});