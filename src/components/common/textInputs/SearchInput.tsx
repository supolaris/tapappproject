import React from 'react';
import {StyleSheet} from 'react-native';
import {View, TextInput} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {TapAppColors} from '../../../constants/TapAppColors';

interface IProps {
  searchInputVal: string;
  placeholderText: string;
  placeholderTextColor?: string;
  onSearchChangeText: (val: string) => void;
}

const SearchInput = (props: IProps) => {
  return (
    <View style={styles.container}>
      <Feather
        size={20}
        name="search"
        style={styles.icon}
        color={TapAppColors.white}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          value={props.searchInputVal}
          placeholder={props.placeholderText}
          placeholderTextColor={
            props.placeholderTextColor
              ? props.placeholderTextColor
              : TapAppColors.placeholderText
          }
          onChangeText={props.onSearchChangeText}
        />
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    backgroundColor: TapAppColors.grayBg,
  },
  icon: {},
  inputView: {
    flex: 1,
    marginLeft: 5,
  },
  input: {
    color: TapAppColors.white,
  },
});
