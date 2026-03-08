import ProfileDeletePopup from "@/src/components/common/popups/ProfileDeletePopup";
import SearchValuePopup from "@/src/components/common/popups/SearchValuePopup";
import { billingValidationSchema } from "@/src/utils/validationSchema";
import { Formik } from "formik";
import moment from "moment";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ICountriesData } from "../../@types/CommonTypes";
import CustomText from "../../components/common/CustomText";
import Loader from "../../components/common/Loader";
import PrimaryButton from "../../components/common/buttons/PrimaryButton";
import MainHeader from "../../components/common/headers/MainHeader";
import FormikSecondaryTextInput from "../../components/common/textInputs/FormikSecondaryTextInput";
import CustomTouchable from "../../components/common/touchables/CustomTouchable";
import { TapAppColors } from "../../constants/TapAppColors";

interface IFormValues {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  DOB: string;
  Country: string;
  BillingAddress1: string;
  BillingAddress2: string;
  BillingCity: string;
  BillingState: string;
  BillingPincode: string;
}

interface IProps {
  // Form props
  initialFormValues: IFormValues;
  onSavePress: (values: IFormValues) => void;
  isInternetConnected: boolean | null;

  // Keep existing props for non-form functionality
  emailMessage: string;
  isEmailRequired: boolean;
  isLoading: boolean;
  userNameEmail: {
    name: string | null | undefined;
    email: string | null | undefined;
  };
  isDeleteModalVisible: boolean;
  popupInput: string;
  isDatePickerVisible: boolean;
  pickerPopupOptions: string[];
  isHeightSelecting: boolean;
  isSearchValuePopupVisible: boolean;
  searchValuePopupInputVal: string;
  popupCountriesData: ICountriesData[];
  onDeleteModalRequestClose: () => void;
  onProfileDeletePressed: () => void;
  onConfirmDeletePressed: () => void;
  onDOBSelectPressed: () => void;
  setIsDatePickerVisible: (val: boolean) => void;
  onCancelDatePicker: () => void;
  onCountrySelect: () => void;
  popupInputChangeText: (val: string) => void;
  onChangeSearchValuePopupText: (val: string) => void;
  setisSearchValuePopupVisible: (val: boolean) => void;
  onSearchValuePopupClose: () => void;
  onHeaderBackPressed: () => void;
}

