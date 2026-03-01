import CustomText from '../CustomText';
import {Picker} from 'react-native-wheel-pick';
import {View, StyleSheet, Modal} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {borderRadius} from '../../../utils/CommonFunctions';
import CustomTouchable from '../touchables/CustomTouchable';
import {TapAppColors} from '../../../constants/TapAppColors';

interface IHeightPickerProps {
  title: string;
  selectedPickerVal: string;
  pickerOptions: string[];
  isHeightPopupVisible: boolean;
  onPickerChangeVal: (val: string) => void;
  onPickerPopupConfirmPressed: () => void;
}

const PickerPopup = (props: IHeightPickerProps) => {
  return (
    <Modal transparent={true} visible={props.isHeightPopupVisible}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <CustomText
            preset={{
              fontSize: 16,
              text: props.title,
              fontWeight: 'bold',
              color: TapAppColors.black,
            }}
            style={{textAlign: 'center'}}
          />

          <Picker
            style={styles.picker}
            pickerData={props.pickerOptions}
            selectedValue={props.selectedPickerVal}
            onValueChange={(value: string) => props.onPickerChangeVal(value)}
          />

          <CustomTouchable
            preset={{
              text: 'Confirm',
              fontSize: 14,
              fontWeight: 'bold',
              variant: 'primary',
            }}
            style={{
              marginTop: 10,
            }}
            onPress={props.onPickerPopupConfirmPressed}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(PickerPopup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapAppColors.transparentBg,
    justifyContent: 'center',
  },
  innerContainer: {
    padding: 15,
    width: '90%',
    alignSelf: 'center',
    borderRadius: borderRadius,
    backgroundColor: TapAppColors.white,
  },
  picker: {
    marginTop: 10,
    backgroundColor: 'transparent',
  },
});
