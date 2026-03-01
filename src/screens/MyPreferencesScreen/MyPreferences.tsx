import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { IAllowedValues } from "../../@types/apiInterfaces/commonInterface";
import { IMyProfilePreferences } from "../../@types/apiInterfaces/MyProfilePreferencesInterface";
import { IHeightAgeVal } from "../../@types/CommonTypes";
import PrimaryButton from "../../components/common/buttons/PrimaryButton";
import CustomText from "../../components/common/CustomText";
import SimpleHeader from "../../components/common/headers/SimpleHeader";
import Loader from "../../components/common/Loader";
import ImageSelectionPopup from "../../components/common/popups/ImageSelectionPopup";
// import PickerPopup from "../../components/common/popups/PickerPopup";
import RenderImageSelection from "../../components/common/renderComponents/RenderImageSelection";
import RenderPreferences from "../../components/common/renderComponents/RenderPreferences";
import SimpleSwitch from "../../components/common/switches/SimpleSwitch";
import SecondaryTextInput from "../../components/common/textInputs/SecondaryTextInput";
import PreferencesTouchable from "../../components/common/touchables/PreferencesTouchable";
import TwoTabs from "../../components/common/TwoTabs";
import { AppMessages } from "../../constants/AppMessages";
import { TapAppColors } from "../../constants/TapAppColors";
import { ProfilePreviewScreen } from "../ProfilePreviewScreen/ProfilePreviewScreen";
// import { formatHeight } from "../../utils/CommonFunctions";

interface SettingsProps {
  heightAgeVal: IHeightAgeVal;
  isHeightSelecting: boolean;
  isLoading: boolean;
  newSelectedCategory: string;
  isImageSelectionPopup: boolean;
  allowedValues: IAllowedValues[];
  myProfilePreferences: IMyProfilePreferences;
  myImagesData: {
    image: string;
  }[];
  onSavePressed: () => void;
  onHeaderBackPressed: () => void;
  onEditLocationPressed: () => void;
  onImageSelectionPopupClose: () => void;
  onHandleSwitchVal: (val: number) => void;
  onCategoryPressed: (title: string) => void;
  onImageDeletePressed: (index: number) => void;
  onImageSelectionPressed: (index: number) => void;
  onChangeInputValues: (field: string, value: string) => void;
  onImageSelectionOptionPressed: (selectionValue: number) => void;
  onSubCategoryPressed: (
    title: string,
    subItem: string,
    categoryTitle: string,
  ) => void;

  //

  selectedTab: number;

  onTabOnePressed: () => void;
  onTabTwoPressed: () => void;

  pickerPopupOptions: string[];
  isHeightPopupVisible: boolean;
  onPickerChangeVal: (val: string) => void;
  onHeightSelectPressed: () => void;
  onGenderSelectPressed: () => void;
  onPickerPopupConfirmPressed: () => void;
}

