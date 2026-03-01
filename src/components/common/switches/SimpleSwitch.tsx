import React, {memo} from 'react';
import {Switch} from 'react-native';
import {TapAppColors} from '../../../constants/TapAppColors';
interface ISimpleSwitchProps {
  isSwitchValue: boolean;
  onToggleSwitch: (isSwitchValue: boolean) => void;
}
const SimpleSwitch = (props: ISimpleSwitchProps) => {
  return (
    <Switch
      trackColor={{false: '#767577', true: '#81b0ff'}}
      thumbColor={props.isSwitchValue ? TapAppColors.primaryColor : '#f4f3f4'}
      onValueChange={() => props.onToggleSwitch(props.isSwitchValue)}
      value={props.isSwitchValue}
    />
  );
};
export default memo(SimpleSwitch);
