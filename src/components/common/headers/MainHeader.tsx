import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TapAppColors } from "../../../constants/TapAppColors";
import CustomText from "../CustomText";

interface IMainHeaderProps {
  showBackIcon: boolean;
  showSettingsIcon?: boolean;
  title: string;
  onHeaderBackPressed?: () => void;
  onHeaderSettingsPressed?: () => void;
  onHeaderHeartPressed?: () => void;
}

const MainHeader = (props: IMainHeaderProps) => {
  const goBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={
            props.onHeaderBackPressed ? props.onHeaderBackPressed : goBack
          }
        >
          {props.showBackIcon && (
            <Ionicons name="arrow-back" size={20} color={TapAppColors.white} />
          )}
        </TouchableOpacity>
        <CustomText
          preset={{
            text: `${props.title}`,
            color: TapAppColors.white,
            fontSize: 15,
            fontWeight: "semiBold",
          }}
          style={{
            textAlign: "center",
          }}
        />
        <View style={styles.rightIcons}>
          <TouchableOpacity
            style={styles.heartIcon}
            onPress={props.onHeaderHeartPressed}
          >
            {props.showSettingsIcon && (
              <AntDesign name="heart" size={20} color={TapAppColors.white} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsIcon}
            onPress={props.onHeaderSettingsPressed}
          >
            {props.showSettingsIcon && (
              <Feather name="settings" size={20} color={TapAppColors.white} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    backgroundColor: TapAppColors.black,
    justifyContent: "center",
  },
  innerContainer: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  leftIcon: {
    // width: '10%',
    position: "absolute",
    left: 0,
  },
  rightIcons: {
    right: 0,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
  heartIcon: {},
  settingsIcon: {
    marginLeft: 10,
  },
});