const BillingInfoForm = (props: {
  values: IFormValues;
  setFieldValue: any;
  handleSubmit: any;
  parentProps: IProps;
  submitCount: number;
}) => {
  const { values, setFieldValue, handleSubmit, parentProps, submitCount } =
    props;

  return (
    <View style={styles.container}>
      <Loader isLoading={parentProps.isLoading} />
      {/* <DateTimePicker
        display="default"
        mode="date"
        open={parentProps.isDatePickerVisible}
        value={
          values?.DOB
            ? new Date(values?.DOB)
            : undefined
        }
        onChange={(event) => {
          const selectedDate = event.nativeEvent.timestamp;
          const convertedISO = new Date(selectedDate).toISOString();
          setFieldValue("DOB", convertedISO);
        }}
        onDismiss={parentProps.onCancelDatePicker}
        maximumDate={moment().subtract(18, "years").toDate()}
      /> */}
      <ProfileDeletePopup
        popupInput={parentProps.popupInput}
        emailMessage={parentProps.emailMessage}
        email={parentProps.userNameEmail?.email}
        isEmailRequired={parentProps.isEmailRequired}
        isModalVisible={parentProps.isDeleteModalVisible}
        onRequestClose={parentProps.onDeleteModalRequestClose}
        popupInputChangeText={parentProps.popupInputChangeText}
        onConfirmDeletePressed={parentProps.onConfirmDeletePressed}
      />
      <SearchValuePopup
        title="Select your country"
        isSearchValuePopupVisible={parentProps.isSearchValuePopupVisible}
        searchValuePopupInputVal={parentProps.searchValuePopupInputVal}
        popupCountriesData={parentProps.popupCountriesData}
        onChangeSearchValuePopupText={parentProps.onChangeSearchValuePopupText}
        onSearchPopupValuePressed={(country: ICountriesData) => {
          if (country) {
            const arrayConvert = Object.values(country);
            const stringConvert = arrayConvert.join(" ");
            setFieldValue("Country", stringConvert);
          }
          parentProps.setisSearchValuePopupVisible(false);
        }}
        onSearchValuePopupClose={parentProps.onSearchValuePopupClose}
      />

      <MainHeader showBackIcon={true} title="Billing Info" />

      <View style={styles.userDetailView}>
        <CustomText
          preset={{
            text: parentProps.userNameEmail?.name as string,
            color: TapAppColors.white,
            fontSize: 15,
            fontWeight: "regular",
          }}
          style={{
            textAlign: "center",
          }}
        />
        <CustomText
          preset={{
            text: parentProps.userNameEmail?.email as string,
            color: TapAppColors.white,
            fontSize: 15,
            fontWeight: "regular",
          }}
          style={{
            textAlign: "center",
          }}
        />
        <CustomTouchable
          style={{
            marginTop: 15,
          }}
          preset={{
            text: "Delete Profile",
            variant: "primary",
            textColor: TapAppColors.white,
            fontSize: 15,
            fontWeight: "medium",
          }}
          onPress={parentProps.onProfileDeletePressed}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
      >
        <View style={styles.innerContainer}>
          <CustomText
            preset={{
              text: "Please fill the form below",
              color: TapAppColors.white,
              fontSize: 15,
              fontWeight: "semiBold",
            }}
          />
          <View style={styles.formView}>
            <FormikSecondaryTextInput name="FirstName" label="First name" />
            <FormikSecondaryTextInput name="MiddleName" label="Middle name" />
            <FormikSecondaryTextInput name="LastName" label="Last name" />

            <View style={styles.customTouchableView}>
              <CustomText
                preset={{
                  text: "Date of Birth",
                  color: TapAppColors.white,
                  fontSize: 14,
                  fontWeight: "regular",
                }}
                style={{
                  marginBottom: 5,
                }}
              />

              <TouchableOpacity
                style={{
                  height: 40,
                  justifyContent: "center",
                  backgroundColor: TapAppColors.white,
                }}
                onPress={parentProps.onDOBSelectPressed}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: TapAppColors.black,
                    paddingLeft: 5,
                  }}
                >
                  {values?.DOB
                    ? moment(values?.DOB).format("YYYY-MM-DD")
                    : "Select Date of Birth"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.customTouchableView}>
              <CustomText
                preset={{
                  text: "Country",
                  color: TapAppColors.white,
                  fontSize: 14,
                  fontWeight: "regular",
                }}
                style={{
                  marginBottom: 5,
                }}
              />
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  height: 40,
                  backgroundColor: TapAppColors.white,
                }}
                onPress={parentProps.onCountrySelect}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: TapAppColors.black,
                    paddingLeft: 5,
                  }}
                >
                  {values?.Country ? values?.Country : "Select Your Country"}
                </Text>
              </TouchableOpacity>
            </View>

            <FormikSecondaryTextInput
              name="BillingAddress1"
              label="Billing Address 1"
            />
            <FormikSecondaryTextInput
              name="BillingAddress2"
              label="Billing Address 2"
            />
            <FormikSecondaryTextInput name="BillingCity" label="Billing city" />
            <FormikSecondaryTextInput
              name="BillingState"
              label="Billing state"
            />
            <FormikSecondaryTextInput
              name="BillingPincode"
              label="Billing pin code"
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.saveButton}>
            <PrimaryButton text="Save" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const BillingInfo = (props: IProps) => {
  return (
    <Formik
      initialValues={props.initialFormValues}
      validationSchema={billingValidationSchema}
      enableReinitialize={true}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={async (values, { setSubmitting, validateForm }) => {
        // Debug: print all values
        console.log("=== FORM SUBMIT ===");
        console.log("Form Values:", JSON.stringify(values, null, 2));

        // Manually trigger validation and print errors
        const errors = await validateForm();
        console.log("Validation Errors:", JSON.stringify(errors, null, 2));

        // Only save if no errors
        if (Object.keys(errors).length === 0) {
          await props.onSavePress(values);
        } else {
          console.log("Form has errors, not saving");
        }
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, values, setFieldValue, submitCount }) => (
        <BillingInfoForm
          values={values}
          setFieldValue={setFieldValue}
          handleSubmit={handleSubmit}
          parentProps={props}
          submitCount={submitCount}
        />
      )}
    </Formik>
  );
};

export default BillingInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapAppColors.appBackground,
  },
  userDetailView: {
    width: "90%",
    alignSelf: "center",
    paddingVertical: 20,
  },
  innerContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  formView: {
    flex: 1,
    paddingVertical: 20,
  },
  saveButton: {},

  customTouchableView: {
    marginBottom: 10,
  },
});
