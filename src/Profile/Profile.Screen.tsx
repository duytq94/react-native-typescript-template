import React, {Component} from 'react';
import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './Profile.Style';
import {getProfileRequest} from './Profile.Action';
import NoDataView from '../Components/NoDataView';
import colors from '../Themes/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {barStyle} from '../const';
import GeneralButton from '../Components/GeneralButton';
import LoadingView from '../Components/LoadingView';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/Root/RootContainer.Screen';
import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from 'src/DrawerNavigator/DrawerNavigator.Screen';

interface Props {
  onCallApi: any;
  navigation: CompositeNavigationProp<
    StackNavigationProp<StackParamList>,
    DrawerNavigationProp<DrawerParamList>
  >;
}

interface State {
  getProfile: any;
}

class ProfileScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      getProfile: {fetching: false, data: null, err: null},
    };
  }

  static getDerivedStateFromProps(nextProps: any) {
    return {getProfile: nextProps.getProfile};
  }

  getUserProfile = () => {
    this.props.onCallApi(getProfileRequest('duytq94'));
  };

  goDetail = () => {
    this.props.navigation.navigate('DetailProfileScreen');
  };

  onMenuPress = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderToolbar()}

        <GeneralButton
          styleBtn={styles.btnGetData}
          styleText={styles.textGetData}
          onPress={this.getUserProfile}
          title={'Get profile'}
        />

        <GeneralButton
          styleBtn={styles.btnGetData}
          styleText={styles.textGetData}
          onPress={this.goDetail}
          title={'Go detail'}
        />

        {this.renderDataView()}

        {this.state.getProfile.fetching ? <LoadingView /> : null}
      </View>
    );
  }

  renderToolbar = () => {
    return (
      <View style={styles.toolbar}>
        <StatusBar
          hidden={false}
          backgroundColor={colors.primary}
          barStyle={barStyle.lightContent}
        />
        <TouchableOpacity
          style={styles.viewWrapIcLeft}
          onPress={this.onMenuPress}>
          <MaterialCommunityIcons
            name={'menu'}
            size={30}
            color={colors.white}
          />
        </TouchableOpacity>
        <View style={styles.viewWrapTitleToolbar}>
          <Text style={styles.titleToolbar}>Profile</Text>
        </View>
        <View style={styles.viewWrapIcRight} />
      </View>
    );
  };

  renderDataView = () => {
    if (this.state.getProfile.data) {
      return (
        <View style={styles.body}>
          <Image
            style={styles.avatar}
            source={{uri: this.state.getProfile.data.avatar_url}}
          />
          <Text style={styles.textData}>
            {this.state.getProfile.data.login}
          </Text>
          <Text style={styles.textData}>{this.state.getProfile.data.name}</Text>
          <Text style={styles.textData}>
            {this.state.getProfile.data.location}
          </Text>
        </View>
      );
    } else if (this.state.getProfile.err) {
      return <NoDataView onRetryPress={this.getUserProfile} />;
    } else {
      return null;
    }
  };
}

const mapStateToProps = (state: any) => {
  return {
    getProfile: state.getProfile,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onCallApi: object => dispatch(object),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
