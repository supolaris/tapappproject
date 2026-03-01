import {memo} from 'react';
import {Text, TextProps} from 'react-native';
import {FontFamily} from '../../constants/FontFamily';

interface IProps extends TextProps {
  preset: {
    text: string;
    fontSize: number;
    color: string;
    fontWeight: 'bold' | 'medium' | 'regular' | 'semiBold';
  };
}

const CustomText = ({preset, style, ...styleProp}: IProps) => {
  return (
    <Text
      {...styleProp}
      style={[
        {
          fontSize: preset.fontSize,
          color: preset.color,
          fontFamily:
            preset.fontWeight.toLowerCase() === 'bold'
              ? FontFamily.bold
              : preset.fontWeight.toLowerCase() === 'medium'
              ? FontFamily.medium
              : preset.fontWeight.toLowerCase() === 'regular'
              ? FontFamily.regular
              : preset.fontWeight.toLowerCase() === 'semibold'
              ? FontFamily.semiBold
              : FontFamily.regular,
        },
        style,
      ]}>
      {preset.text}
    </Text>
  );
};

export default memo(CustomText);