const MyPreferences = (props: SettingsProps) => {
  const renderImageItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={styles.renderImageItemContainer}>
        <RenderImageSelection
          item={item}
          index={index}
          onImageSelectionPressed={props.onImageSelectionPressed}
          onImageDeletePressed={props.onImageDeletePressed}
        />
      </View>
    );
  };

  return (
    <>
      <SimpleHeader
        title="My Preferences"
        showBackIcon={true}
        isRightVisible={props.selectedTab !== 2}
        onHeaderRightPressed={props.onSavePressed}
        onHeaderBackPressed={props.onHeaderBackPressed}
      />
      <TwoTabs
        tabOneText="Edit"
        tabTwoText="Preview"
        selectedTab={props.selectedTab}
        onTabOnePressed={props.onTabOnePressed}
        onTabTwoPressed={props.onTabTwoPressed}
      />

      {/* <PickerPopup
        title={
          props.isHeightSelecting
            ? AppMessages.heightSelect
            : AppMessages.genderSelect
        }
        selectedPickerVal={
          props.isHeightSelecting
            ? formatHeight(
                props.heightAgeVal?.HeightFeet,
                props.heightAgeVal?.HeightInches,
              )
            : props.heightAgeVal?.Gender
        }
        pickerOptions={props.pickerPopupOptions}
        isHeightPopupVisible={props.isHeightPopupVisible}
        onPickerChangeVal={props.onPickerChangeVal}
        onPickerPopupConfirmPressed={props.onPickerPopupConfirmPressed}
      /> */}

      {props.selectedTab === 1 ? (
        <View style={styles.container}>
          <Loader isLoading={props.isLoading} />
          <ImageSelectionPopup
            isImageSelectionPopup={props.isImageSelectionPopup}
            onImageSelectionPopupClose={props.onImageSelectionPopupClose}
            onImageSelectionOptionPressed={props.onImageSelectionOptionPressed}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.contentContainer}
          >
            <View style={styles.imagesView}>
              <CustomText
                preset={{
                  fontSize: 14,
                  fontWeight: "regular",
                  text: "Add your images",
                  color: TapAppColors.white,
                }}
                style={{
                  marginBottom: 10,
                }}
              />
              <FlatList
                numColumns={3}
                data={props.myImagesData}
                renderItem={renderImageItem}
                keyExtractor={(index) => index.toString()}
              />
            </View>

            {/* Health */}
            <Text style={styles.preferenceTitleText}>Photos Options</Text>
            <View style={styles.sectionListView}>
              <View style={styles.titleToogleView}>
                <Text style={styles.headerTitle}>Smart Photos</Text>
                <SimpleSwitch
                  isSwitchValue={
                    props.myProfilePreferences?.TapPrivacyShowSmartPhotos
                  }
                  onToggleSwitch={() => props.onHandleSwitchVal(4)}
                />
              </View>
              <Text style={styles.descriptionText}>
                {AppMessages.smartPhotosDescription}
              </Text>
            </View>

            {/* Professional */}
            <Text
              style={[
                styles.preferenceTitleText,
                {
                  marginTop: 15,
                },
              ]}
            >
              Professional
            </Text>
            <View style={styles.inputsView}>
              <SecondaryTextInput
                label="Job Title"
                value={props.myProfilePreferences?.TapProfessionalJobTitle}
                borderColor={TapAppColors.black}
                onChangeText={(val: string) =>
                  props.onChangeInputValues("TapProfessionalJobTitle", val)
                }
              />

              <SecondaryTextInput
                label="Company"
                borderColor={TapAppColors.black}
                value={props.myProfilePreferences?.TapProfessionalCompany}
                onChangeText={(val: string) =>
                  props.onChangeInputValues("TapProfessionalCompany", val)
                }
              />

              <SecondaryTextInput
                label="School"
                borderColor={TapAppColors.black}
                value={props.myProfilePreferences?.TapProfessionalSchool}
                onChangeText={(val: string) =>
                  props.onChangeInputValues("TapProfessionalSchool", val)
                }
              />
            </View>

            {/* Entertainment */}
            <Text style={styles.preferenceTitleText}>Entertainment</Text>
            <View style={styles.inputsView}>
              <SecondaryTextInput
                label="Favourite Song"
                borderColor={TapAppColors.black}
                value={
                  props.myProfilePreferences
                    ?.TapMusicAndEntertainmentSpotifyAnthem
                }
                onChangeText={(val: string) =>
                  props.onChangeInputValues(
                    "TapMusicAndEntertainmentSpotifyAnthem",
                    val,
                  )
                }
              />

              <SecondaryTextInput
                label="Top Artists"
                borderColor={TapAppColors.black}
                value={
                  props.myProfilePreferences
                    ?.TapMusicAndEntertainmentTopSpotifyArtists
                }
                onChangeText={(val: string) =>
                  props.onChangeInputValues(
                    "TapMusicAndEntertainmentTopSpotifyArtists",
                    val,
                  )
                }
              />
            </View>

            {/* About */}
            <Text style={styles.preferenceTitleText}>About</Text>
            <View style={styles.inputsView}>
              <SecondaryTextInput
                height={100}
                label="My Bio"
                isMultiLine={true}
                numberOfLines={10}
                value={props.myProfilePreferences?.TapPersonalDetailsAboutMe}
                borderColor={TapAppColors.black}
                onChangeText={(val: string) =>
                  props.onChangeInputValues("TapPersonalDetailsAboutMe", val)
                }
              />
              <Text style={styles.charCountText}>{`${
                500 -
                props.myProfilePreferences?.TapPersonalDetailsAboutMe?.length
              }`}</Text>
            </View>

            <Text style={styles.preferenceTitleText}>Location</Text>
            <View style={styles.sectionListView}>
              <PreferencesTouchable
                title="Edit City"
                iconName="location-dot"
                iconFamily={FontAwesome6}
                onPreferencePressed={props.onEditLocationPressed}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {props.myProfilePreferences.CurLocation?.TapProfileCityName && (
                  <Text numberOfLines={2} style={styles.descriptionText}>
                    {`City: ${props.myProfilePreferences.CurLocation?.TapProfileCityName}. `}

                    {props.myProfilePreferences.CurLocation
                      ?.TapProfileAreaName && (
                      <Text style={styles.descriptionText}>
                        {`State: ${props.myProfilePreferences.CurLocation?.TapProfileAreaName}. `}
                      </Text>
                    )}
                    {props.myProfilePreferences.CurLocation
                      ?.TapProfileCountryName && (
                      <Text style={styles.descriptionText}>
                        {`Country: ${props.myProfilePreferences.CurLocation?.TapProfileCountryName}`}
                      </Text>
                    )}
                  </Text>
                )}
              </View>
            </View>

            {/* height */}
            <Text style={styles.preferenceTitleText}>Height</Text>
            <View style={styles.sectionListView}>
              <PreferencesTouchable
                title="Select height"
                iconFamily={FontAwesome6}
                onPreferencePressed={props.onHeightSelectPressed}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={styles.descriptionText}
                >{`${props.heightAgeVal?.HeightFeet} Feet ${props.heightAgeVal?.HeightInches} Inches`}</Text>
              </View>
            </View>

            {/* Gender */}
            <Text style={styles.preferenceTitleText}>Gender</Text>
            <View style={styles.sectionListView}>
              <PreferencesTouchable
                title="Select Gender"
                iconFamily={FontAwesome6}
                onPreferencePressed={props.onGenderSelectPressed}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={styles.descriptionText}
                >{`${props.heightAgeVal?.Gender}`}</Text>
              </View>
            </View>

            {/* Privacy */}
            <Text style={styles.preferenceTitleText}>Privacy</Text>
            <View style={styles.sectionListView}>
              <View style={styles.titleToogleView}>
                <Text style={styles.headerTitle}>Show Age</Text>
                <SimpleSwitch
                  isSwitchValue={props.myProfilePreferences?.TapPrivacyShowAge}
                  onToggleSwitch={() => props.onHandleSwitchVal(1)}
                />
              </View>
              <View style={styles.titleToogleView}>
                <Text style={styles.headerTitle}>Show Distance</Text>
                <SimpleSwitch
                  isSwitchValue={
                    props.myProfilePreferences?.TapPrivacyShowDistance
                  }
                  onToggleSwitch={() => props.onHandleSwitchVal(2)}
                />
              </View>
              <View style={styles.titleToogleView}>
                <Text style={styles.headerTitle}>Show Current Location</Text>
                <SimpleSwitch
                  isSwitchValue={
                    props.myProfilePreferences?.TapPrivacyShowCurrentLocation
                  }
                  onToggleSwitch={() => props.onHandleSwitchVal(3)}
                />
              </View>
              <View style={styles.titleToogleView}>
                <Text style={styles.headerTitle}>Show Gender</Text>
                <SimpleSwitch
                  isSwitchValue={
                    props.myProfilePreferences?.TapPrivacyShowGender
                  }
                  onToggleSwitch={() => props.onHandleSwitchVal(5)}
                />
              </View>
            </View>

            <View>
              <RenderPreferences
                allowedValues={props.allowedValues?.filter(
                  (item) => item.title !== "Health And Wellness",
                )}
                preferences={props.myProfilePreferences}
                newSelectedCategory={props.newSelectedCategory}
                onCategoryPressed={props.onCategoryPressed}
                onSubCategoryPressed={props.onSubCategoryPressed}
              />
            </View>

            <View style={styles.saveButtonView}>
              <PrimaryButton text="Save" onPress={props.onSavePressed} />
            </View>
          </ScrollView>
        </View>
      ) : (
        <ProfilePreviewScreen />
      )}
    </>
  );
};

