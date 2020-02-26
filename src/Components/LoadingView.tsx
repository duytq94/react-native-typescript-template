import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingView: FC = () => {
  return (
    <View style={styles.viewLoading}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};
const styles = StyleSheet.create({
  viewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingView;
