import Entypo from "@expo/vector-icons/Entypo";
import { Formik } from "formik";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TapAppColors } from "../../../constants/TapAppColors";
import { deleteUserValidationSchema } from "../../../utils/validationSchema";
import PrimaryButton from "../buttons/PrimaryButton";
import FormikSecondaryTextInput from "../textInputs/FormikSecondaryTextInput";

interface ProfileDeletePopupProps {
  popupInput?: string;
  emailMessage?: string;
  isModalVisible: boolean;
  isEmailRequired?: boolean;
  email: string | null | undefined;
  onRequestClose: () => void;
  onConfirmDeletePressed: () => void;
  popupInputChangeText?: (val: string) => void;
}

const ProfileDeletePopup = (props: ProfileDeletePopupProps) => {
  return (
    <Modal
      transparent={true}
      visible={props.isModalVisible}
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.headerView}>
            <Text style={styles.headerTitleText}>Delete Profile</Text>
            <TouchableOpacity
              style={styles.crossTouchable}
              onPress={props.onRequestClose}
            >
              <Entypo name="cross" size={25} color={TapAppColors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentView}>
            <Formik
              initialValues={{
                Email: "",
              }}
              validationSchema={deleteUserValidationSchema}
              onSubmit={(values) => {
                // Check if entered email matches the stored email
                if (values.Email.toLowerCase() === props.email?.toLowerCase()) {
                  props.onConfirmDeletePressed();
                }
              }}
            >
              {({ handleSubmit, values }) => (
                <View>
                  <Text style={styles.titleText}>
                    Are you sure, you want to delete profile?
                  </Text>
                  <Text style={styles.descriptionText}>
                    Please write your email below to confirm
                  </Text>
                  <Text style={styles.emailText}>{props.email}</Text>

                  <FormikSecondaryTextInput
                    name="Email"
                    label=""
                    keyboardType="email-address"
                  />

                  <View style={styles.confirmButton}>
                    <PrimaryButton text="Confirm" onPress={handleSubmit} />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileDeletePopup;

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
    borderColor: TapAppColors.primaryGray,
    justifyContent: "center",
    backgroundColor: TapAppColors.black,
    position: "relative",
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
  confirmButton: {
    width: "40%",
    alignSelf: "center",
  },
});
