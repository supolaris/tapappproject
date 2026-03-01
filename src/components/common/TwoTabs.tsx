import React from 'react';
import {TapAppColors} from '../../constants/TapAppColors';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface IProps {
  tabOneText: string;
  tabTwoText: string;
  selectedTab: number;
  onTabOnePressed: () => void;
  onTabTwoPressed: () => void;
}

const TwoTabs = (props: IProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onTabOnePressed} style={styles.tabView}>
        <Text
          style={props.selectedTab === 1 ? styles.selectedText : styles.text}>
          {props.tabOneText}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onTabTwoPressed} style={styles.tabView}>
        <Text
          style={props.selectedTab === 2 ? styles.selectedText : styles.text}>
          {props.tabTwoText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TwoTabs;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: TapAppColors.appBackground,
    paddingVertical: 20,
  },
  tabView: {
    width: '50%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  selectedText: {
    color: TapAppColors.primaryColor,
    textAlign: 'center',
    fontSize: 20,
  },
});
