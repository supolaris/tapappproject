import React, {memo} from 'react';
import Gradient from '../Gradient';
import CustomText from '../CustomText';
import {View, TextInput, StyleSheet} from 'react-native';
import {TapAppColors} from '../../../constants/TapAppColors';
import {borderRadius} from '../../../utils/CommonFunctions';

interface SecondaryTextInputProps {
  label: string;
  value: string;
  height?: number;
  keyboardType?: any;
  borderColor: string;
  isMultiLine?: boolean;
  numberOfLines?: number;
  onChangeText: (val: string) => void;
  onBlur?: (e: any) => void;
}

const SecondaryTextInput = (props: SecondaryTextInputProps) => {
  return (
    <View style={styles.container}>
      <CustomText
        preset={{
          text: props.label,
          color: TapAppColors.white,
          fontSize: 14,
          fontWeight: 'regular',
        }}
        style={{
          marginBottom: 5,
        }}
      />
      <TextInput
        value={props.value}
        style={[
          styles.textInput,
          {
            height: props.height ? props.height : 40,
          },
        ]}
        multiline={props.isMultiLine}
        keyboardType={props.keyboardType}
        numberOfLines={props.numberOfLines}
        onChangeText={(val: string) => props.onChangeText(val)}
        onBlur={props.onBlur}
        textAlignVertical={props.isMultiLine ? 'top' : 'center'}
      />
    </View>
  );
};

export default memo(SecondaryTextInput);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  textInput: {
    color: TapAppColors.black,
    borderRadius: borderRadius,
    backgroundColor: TapAppColors.white,
  },
});
