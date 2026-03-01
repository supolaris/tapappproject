import React, {memo} from 'react';
import {TapAppColors} from '../../../constants/TapAppColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface IPreferencesTouchableProps {
  title: string;
  iconFamily: any;
  iconName?: string;
  onPreferencePressed: () => void;
}

const PreferencesTouchable = (props: IPreferencesTouchableProps) => {
  return (
    <TouchableOpacity
      style={styles.touchableStyles}
      onPress={props.onPreferencePressed}>
      <View style={styles.iconTitleView}>
        {props.iconName && (
          <View style={styles.iconView}>
            <props.iconFamily
              style={styles.icon}
              name={props.iconName}
              size={15}
              color="white"
            />
          </View>
        )}
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{props.title}</Text>
        </View>
      </View>

      <View style={styles.dropdownIconView}>
        <MaterialIcons name="keyboard-arrow-down" color="white" size={20} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(PreferencesTouchable);

const styles = StyleSheet.create({
  touchableStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: '#46474b',
    justifyContent: 'space-between',
  },
  iconTitleView: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    width: '10%',
  },
  titleView: {
    width: '90%',
  },
  titleText: {
    width: '90%',
    color: TapAppColors.white,
    fontSize: 13,
  },
  icon: {
    marginRight: 15,
  },
  dropdownIconView: {
    width: '10%',
    alignItems: 'center',
  },
});
