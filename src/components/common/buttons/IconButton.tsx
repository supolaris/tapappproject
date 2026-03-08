import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { TapAppColors } from "../../../constants/TapAppColors";
import { activeOpacity } from "../../../utils/CommonFunctions";
import CustomText from "../CustomText";

interface IProps {
  text: string;
  onGetLocationPressed: () => void;
}

const IconButton = (props: IProps) => {
  return (
    <TouchableOpacity
      onPress={props.onGetLocationPressed}
      activeOpacity={activeOpacity}
      style={styles.container}
    >
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
            fontWeight: "semiBold",
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  iconView: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: TapAppColors.primaryGray,
  },
  textView: {
    flex: 1,
    marginLeft: 10,
  },
});
