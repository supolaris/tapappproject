import React from "react";
import CustomText from "../CustomText";

import Ionicons from "@expo/vector-icons/Ionicons";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TapAppColors } from "../../../constants/TapAppColors";

interface IMainHeaderProps {
  title: string;
  showBackIcon: boolean;
  isRightVisible?: boolean;
  onHeaderBackPressed?: () => void;
  onHeaderRightPressed?: () => void;
}

const SimpleHeader = (props: IMainHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={props.onHeaderBackPressed}
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

        {props.isRightVisible && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={props.onHeaderRightPressed}
          >
            <CustomText
              preset={{
                text: `Save`,
                fontSize: 15,
                fontWeight: "semiBold",
                color: TapAppColors.primaryColor,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SimpleHeader;

const styles = StyleSheet.create({
  container: {
    height: "15%",
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
  rightIcon: {
    right: 0,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
});
