import { TapAppColors } from "@/src/constants/TapAppColors";
import { StyleSheet } from "react-native";

export const MatchPreferencesStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: TapAppColors.black,
  },
  container: {
    paddingBottom: 30,
  },

  innerContainer: {
    width: "90%",
    alignSelf: "center",
  },
  valuesContainer: {
    backgroundColor: TapAppColors.appBackground,
    borderRadius: 10,
  },
  touchableStyles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: "#46474b",
  },
  descriptionText: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10,
    color: TapAppColors.white,
  },
  iconTitleView: {
    flexDirection: "row",
    alignItems: "center",
  },
  sliderView: {
    width: "100%",
    alignItems: "center",
  },
  titleValueView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 15,
  },
  titleToogleView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  toogleView: {
    width: "25%",
  },
  titleText: {
    width: "75%",
    color: TapAppColors.white,
    fontSize: 15,
  },
  valueText: {
    width: "25%",
    color: TapAppColors.white,
    fontSize: 15,
    textAlign: "right",

    paddingRight: 10,
  },
  headingTextView: {
    width: "90%",
    paddingVertical: 20,
  },
  headingText: {
    width: "90%",
    fontSize: 15,
    color: TapAppColors.white,
  },

  categoryView: {
    backgroundColor: TapAppColors.appBackground,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  //
  renderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
