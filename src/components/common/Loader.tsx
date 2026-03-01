import { lottieRegistry } from "@/src/constants/LottieRegistry";
import LottieView from "lottie-react-native";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { TapAppColors } from "../../constants/TapAppColors";

interface LoaderProps {
  isLoading: boolean;
}

const Loader = (props: LoaderProps) => {
  return (
    <Modal visible={props.isLoading} transparent={true}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <LottieView
            autoPlay
            loop
            style={styles.lottie}
            source={lottieRegistry.loader}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapAppColors.transparentBg,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: 200,
    height: 200,
  },
});
