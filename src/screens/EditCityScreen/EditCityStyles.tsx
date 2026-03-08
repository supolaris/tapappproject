import { borderRadius } from "@/src/constants/AppConstants";
import { TapAppColors } from "@/src/constants/TapAppColors";
import { StyleSheet } from "react-native";

export const editCityStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapAppColors.black,
  },
  innerContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  touchableView: {
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: borderRadius.medium,
    backgroundColor: TapAppColors.appBackground,
  },
});
