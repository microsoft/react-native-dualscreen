import { StyleSheet } from 'react-native';

export const PaneHeaderStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    height: 56
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#F2F2F2',
    marginLeft: 6
  },
  leftButton: {
    paddingRight: 30
  }
});
