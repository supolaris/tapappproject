import moment from "moment";
import React, { useEffect, useState } from "react";
// import { useAppNavigation } from "../../@types/AppNavigation";
import {
  useDeleteUser,
  useGetUserInfo,
} from "@/src/services/BillingInfoServices";
import { ICountriesData } from "../../@types/CommonTypes";
import { AppMessages } from "../../constants/AppMessages";
import { countriesData } from "../../constants/StaticData";
import { UserContext } from "../../context/Context";
import { UpdateProfileDetail } from "../../services/ProfileDetailServices";
import { MMKVStorage, simpleToast } from "../../utils/CommonFunctions";
import BillingInfo from "./BillingInfo";

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

export const BillingInfoScreen = () => {
  // const navigation = useAppNavigation();

  const userInfoResponse = useGetUserInfo();
  const deleteUserResponse = useDeleteUser();
  // const updateBillingInfoResponse = useUpdateBillingInfo();

  const { currentUserCtx, updateCurrentUserCtx } = UserContext();
  const { isInternetConnected } = UserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailRequired, setIsEmailRequired] = useState<boolean>(false);
  const [emailMessage, setEmailMessage] = useState<string>("");

  const [userNameEmail, setUserNameEmail] = useState<{
    name: string | null | undefined;
    email: string | null | undefined;
  }>({
    name: "",
    email: "",
  });

  const [isSearchValuePopupVisible, setisSearchValuePopupVisible] =
    useState<boolean>(false);
  const [searchValuePopupInputVal, setsearchValuePopupInputVal] =
    useState<string>("");

  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  const [popupInput, setPopupInput] = useState<string>("");

  const [popupCountriesData, setPopupCountriesData] = useState<
    ICountriesData[]
  >([]);

  useEffect(() => {
    userDetails();
  }, []);

  const userDetails = async () => {
    try {
      const myEmail = MMKVStorage.getString("UserEmail");
      const myName = MMKVStorage.getString("UserName");

      setUserNameEmail({
        name: myName,
        email: myEmail,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const onDeleteModalRequestClose = () => {
    setIsDeleteModalVisible(false);
  };

  const onProfileDeletePressed = () => {
    setIsDeleteModalVisible(true);
  };

  const popupInputChangeText = (val: string) => {
    setPopupInput(val);
    setEmailMessage("");
    setIsEmailRequired(false);
  };

  const onConfirmDeletePressed = () => {
    if (popupInput?.length === 0) {
      setIsEmailRequired(true);
      return;
    }
    if (userNameEmail.email !== popupInput) {
      setEmailMessage(AppMessages.emailInvalid);
      return;
    }
    deleteUserResponse.mutate(undefined, {
      onSuccess: (response) => {
        if (response?.status === 200) {
          MMKVStorage.removeItem("UserEmail");
          MMKVStorage.removeItem("UserName");
          MMKVStorage.removeItem("UserImage");
          MMKVStorage.removeItem("FirebaseToken");

          global.token = "";
          // navigation.navigate("WalkthroughScreen");
        }
        setPopupInput("");
        setIsDeleteModalVisible(false);
      },
      onError: (error) => {
        console.log("delete user error", error);
      },
    });
  };

  const onDOBSelectPressed = () => {
    setIsDatePickerVisible(true);
  };

  const onCountrySelect = () => {
    setisSearchValuePopupVisible(true);
    setPopupCountriesData(countriesData);
  };

  const onChangeSearchValuePopupText = (val: string) => {
    setsearchValuePopupInputVal(val);

    if (val.length > 0) {
      const filteredCountries = countriesData.filter((country) => {
        return country.name?.toLowerCase().includes(val.toLowerCase());
      });
      setPopupCountriesData(filteredCountries);
    } else {
      setPopupCountriesData(countriesData);
    }
  };

  const onSearchValuePopupClose = () => {
    setisSearchValuePopupVisible(false);
  };

  const onHeaderBackPressed = () => {
    // navigation.goBack();
  };

  const onCancelDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleSavePress = async (values: IFormValues) => {
    if (isInternetConnected) {
      try {
        setIsLoading(true);

        const response = await UpdateProfileDetail(values);

        if (response.status === 200) {
          updateCurrentUserCtx({
            ...currentUserCtx,
            UserInfo: {
              ...currentUserCtx.UserInfo,
              FirstName: values.FirstName,
              MiddleName: values.MiddleName,
              LastName: values.LastName,
              DOB: values.DOB,
              Addresses: [
                {
                  ...currentUserCtx.UserInfo?.Addresses?.[0],
                  AddressLine1: values.BillingAddress1,
                  AddressLine2: values.BillingAddress2,
                  City: values.BillingCity,
                  State: values.BillingState,
                  PostCode: values.BillingPincode,
                  Country: values.Country,
                } as any,
              ],
            },
          });

          setIsLoading(false);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("else entered internet");
      simpleToast(AppMessages.noInternet);
    }
  };

  const initialFormValues: IFormValues = {
    FirstName: currentUserCtx?.UserInfo?.FirstName || "",
    MiddleName: currentUserCtx?.UserInfo?.LastName || "",
    LastName: currentUserCtx?.UserInfo?.LastName || "",
    DOB: currentUserCtx?.UserInfo?.DOB || "",
    Country: currentUserCtx?.UserInfo?.Addresses?.[0]?.Country || "",
    BillingAddress1: currentUserCtx?.UserInfo?.Addresses?.[0]?.AddressLine1 || "",
    BillingAddress2: currentUserCtx?.UserInfo?.Addresses?.[0]?.AddressLine2 || "",
    BillingCity: currentUserCtx?.UserInfo?.Addresses?.[0]?.City || "",
    BillingState: currentUserCtx?.UserInfo?.Addresses?.[0]?.State || "",
    BillingPincode: currentUserCtx?.UserInfo?.Addresses?.[0]?.PostCode || "",
  };

  return (
    <BillingInfo
      initialFormValues={initialFormValues}
      onSavePress={handleSavePress}
      isInternetConnected={isInternetConnected}
      // Existing props for non-form functionality
      emailMessage={emailMessage}
      isEmailRequired={isEmailRequired}
      isLoading={isLoading}
      userNameEmail={userNameEmail}
      isDeleteModalVisible={isDeleteModalVisible}
      popupInput={popupInput}
      isDatePickerVisible={isDatePickerVisible}
      isHeightSelecting={false}
      pickerPopupOptions={[]}
      isSearchValuePopupVisible={isSearchValuePopupVisible}
      searchValuePopupInputVal={searchValuePopupInputVal}
      popupCountriesData={popupCountriesData}
      onDeleteModalRequestClose={onDeleteModalRequestClose}
      onProfileDeletePressed={onProfileDeletePressed}
      onConfirmDeletePressed={onConfirmDeletePressed}
      onDOBSelectPressed={onDOBSelectPressed}
      setIsDatePickerVisible={setIsDatePickerVisible}
      onCancelDatePicker={onCancelDatePicker}
      onCountrySelect={onCountrySelect}
      popupInputChangeText={popupInputChangeText}
      onChangeSearchValuePopupText={onChangeSearchValuePopupText}
      setisSearchValuePopupVisible={setisSearchValuePopupVisible}
      onSearchValuePopupClose={onSearchValuePopupClose}
      onHeaderBackPressed={onHeaderBackPressed}
    />
  );
};
