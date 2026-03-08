import React, { memo } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Entypo from "react-native-vector-icons/Entypo";
import { ICountriesData } from "../../../@types/CommonTypes";
import { TapAppColors } from "../../../constants/TapAppColors";
import { getLanguageName } from "../../../utils/CommonFunctions";
import CustomText from "../CustomText";

interface ILanguagePopupProps {
  title: string;
  isLanguagePopupVisible: boolean;
  popupLanguagesData: any[];
  languageSearchInput: string;
  selectedLanguages: any;
  onLangaugeSearchChangeText: (val: string) => void;
  onLanguagePopupItemSelect: (item: ICountriesData) => void;
  onLanguagePopupClose: () => void;
}

const LanguagePopup = (props: ILanguagePopupProps) => {
  const renderItems = ({ item }: { item: ICountriesData }) => {
    return (
      <View
        style={[
          styles.renderContainer,
          {
            backgroundColor: props.selectedLanguages.includes(item.name)
              ? TapAppColors.white
              : TapAppColors.black,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.renderCountryTouchable}
          onPress={() => props.onLanguagePopupItemSelect(item)}
        >
          <CustomText
            preset={{
              text: getLanguageName(item.name),
              color: props.selectedLanguages.includes(item.name)
                ? TapAppColors.black
                : TapAppColors.white,
              fontSize: 14,
              fontWeight: "regular",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      transparent={true}
      visible={props.isLanguagePopupVisible}
      onRequestClose={props.onLanguagePopupClose}
    >
      <TouchableWithoutFeedback onPress={props.onLanguagePopupClose}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.innerContainer}>
              <View style={styles.headerView}>
                <Text style={styles.headerTitleText}>{props.title}</Text>
                <TouchableOpacity
                  onPress={props.onLanguagePopupClose}
                  style={styles.crossTouchable}
                >
                  <Entypo name="cross" size={25} color={TapAppColors.white} />
                </TouchableOpacity>
              </View>
              <View style={styles.contentView}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={props.popupLanguagesData}
                  renderItem={renderItems}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default memo(LanguagePopup);

const styles = StyleSheet.create({
  renderContainer: {
    borderBottomWidth: 0.5,
    borderColor: TapAppColors.primaryGray,
    borderRadius: 10,
    paddingLeft: 5,
  },
  renderCountryTouchable: {
    paddingVertical: 10,
    justifyContent: "center",
  },
  renderCountryText: {
    paddingLeft: 5,
    fontSize: 15,
    color: TapAppColors.white,
  },
  container: {
    flex: 1,
    backgroundColor: TapAppColors.transparentBg,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  innerContainer: {
    height: hp(70),
    width: "100%",
    backgroundColor: TapAppColors.black,
    borderRadius: 10,
  },
  headerView: {
    paddingVertical: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: TapAppColors.primaryGray,
    justifyContent: "center",
  },
  headerTitleText: {
    fontSize: 15,
    color: TapAppColors.white,
  },
  crossTouchable: {
    position: "absolute",
    left: 20,
  },
  contentView: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 30,
  },
  inputView: {
    width: "90%",
    alignSelf: "center",
    marginTop: 30,
  },
  textInput: {
    height: 40,
    color: TapAppColors.black,
  },
});
