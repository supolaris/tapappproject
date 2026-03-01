import FontAwesome from "@expo/vector-icons/FontAwesome";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IAllowedValues } from "../../@types/apiInterfaces/commonInterface";
import { IMatchPreferences } from "../../@types/apiInterfaces/MatchPreferencesInterface";
import PreferencesHeader from "../../components/common/headers/PreferencesHeader";
import Loader from "../../components/common/Loader";
import AlertPopup from "../../components/common/popups/AlertPopup";
import RenderPreferences from "../../components/common/renderComponents/RenderPreferences";
import SimpleSwitch from "../../components/common/switches/SimpleSwitch";
import CustomTouchable from "../../components/common/touchables/CustomTouchable";
import PreferencesTouchable from "../../components/common/touchables/PreferencesTouchable";
import { AppMessages } from "../../constants/AppMessages";
import { TapAppColors } from "../../constants/TapAppColors";

const screenWidth = Dimensions.get("window").width;
const sliderWidth = screenWidth * 0.82;

interface IMatchPreferencesProps {
  isLoading: boolean;
  newSelectedCategory: string;
  isAlertPopupVisible: boolean;
  allowedValues: IAllowedValues[];
  matchPreferences: IMatchPreferences;
  onSavePressed: () => void;
  onLocationPressed: () => void;
  onHandleSwitchVal: (val: number) => void;
  onAlertPopupCancel: () => void;
  onAlertPopupConfirm: () => void;
  onHeaderBackPressed: () => void;
  onCategoryPressed: (title: string) => void;
  onSliderValueChange: (field: number, val: number[]) => void;
  onSubCategoryPressed: (
    title: string,
    subItem: string,
    categoryTitle: string,
  ) => void;
}

