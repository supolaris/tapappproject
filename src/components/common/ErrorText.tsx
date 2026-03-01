import React, {memo} from 'react';
import {Text, StyleSheet} from 'react-native';
import {TapAppColors} from '../../constants/TapAppColors';

interface IAppMessageTextProps {
  text: string;
}

const ErrorText = (props: IAppMessageTextProps) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

export default memo(ErrorText);

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: TapAppColors.primaryColor,
  },
});
