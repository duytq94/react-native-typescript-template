import {StyleSheet} from 'react-native';
import ApplicationStyle from '../Themes/Application.Style';

export default StyleSheet.create({
  ...ApplicationStyle,
  viewNetworkErr: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnRetry: {
    width: 150,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textRetry: {
    color: 'black',
    fontWeight: 'bold',
  },
});
