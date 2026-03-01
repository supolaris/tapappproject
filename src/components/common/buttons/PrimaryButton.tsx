import React from 'react';
import {TapAppColors} from '../../../constants/TapAppColors';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

interface PrimaryButtonProps {
  text: string;
  onPress: () => void;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: TapAppColors.primaryColor,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: TapAppColors.white,
  },
});
