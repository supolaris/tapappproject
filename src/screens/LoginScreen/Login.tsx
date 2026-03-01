import LoginLottie from "@/src/components/common/lottie/LoginLottie";
import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../../components/common/CustomText";
import CustomTouchable from "../../components/common/touchables/CustomTouchable";
import { AppMessages } from "../../constants/AppMessages";
import { TapAppColors } from "../../constants/TapAppColors";

interface LoginProps {
  isLoading: boolean;
  onGoogleLoginPressed: () => void;
}

const Login = (props: LoginProps) => {
  return (
    <View style={styles.container}>
      {/* <Loader isLoading={props.isLoading} /> */}
      <View style={styles.innerContainer}>
        <LoginLottie />
        <View style={styles.titleButtonView}>
          <CustomText
            preset={{
              text: AppMessages.appName,
              color: TapAppColors.white,
              fontSize: 20,
              fontWeight: "semiBold",
            }}
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          />
          <CustomTouchable
            preset={{
              text: AppMessages.signinMessages,
              variant: "primary",
              textColor: TapAppColors.white,
              fontSize: 15,
              fontWeight: "medium",
            }}
            onPress={props.onGoogleLoginPressed}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapAppColors.appBackground,
  },
  innerContainer: {
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: 150,
  },
  lottieView: {
    alignItems: "center",
    marginBottom: 10,
  },
  titleButtonView: {
    width: "100%",
  },
});
