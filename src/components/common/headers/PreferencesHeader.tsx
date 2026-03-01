import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TapAppColors } from "../../../constants/TapAppColors";
import { activeOpacity } from "../../../utils/CommonFunctions";
import CustomText from "../CustomText";

interface IProps {
  title: string;
  onBackPressed?: () => void;
  onDonePressed: () => void;
}

const PreferencesHeader = (props: IProps) => {
  const goBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.detailsView}>
          <CustomText
            preset={{
              text: props.title,
              fontSize: 15,
              color: TapAppColors.white,
              fontWeight: "medium",
            }}
          />
        </View>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          style={styles.backTouchable}
          onPress={props.onBackPressed ? props.onBackPressed : goBack}
        >
          <Ionicons name="arrow-back" size={20} color={TapAppColors.white} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={activeOpacity}
          style={styles.textTouchable}
          onPress={props.onDonePressed}
        >
          <CustomText
            preset={{
              text: "Save",
              fontSize: 13,
              color: TapAppColors.primaryColor,
              fontWeight: "bold",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreferencesHeader;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: TapAppColors.black,
    justifyContent: "center",
    marginVertical: 5,
  },
  innerContainer: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  detailsView: {},
  backTouchable: {
    position: "absolute",
    left: 0,
  },
  textTouchable: {
    position: "absolute",
    right: 0,
  },
});
