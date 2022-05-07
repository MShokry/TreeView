import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginLeft: -20,
  },
  item: {
    marginVertical: 6,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  name: {
    fontSize: 18,
    flex: 1,
    marginHorizontal: 8,
  },
  subName: {
    fontSize: 12,
    flex: 1,
    marginHorizontal: 8,
  },
  arrowDown: {
    width: 18,
    transform: [{rotate: '-90deg'}],
  },
  arrowClose: {
    width: 18,
    transform: [{rotate: '180deg'}],
  },
  buttonShow: {
    // marginHorizontal: 8,
    padding: 8,
  },
});
