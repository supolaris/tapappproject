import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ICountriesData } from "../../../@types/CommonTypes";
import { TapAppColors } from "../../../constants/TapAppColors";

interface ISearchValuePopupProps {
  title: string;
  isSearchValuePopupVisible: boolean;
  popupCountriesData: ICountriesData[];
  searchValuePopupInputVal: string;
  onChangeSearchValuePopupText: (val: string) => void;
  onSearchPopupValuePressed: (item: ICountriesData) => void;
  onSearchValuePopupClose: () => void;
}

const SearchValuePopup = (props: ISearchValuePopupProps) => {
  // console.log('data=>>>>>', props.popupCountriesData);
  const renderItems = ({ item }: { item: ICountriesData }) => {
    return (
      <View style={styles.renderContainer}>
        <TouchableOpacity
          style={styles.renderCountryTouchable}
          onPress={() => props.onSearchPopupValuePressed(item)}
        >
          <Text style={styles.renderCountryText}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      transparent={true}
      visible={props.isSearchValuePopupVisible}
      onRequestClose={props.onSearchValuePopupClose}
    >
      <TouchableWithoutFeedback onPress={props.onSearchValuePopupClose}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.innerContainer}>
              <View style={styles.headerView}>
                <Text style={styles.headerTitleText}>{props.title}</Text>
                <TouchableOpacity
                  onPress={props.onSearchValuePopupClose}
                  style={styles.crossTouchable}
                >
                  <Entypo name="cross" size={25} color={TapAppColors.white} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputView}>
                {/* <Gradient borderColor=""> */}
                <TextInput
                  placeholderTextColor={TapAppColors.primaryGray}
                  style={styles.textInput}
                  value={props.searchValuePopupInputVal}
                  onChangeText={(val: string) =>
                    props.onChangeSearchValuePopupText(val)
                  }
                  placeholder="Search country by name"
                />
                {/* </Gradient> */}
              </View>
              <View style={styles.contentView}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={props.popupCountriesData}
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

export default SearchValuePopup;

const styles = StyleSheet.create({
  renderContainer: {
    borderBottomWidth: 0.5,
    borderColor: TapAppColors.primaryGray,
  },
  renderCountryTouchable: {
    paddingTop: 20,
    paddingBottom: 5,
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
    height: "70%",
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
    backgroundColor: TapAppColors.white,
  },
});
