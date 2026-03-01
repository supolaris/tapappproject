import Entypo from "@expo/vector-icons/Entypo";
import React, { memo } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TapAppColors } from "../../../constants/TapAppColors";
import ErrorText from "../ErrorText";
// import Gradient from "../Gradient";
import PrimaryButton from "../buttons/PrimaryButton";

interface ProfileDeletePopupProps {
  isModalVisible: boolean;
  emailMessage: string;
  email: string | null | undefined;
  popupInput: string;
  isEmailRequired: boolean;
  popupInputChangeText: (val: string) => void;
  onRequestClose: () => void;
  onConfirmDeletePressed: () => void;
}

const ProfileDeletePopup = (props: ProfileDeletePopupProps) => {
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
                <Text style={styles.headerTitleText}>Delete Profile</Text>
                <TouchableOpacity
                  onPress={props.onRequestClose}
                  style={styles.crossTouchable}
                >
                  <Entypo name="cross" size={25} color={TapAppColors.white} />
                </TouchableOpacity>
              </View>

              <View style={styles.contentView}>
                <View>
                  <Text style={styles.titleText}>
                    Are you sure, you want to delete profile?
                  </Text>
                  <Text style={styles.descriptionText}>
                    Please write your email below to confirm
                  </Text>
                  <Text style={styles.emailText}>{props.email}</Text>

                  {/* <Gradient
                    borderColor={
                      props.isEmailRequired ? "red" : TapAppColors.white
                    }
                  > */}
                  <TextInput
                    value={props.popupInput}
                    onChangeText={(val: string) =>
                      props.popupInputChangeText(val)
                    }
                    placeholder="example@example.com"
                    placeholderTextColor={TapAppColors.primayGray}
                    style={styles.textInput}
                  />
                  {/* </Gradient> */}
                  <ErrorText text={props.emailMessage} />
                </View>
                <View style={styles.confirmButton}>
                  <PrimaryButton
                    text="Confirm"
                    onPress={props.onConfirmDeletePressed}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default memo(ProfileDeletePopup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapAppColors.transparentBg,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    height: 400,
    width: "85%",
    backgroundColor: TapAppColors.appBackground,
    borderRadius: 10,
  },
  headerView: {
    paddingVertical: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: TapAppColors.primayGray,
    justifyContent: "center",
    backgroundColor: TapAppColors.black,
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
    backgroundColor: TapAppColors.appBackground,
    flex: 1,
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-around",
  },
  titleText: {
    textAlign: "center",
    fontSize: 15,
    color: TapAppColors.white,
  },
  descriptionText: {
    textAlign: "center",
    fontSize: 15,
    color: TapAppColors.white,
  },
  emailText: {
    textAlign: "center",
    fontSize: 16,
    color: TapAppColors.white,
    marginTop: 10,
    marginBottom: 30,
  },
  textInput: {
    color: TapAppColors.black,
    height: 40,
  },
  confirmButton: {
    // width: '40%',
    //alignSelf: 'center',
  },
});
