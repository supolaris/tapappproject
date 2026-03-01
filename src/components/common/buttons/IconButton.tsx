import React from 'react';
import CustomText from '../CustomText';
import {StyleSheet} from 'react-native';
import {View, TouchableOpacity} from 'react-native';
import {TapAppColors} from '../../../constants/TapAppColors';
import {activeOpacity} from '../../../utils/CommonFunctions';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

interface IProps {
  text: string;
  onGetLocationPressed: () => void;
}

const IconButton = (props: IProps) => {
  return (
    <TouchableOpacity
      onPress={props.onGetLocationPressed}
      activeOpacity={activeOpacity}
      style={styles.container}>
      <View style={styles.iconView}>
        <FontAwesome6
          size={20}
          name="location-crosshairs"
          color={TapAppColors.primaryColor}
        />
      </View>

      <View style={styles.textView}>
        <CustomText
          preset={{
            fontSize: 20,
            text: props.text,
            fontWeight: 'semiBold',
            color: TapAppColors.white,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  iconView: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: TapAppColors.primayGray,
  },
  textView: {
    flex: 1,
    marginLeft: 10,
  },
});
