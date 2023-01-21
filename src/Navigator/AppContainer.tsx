import React, {Component} from 'react';
import {connect} from 'react-redux';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {clearNetworkFail} from '../actions';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import ApplicationStyle from '../Themes/Application.Style';
import colors from '../Themes/Colors';
import AppStack from './AppStack';

export type StackParamList = {
  DetailProfileScreen: undefined;
  DetailFollowerScreen: undefined;
  DrawerNavigatorScreen: undefined;
};

interface Props {}

interface State {
  sendNetworkFail: object;
}

class AppContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sendNetworkFail: {},
    };
  }

  static getDerivedStateFromProps(nextProps: any) {
    if (nextProps.sendNetworkFail.err) {
      switch (nextProps.sendNetworkFail.err) {
        case 'NETWORK_ERROR':
          Toast.show({
            type: 'info',
            text1: 'No network connection, please try again',
          });
          break;
        case 'TIMEOUT_ERROR':
          Toast.show({type: 'info', text1: 'Timeout, please try again'});
          break;
        case 'CONNECTION_ERROR':
          Toast.show({
            type: 'info',
            text1: 'DNS server not found, please try again',
          });
          break;
        default:
          Toast.show({
            type: 'info',
            text1: nextProps.sendNetworkFail.err,
          });
          break;
      }
      nextProps.callApi(clearNetworkFail());
    }
    return null;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </KeyboardAvoidingView>
        <Toast />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    sendNetworkFail: state.sendNetworkFail,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    callApi: (object: object) => dispatch(object),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

const styles = StyleSheet.create({
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
    backgroundColor: colors.white,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textRetry: {
    color: colors.black,
    fontWeight: 'bold',
  },
});
