import React, {Component} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ListRenderItem,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './Follower.Style';
import {getFollowerRequest} from './Follower.Action';
import NoDataView from '../Components/NoDataView';
import colors from '../Themes/Colors';
import {barStyle} from '../const';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonBtn from '../Components/CommonBtn';
import LoadingView from '../Components/LoadingView';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../Navigator/AppContainer';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../DrawerNavigator/DrawerNavigator.Screen';
import {CompositeNavigationProp} from '@react-navigation/native';
import {Action} from '../reducers';
import {GithubFollowerResponse} from './Follower.Model';

interface Props {
  callApi: (action: Action) => {};
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<StackParamList>,
    DrawerNavigationProp<DrawerParamList>
  >;
}

interface State {
  getFollower: any;
}

class FollowerScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      getFollower: {fetching: false, data: null, err: null},
    };
  }

  static getDerivedStateFromProps(nextProps: any) {
    return {getFollower: nextProps.getFollower};
  }

  getFollower = () => {
    this.props.callApi(getFollowerRequest('duytq94'));
  };

  goDetail = () => {
    this.props.navigation.navigate('DetailFollowerScreen');
  };

  onMenuPress = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderToolbar()}

        <CommonBtn
          styleBtn={styles.btnGetData}
          styleText={styles.textGetData}
          onPress={this.getFollower}
          title={'Get follower'}
        />

        <CommonBtn
          styleBtn={styles.btnGetData}
          styleText={styles.textGetData}
          onPress={this.goDetail}
          title={'Go detail'}
        />

        {this.renderDataView()}

        {this.state.getFollower.fetching ? <LoadingView /> : null}
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
          <Text style={styles.titleToolbar}>Follower</Text>
        </View>
        <View style={styles.viewWrapIcRight} />
      </View>
    );
  };

  renderDataView = () => {
    const arr: Array<GithubFollowerResponse> = this.state.getFollower.data;
    if (arr) {
      return (
        <FlatList
          style={{flex: 1, paddingLeft: 10, paddingRight: 10}}
          data={this.state.getFollower.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.renderFooterList}
          ListFooterComponent={this.renderFooterList}
        />
      );
    } else if (this.state.getFollower.err) {
      return <NoDataView onRetryPress={this.getFollower} />;
    } else {
      return null;
    }
  };

  renderItem: ListRenderItem<GithubFollowerResponse> = ({item}) => {
    return (
      <View style={styles.viewWrapItem}>
        <Image style={styles.avatar} source={{uri: item.avatar_url}} />
        <Text style={styles.textName}>{item.login}</Text>
      </View>
    );
  };

  renderFooterList = () => {
    return <View style={{height: 10}} />;
  };
}

const mapStateToProps = (state: any) => {
  return {
    getFollower: state.getFollower,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    callApi: object => dispatch(object),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowerScreen);
