import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { TapAppColors } from "../../../constants/TapAppColors";

interface IProps {
  swipeDirection: string;
  isHomeSwipePopupVisible: boolean;
}

const HomeSwipePopup = (props: IProps) => {
  return (
    <Modal
      transparent={true}
      visible={props.isHomeSwipePopupVisible}
      animationType="slide"
    >
      <View style={styles.container}>
        {props.swipeDirection === "left" ? (
          <Fontisto name="like" size={20} color={TapAppColors.white} />
        ) : props.swipeDirection === "right" ? (
          <Fontisto name="dislike" size={20} color={TapAppColors.white} />
        ) : (
          <AntDesign name="heart" size={20} color={TapAppColors.white} />
        )}
      </View>
    </Modal>
  );
};

export default HomeSwipePopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
