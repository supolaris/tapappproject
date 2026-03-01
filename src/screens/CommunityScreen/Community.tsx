import React from 'react';
import {View, StyleSheet} from 'react-native';
import MainHeader from '../../components/common/headers/MainHeader';
import {TapAppColors} from '../../constants/TapAppColors';

const Community = () => {
  return (
    <View style={styles.container}>
      <MainHeader
        showBackIcon={false}
        showSettingsIcon={false}
        title="Community"
        onHeaderBackPressed={() => {}}
        onHeaderSettingsPressed={() => {}}
      />
      <View style={styles.innerContainer}></View>
    </View>
  );
};

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapAppColors.appBackground,
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
  },
});
