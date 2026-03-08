import React, { memo } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { TapAppColors } from "../../../constants/TapAppColors";

interface IMatchPreferencePopupProps {
  isModalVisible: boolean;
  parentCategory: string;
  popupTitle: string;
  popupItemsData: any;
  selectedPreferences: any;
  selectedPersonalDetails: any;
  selectedPersonality: any;
  onPreferenceSelect: (
    parentCategory: string,
    catagory: string,
    item: any,
  ) => void;
  onRequestClose: () => void;
}

const MatchPreferencePopup = (props: IMatchPreferencePopupProps) => {
  return (
    <Modal
      transparent={true}
      visible={props.isModalVisible}
      onRequestClose={props.onRequestClose}
    >
      <TouchableWithoutFeedback onPress={props.onRequestClose}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.innerContainer}>
              <View style={styles.headerView}>
                <Text style={styles.headerTitleText}>{props.popupTitle}</Text>
                <TouchableOpacity
                  onPress={props.onRequestClose}
                  style={styles.crossTouchable}
                >
                  <Entypo name="cross" size={25} color={TapAppColors.white} />
                </TouchableOpacity>
              </View>

              <View style={styles.contentView}>
                <View style={styles.itemsView}>
                  {props.popupItemsData?.length > 0 &&
                    props.popupItemsData?.map((item: string, index: number) => {
                      const preference =
                        props.parentCategory === "TapLifestyle"
                          ? props.selectedPreferences
                          : props.parentCategory === "TapPersonalDetails"
                            ? props.selectedPersonalDetails
                            : props.selectedPersonality;
                      const isSelected =
                        preference[props.popupTitle]?.includes(item);
                      return (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.itemTouchable,
                            isSelected && {
                              borderColor: "red",
                              borderWidth: 1,
                            },
                          ]}
                          onPress={() =>
                            props.onPreferenceSelect(
                              props.parentCategory,
                              props.popupTitle,
                              item,
                            )
                          }
                        >
                          <Text style={styles.itemTouchableText}>{item}</Text>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default memo(MatchPreferencePopup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapAppColors.transparentBg,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  innerContainer: {
    height: 400,
    width: "100%",
    backgroundColor: TapAppColors.black,
    borderRadius: 10,
  },
  headerView: {
    paddingVertical: 20,
    alignItems: "center",
    borderBottomWidth: 0.5,
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
    width: "90%",
    alignSelf: "center",
  },
  itemsView: {
    width: "90%",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 20,
  },
  itemTouchable: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: TapAppColors.white,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  itemTouchableText: {
    fontSize: 13,
    color: TapAppColors.white,
  },
});
