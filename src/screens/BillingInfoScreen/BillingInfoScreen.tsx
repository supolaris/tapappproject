import React, { useEffect, useState } from "react";
// import { useAppNavigation } from "../../@types/AppNavigation";
import {
  useDeleteUser,
  useGetUserInfo,
  useUpdateBillingInfo,
} from "@/src/services/BillingInfoServices";
import { ICountriesData } from "../../@types/CommonTypes";
import { AppMessages } from "../../constants/AppMessages";
import { countriesData } from "../../constants/StaticData";
import { UserContext } from "../../context/Context";
import { logoutUser, MMKVStorage } from "../../utils/CommonFunctions";
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
  const updateBillingInfoResponse = useUpdateBillingInfo();

  const { currentUserCtx, updateCurrentUserCtx } = UserContext();
  const { isInternetConnected } = UserContext();
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

    console.log("first");
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
          logoutUser();
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
    updateBillingInfoResponse?.mutate(values, {
      onSuccess: (res) => {
        updateCurrentUserCtx({
          User: currentUserCtx.User,
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
          UserRoles: currentUserCtx.UserRoles,
          UserInfoComplete: currentUserCtx.UserInfoComplete ?? false,
        });

        console.log(
          "updated currentUserCtx =>>>",
          JSON.stringify(currentUserCtx),
        );
      },
      onError: (err: any) => {
        console.log("billing info save error =>>>>", err);
      },
    });
  };

  const initialFormValues: IFormValues = {
    FirstName: currentUserCtx?.UserInfo?.FirstName || "",
    MiddleName: currentUserCtx?.UserInfo?.LastName || "",
    LastName: currentUserCtx?.UserInfo?.LastName || "",
    DOB: currentUserCtx?.UserInfo?.DOB || "",
    Country: currentUserCtx?.UserInfo?.Addresses?.[0]?.Country || "",
    BillingAddress1:
      currentUserCtx?.UserInfo?.Addresses?.[0]?.AddressLine1 || "",
    BillingAddress2:
      currentUserCtx?.UserInfo?.Addresses?.[0]?.AddressLine2 || "",
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
      isLoading={updateBillingInfoResponse?.isPending}
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