export default MyPreferences;

const styles = StyleSheet.create({
  renderImageItemContainer: {
    width: "32.5%",
  },

  container: {
    flex: 1,
    backgroundColor: TapAppColors.black,
  },
  contentContainer: {
    width: "90%",
    alignSelf: "center",
  },
  imagesView: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  logoView: {
    margin: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: TapAppColors.black,
  },
  featureCardView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  superLikesView: {
    borderRadius: 10,
    marginHorizontal: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    justifyContent: "center",
    backgroundColor: TapAppColors.black,
  },
  featureCardIconView: {
    alignItems: "center",
  },
  featureCardIcon: {
    padding: 10,
    marginBottom: 5,
    borderWidth: 0.5,
    borderRadius: 100,
    borderColor: TapAppColors.white,
  },
  featureCardText: {
    fontSize: 18,
    textAlign: "center",
    color: TapAppColors.white,
  },
  accountSettingView: {},
  preminumDescriptionView: {},
  settingsOptionView: {},
  headingView: {
    paddingTop: 20,
    paddingBottom: 10,
  },

  inputsView: {
    paddingTop: 10,
    borderRadius: 10,
    marginBottom: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: TapAppColors.appBackground,
  },
  charCountText: {
    fontSize: 12,
    textAlign: "right",
    color: TapAppColors.white,
  },
  sectionListView: {
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: TapAppColors.appBackground,
  },
  preferenceTitleText: {
    fontSize: 16,
    marginVertical: 5,
    color: TapAppColors.white,
  },
  titleToogleView: {
    margin: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  //section list
  headerContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 14,
    color: TapAppColors.white,
  },
  descriptionText: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10,
    color: TapAppColors.white,
  },
  headerIcon: {
    fontSize: 18,
    color: TapAppColors.white,
  },
  itemOptionText: {
    fontSize: 14,
    paddingLeft: 10,
    color: TapAppColors.white,
  },
  itemContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 3,
    backgroundColor: TapAppColors.black,
  },
  saveButtonView: {
    marginTop: 15,
    marginBottom: 25,
  },
  selectedItemContainer: {
    backgroundColor: TapAppColors.white,
  },
  selectedItemText: {
    fontSize: 14,
    color: TapAppColors.black,
  },

  //
  categoryView: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: TapAppColors.appBackground,
  },
});
