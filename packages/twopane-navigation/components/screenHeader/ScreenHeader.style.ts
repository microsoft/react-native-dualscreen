import { StyleSheet } from 'react-native';

export const ScreenHeaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#F2F2F2',
    marginLeft: 6
  },
  leftButton: {
    padding: 10
  }
});
