import { StyleSheet } from 'react-native';

export const ScreenOverlayStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  overlay: {
    zIndex: 5,
    backgroundColor: '#f2f2f2'
  }
});
