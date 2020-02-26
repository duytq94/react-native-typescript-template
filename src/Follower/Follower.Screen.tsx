import React, {Component} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './Follower.Style';
import {getFollowerRequest} from './Follower.Action';
import NoDataView from '../Components/NoDataView';
import colors from '../Themes/Colors';
import {barStyle} from '../const';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GeneralButton from '../Components/GeneralButton';
import LoadingView from '../Components/LoadingView';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../Root/RootContainer.Screen';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../DrawerNavigator/DrawerNavigator.Screen';
import {CompositeNavigationProp} from '@react-navigation/native';

interface ItemProp {
  item: any;
}

interface Props {
  onCallApi: any;
  navigation: CompositeNavigationProp<
    StackNavigationProp<StackParamList>,
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
    this.props.onCallApi(getFollowerRequest('duytq94'));
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

        <GeneralButton
          styleBtn={styles.btnGetData}
          styleText={styles.textGetData}
          onPress={this.getFollower}
          title={'Get follower'}
        />

        <GeneralButton
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
    if (this.state.getFollower.data) {
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

  renderItem = ({item}: ItemProp) => {
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
    onCallApi: object => dispatch(object),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FollowerScreen);