const MatchPreferences = (props: IMatchPreferencesProps) => {
  const CustomMarker = () => {
    return (
      <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            backgroundColor: TapAppColors.primaryColor,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.mainContainer}>
        <AlertPopup
          confirmText="Save"
          cancelText={"Cancel"}
          messageText={AppMessages.confirmChanges}
          isAlertPopupVisible={props.isAlertPopupVisible}
          onAlertPopupCancel={props.onAlertPopupCancel}
          onAlertPopupConfirm={props.onAlertPopupConfirm}
        />
        <PreferencesHeader
          title="Match Preferences"
          onDonePressed={props.onSavePressed}
        />

        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Loader isLoading={props.isLoading} />
            <View style={styles.innerContainer}>
              <View>
                <RenderPreferences
                  allowedValues={props.allowedValues?.filter(
                    (item) => item.title !== "Health And Wellness",
                  )}
                  preferences={props.matchPreferences}
                  newSelectedCategory={props.newSelectedCategory}
                  onCategoryPressed={props.onCategoryPressed}
                  onSubCategoryPressed={props.onSubCategoryPressed}
                />
              </View>

              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>Discovery</Text>
              </View>
              <View style={styles.valuesContainer}>
                <PreferencesTouchable
                  iconFamily={FontAwesome}
                  iconName="language"
                  title="Location"
                  onPreferencePressed={props.onLocationPressed}
                />

                {/* {props.matchPreferences?.TapDiscoveryLocation && (
                <Text numberOfLines={2} style={styles.titleText}>
                  {`${props.matchPreferences?.TapDiscoveryLocation}`}
                </Text>
              )} */}

                {props.matchPreferences?.CurLocation?.TapProfileCityName && (
                  <Text numberOfLines={2} style={styles.descriptionText}>
                    {`City: ${props.matchPreferences?.CurLocation?.TapProfileCityName}. `}

                    {props.matchPreferences?.CurLocation
                      ?.TapProfileAreaName && (
                      <Text style={styles.descriptionText}>
                        {`State: ${props.matchPreferences?.CurLocation?.TapProfileAreaName}. `}
                      </Text>
                    )}
                    {props.matchPreferences?.CurLocation
                      ?.TapProfileCountryName && (
                      <Text style={styles.descriptionText}>
                        {`Country: ${props.matchPreferences?.CurLocation?.TapProfileCountryName}`}
                      </Text>
                    )}
                  </Text>
                )}

                {/* bio  */}
                <View style={styles.valuesContainer}>
                  <View style={styles.touchableStyles}>
                    <Text numberOfLines={1} style={styles.titleText}>
                      Has a bio
                    </Text>

                    <View style={styles.toogleView}>
                      <SimpleSwitch
                        isSwitchValue={
                          props.matchPreferences?.TapDiscoveryHasABio
                        }
                        onToggleSwitch={() => props.onHandleSwitchVal(1)}
                      />
                    </View>
                  </View>
                </View>

                {/* max Distance */}
                <View
                  style={[
                    styles.touchableStyles,
                    {
                      flexDirection: "column",
                      alignItems: "flex-start",
                    },
                  ]}
                >
                  <View style={styles.titleValueView}>
                    <Text style={[styles.titleText]}>Maximum Distance</Text>
                    <Text numberOfLines={1} style={styles.valueText}>
                      {props.matchPreferences?.TapDiscoveryMaximumDistance +
                        " miles"}
                    </Text>
                  </View>
                  <View style={styles.sliderView}>
                    <MultiSlider
                      values={[
                        props.matchPreferences?.TapDiscoveryMaximumDistance,
                      ]}
                      min={0}
                      max={100}
                      step={1}
                      sliderLength={sliderWidth}
                      customMarker={CustomMarker}
                      onValuesChange={(val) =>
                        props.onSliderValueChange(1, val)
                      }
                    />
                  </View>
                </View>

                {/* max photos */}
                <View
                  style={[
                    styles.touchableStyles,
                    {
                      flexDirection: "column",
                      alignItems: "flex-start",
                    },
                  ]}
                >
                  <View style={styles.titleValueView}>
                    <Text style={[styles.titleText]}>
                      Maximum number of photos
                    </Text>
                    <Text numberOfLines={1} style={styles.valueText}>
                      {props.matchPreferences?.TapDiscoveryMaxNumberOfPhotos ===
                      0
                        ? "0"
                        : props.matchPreferences?.TapDiscoveryMaxNumberOfPhotos}
                    </Text>
                  </View>

                  <View style={styles.sliderView}>
                    <MultiSlider
                      values={[
                        props.matchPreferences?.TapDiscoveryMaxNumberOfPhotos,
                      ]}
                      min={0}
                      max={9}
                      step={1}
                      sliderLength={sliderWidth}
                      customMarker={CustomMarker}
                      onValuesChange={(val) =>
                        props.onSliderValueChange(2, val)
                      }
                    />
                  </View>
                </View>

                {/* Age range */}
                <View
                  style={[
                    styles.touchableStyles,
                    {
                      flexDirection: "column",
                      alignItems: "flex-start",
                    },
                  ]}
                >
                  <View style={styles.titleValueView}>
                    <Text numberOfLines={1} style={styles.titleText}>
                      Age Range
                    </Text>
                    <Text numberOfLines={1} style={styles.valueText}>
                      {props.matchPreferences?.TapDiscoveryAgeRangeMinimum}-
                      {props.matchPreferences?.TapDiscoveryAgeRangeMaximum}
                    </Text>
                  </View>
                  <View style={styles.sliderView}>
                    <MultiSlider
                      values={[
                        props.matchPreferences?.TapDiscoveryAgeRangeMinimum,
                        props.matchPreferences?.TapDiscoveryAgeRangeMaximum,
                      ]}
                      sliderLength={sliderWidth}
                      min={18}
                      max={70}
                      step={1}
                      customMarker={CustomMarker}
                      onValuesChange={(val) =>
                        props.onSliderValueChange(3, val)
                      }
                    />
                  </View>
                </View>
              </View>
              <CustomTouchable
                preset={{
                  text: "Save",
                  variant: "primary",
                  textColor: TapAppColors.white,
                  fontSize: 15,
                  fontWeight: "medium",
                }}
                style={{
                  marginTop: 30,
                }}
                onPress={props.onSavePressed}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MatchPreferences;

const styles = StyleSheet.create({
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
