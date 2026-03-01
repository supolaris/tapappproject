import React, { useEffect, useState } from "react";
// import {
//   MediaType,
//   launchCamera,
//   launchImageLibrary,
// } from "react-native-image-picker";

import { IAllowedValues } from "../../@types/apiInterfaces/commonInterface";
import { IMyProfilePreferences } from "../../@types/apiInterfaces/MyProfilePreferencesInterface";
import { useAppNavigation } from "../../@types/AppNavigation";
import { IHeightAgeVal } from "../../@types/CommonTypes";
import { ApiResponseEnums } from "../../constants/AppEnums";
import { singleSelectTitles } from "../../constants/StaticData";
import { UserContext } from "../../context/Context";
import {
  GetAllowedValuesService,
  GetMyProfilePreferencesService,
  GetProfileImagesService,
  SaveMyProfilePreferencesService,
  SaveProfileImagesService,
} from "../../services/MyPreferenceServices";
import { MMKVStorage, simpleToast } from "../../utils/CommonFunctions";
import MyPreferences from "./MyPreferences";

let selectionImageIndex: number;

export const MyPreferencesScreen = () => {
  const navigation = useAppNavigation();
  const UserEmail = MMKVStorage.getString("UserEmail");

  const {
    currentUserCtx,
    myProfilePreferencesCtx,
    updateAllowedCtx,
    updateMyImagesCtx,
    updateCurrentUserCtx,
    updateMyProfilePreferencesCtx,
  } = UserContext();

  const [selectedTab, setSelectedTab] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [myImagesData, setMyImagesData] = useState<{ image: string }[]>([
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ]);

  const [isImageSelectionPopup, setIsImageSelectionPopup] =
    useState<boolean>(false);

  const [isHeightSelecting, setIsHeightSelecting] = useState<boolean>(false);

  const [heightAgeVal, setHeightAgeVal] = useState<IHeightAgeVal>({
    HeightFeet: currentUserCtx?.UserInfo?.HeightFeet
      ? currentUserCtx?.UserInfo?.HeightFeet
      : 0,
    HeightInches: currentUserCtx?.UserInfo?.HeightInches
      ? currentUserCtx?.UserInfo?.HeightInches
      : 0,
    Gender: currentUserCtx?.UserInfo?.Gender
      ? currentUserCtx?.UserInfo?.Gender
      : "",
  });

  const [pickerPopupOptions, setPickerPopupOptions] = useState<string[]>([]);

  const [isHeightPopupVisible, setIsHeightPopupVisible] =
    useState<boolean>(false);

  const [allowedValues, setAllowedValues] = useState<IAllowedValues[]>([]);
  const [newSelectedCategory, setNewSelectedCategory] = useState<string>("");

  //
  const [myProfilePreferences, setMyProfilePreferences] =
    useState<IMyProfilePreferences>({
      TapLifestylePets: myProfilePreferencesCtx?.TapLifestylePets || "",
      TapPrivacyShowAge: myProfilePreferencesCtx?.TapPrivacyShowAge ?? false,
      TapLifestyleOpenTo: myProfilePreferencesCtx?.TapLifestyleOpenTo || "",
      TapPersonalityType: myProfilePreferencesCtx?.TapPersonalityType || "",
      TapLifestyleSmoking: myProfilePreferencesCtx?.TapLifestyleSmoking || "",
      TapLifestyleWorkout: myProfilePreferencesCtx?.TapLifestyleWorkout || "",
      TapLanguagesLanguage: myProfilePreferencesCtx?.TapLanguagesLanguage || "",
      TapPersonalityTrait: myProfilePreferencesCtx?.TapPersonalityTrait || "",
      TapLifestyleDrinking: myProfilePreferencesCtx?.TapLifestyleDrinking || "",
      TapLifestyleCannabis: myProfilePreferencesCtx?.TapLifestyleCannabis || "",
      TapDiscoveryLocation: myProfilePreferencesCtx?.TapDiscoveryLocation || "",
      TapProfessionalSchool:
        myProfilePreferencesCtx?.TapProfessionalSchool || "",
      TapGoingOutSocialVibe:
        myProfilePreferencesCtx?.TapGoingOutSocialVibe || "",
      TapGoingOutDressStyle:
        myProfilePreferencesCtx?.TapGoingOutDressStyle || "",
      TapPrivacyShowGender:
        myProfilePreferencesCtx?.TapPrivacyShowGender ?? false,
      TapLifestyleLifestyle:
        myProfilePreferencesCtx?.TapLifestyleLifestyle || "",
      TapCurLocationLivingIn:
        myProfilePreferencesCtx?.TapCurLocationLivingIn || "",
      TapProfessionalCompany:
        myProfilePreferencesCtx?.TapProfessionalCompany || "",
      TapLifestyleLookingFor:
        myProfilePreferencesCtx?.TapLifestyleLookingFor || "",
      TapPersonalityLoveStyle:
        myProfilePreferencesCtx?.TapPersonalityLoveStyle || "",
      TapProfessionalLanguage:
        myProfilePreferencesCtx?.TapProfessionalLanguage || "",
      TapProfessionalJobTitle:
        myProfilePreferencesCtx?.TapProfessionalJobTitle || "",
      TapLifestyleSocialMedia:
        myProfilePreferencesCtx?.TapLifestyleSocialMedia || "",
      TapMyWeekendsPaceEnergy:
        myProfilePreferencesCtx?.TapMyWeekendsPaceEnergy || "",
      TapMyWeekendsActivities:
        myProfilePreferencesCtx?.TapMyWeekendsActivities || "",
      TapPrivacyShowDistance:
        myProfilePreferencesCtx?.TapPrivacyShowDistance ?? false,
      TapPersonalDetailsGender:
        myProfilePreferencesCtx?.TapPersonalDetailsGender || "",
      TapPersonalDetailsZodiac:
        myProfilePreferencesCtx?.TapPersonalDetailsZodiac || "",
      TapPersonalDetailsOpenTo:
        myProfilePreferencesCtx?.TapPersonalDetailsOpenTo || "",
      TapMyWeekendsSocialEnergy:
        myProfilePreferencesCtx?.TapMyWeekendsSocialEnergy || "",
      TapMyWeekendsSocialHabits:
        myProfilePreferencesCtx?.TapMyWeekendsSocialHabits || "",
      TapPersonalDetailsAboutMe:
        myProfilePreferencesCtx?.TapPersonalDetailsAboutMe || "",
      TapLifestyleSleepingHabits:
        myProfilePreferencesCtx?.TapLifestyleSleepingHabits || "",
      TapPersonalityLoveLanguage:
        myProfilePreferencesCtx?.TapPersonalityLoveLanguage || "",
      TapPrivacyShowSmartPhotos:
        myProfilePreferencesCtx?.TapPrivacyShowSmartPhotos ?? false,
      TapPersonalDetailsInterests:
        myProfilePreferencesCtx?.TapPersonalDetailsInterests || "",
      TapPersonalDetailsEducation:
        myProfilePreferencesCtx?.TapPersonalDetailsEducation || "",
      TapLifestyleWorkoutFrequency:
        myProfilePreferencesCtx?.TapLifestyleWorkoutFrequency || "",
      TapPersonalDetailsLookingFor:
        myProfilePreferencesCtx?.TapPersonalDetailsLookingFor || "",
      TapPersonalDetailsFamilyPlans:
        myProfilePreferencesCtx?.TapPersonalDetailsFamilyPlans || "",
      TapLifestyleDietaryPreference:
        myProfilePreferencesCtx?.TapLifestyleDietaryPreference || "",
      TapGoingOutPreferredActivities:
        myProfilePreferencesCtx?.TapGoingOutPreferredActivities || "",
      TapPrivacyShowCurrentLocation:
        myProfilePreferencesCtx?.TapPrivacyShowCurrentLocation ?? false,
      TapPersonalityCommunicationStyle:
        myProfilePreferencesCtx?.TapPersonalityCommunicationStyle || "",
      // TapHealthAndWellnessCovidVaccine:
      //   myProfilePreferencesCtx?.TapHealthAndWellnessCovidVaccine ?? false,
      TapPersonalDetailsSexualOrientation:
        myProfilePreferencesCtx?.TapPersonalDetailsSexualOrientation || "",
      TapPersonalDetailsRelationshipGoals:
        myProfilePreferencesCtx?.TapPersonalDetailsRelationshipGoals || "",
      TapMusicAndEntertainmentSpotifyAnthem:
        myProfilePreferencesCtx?.TapMusicAndEntertainmentSpotifyAnthem || "",
      TapMyCommunicationStyleResponsiveness:
        myProfilePreferencesCtx?.TapMyCommunicationStyleResponsiveness || "",
      TapMyCommunicationStylePhoneUsageHabits:
        myProfilePreferencesCtx?.TapMyCommunicationStylePhoneUsageHabits || "",
      TapMusicAndEntertainmentTopSpotifyArtists:
        myProfilePreferencesCtx?.TapMusicAndEntertainmentTopSpotifyArtists ||
        "",
      TapMyCommunicationStylePreferredCommunicationMethod:
        myProfilePreferencesCtx?.TapMyCommunicationStylePreferredCommunicationMethod ||
        "",
      CurLocation: {
        TapProfilelng: myProfilePreferencesCtx?.CurLocation?.TapProfilelng ?? 0,
        TapProfilelat: myProfilePreferencesCtx?.CurLocation?.TapProfilelat ?? 0,
        tap_profile_id:
          myProfilePreferencesCtx?.CurLocation?.tap_profile_id ?? 0,
        TapProfileAreaName:
          myProfilePreferencesCtx?.CurLocation?.TapProfileAreaName || "",
        TapProfileCityName:
          myProfilePreferencesCtx?.CurLocation?.TapProfileCityName || "",
        TapProfileCountryName:
          myProfilePreferencesCtx?.CurLocation?.TapProfileCountryName || "",
        TapProfileCountryCode:
          myProfilePreferencesCtx?.CurLocation?.TapProfileCountryCode || "",
      },
      images: myProfilePreferencesCtx.images,
    });

  //

  useEffect(() => {
    getAllowedValues();
    getProfileImages();
    getMyProfilePreferences();
  }, []);

  useEffect(() => {
    setMyProfilePreferences((preVal) => ({
      ...preVal,
      CurLocation: myProfilePreferencesCtx?.CurLocation,
    }));
  }, [myProfilePreferencesCtx?.CurLocation]);

  const getMyProfilePreferences = async () => {
    try {
      setIsLoading(true);
      const response = await GetMyProfilePreferencesService(
        UserEmail as string,
      );
      if (response) {
        updateMyProfilePreferencesCtx({
          TapLifestylePets: response.TapLifestylePets || "",
          TapPrivacyShowAge: response.TapPrivacyShowAge ?? false,
          TapLifestyleOpenTo: response.TapLifestyleOpenTo || "",
          TapPersonalityType: response.TapPersonalityType || "",
          TapLifestyleSmoking: response.TapLifestyleSmoking || "",
          TapLifestyleWorkout: response.TapLifestyleWorkout || "",
          TapLanguagesLanguage: Array.isArray(response.TapLanguagesLanguage)
            ? response.TapLanguagesLanguage?.join(", ")
            : response.TapLanguagesLanguage || "",
          TapPersonalityTrait: response.TapPersonalityTrait || "",
          TapLifestyleDrinking: response.TapLifestyleDrinking || "",
          TapLifestyleCannabis: response.TapLifestyleCannabis || "",
          TapDiscoveryLocation: response.TapDiscoveryLocation || "",
          TapProfessionalSchool: response.TapProfessionalSchool || "",
          TapGoingOutSocialVibe: response.TapGoingOutSocialVibe || "",
          TapGoingOutDressStyle: response.TapGoingOutDressStyle || "",
          TapPrivacyShowGender: response.TapPrivacyShowGender ?? false,
          TapLifestyleLifestyle: response.TapLifestyleLifestyle || "",
          TapCurLocationLivingIn: response.TapCurLocationLivingIn || "",
          TapProfessionalCompany: response.TapProfessionalCompany || "",
          TapLifestyleLookingFor: response.TapLifestyleLookingFor || "",
          TapPersonalityLoveStyle: response.TapPersonalityLoveStyle || "",
          TapProfessionalLanguage: response.TapProfessionalLanguage || "",
          TapProfessionalJobTitle: response.TapProfessionalJobTitle || "",
          TapLifestyleSocialMedia: response.TapLifestyleSocialMedia || "",
          TapMyWeekendsPaceEnergy: response.TapMyWeekendsPaceEnergy || "",
          TapMyWeekendsActivities: response.TapMyWeekendsActivities || "",
          TapPrivacyShowDistance: response.TapPrivacyShowDistance ?? false,
          TapPersonalDetailsGender: response.TapPersonalDetailsGender || "",
          TapPersonalDetailsZodiac: response.TapPersonalDetailsZodiac || "",
          TapPersonalDetailsOpenTo: response.TapPersonalDetailsOpenTo || "",
          TapMyWeekendsSocialEnergy: response.TapMyWeekendsSocialEnergy || "",
          TapMyWeekendsSocialHabits: response.TapMyWeekendsSocialHabits || "",
          TapPersonalDetailsAboutMe: response.TapPersonalDetailsAboutMe || "",
          TapLifestyleSleepingHabits: response.TapLifestyleSleepingHabits || "",
          TapPersonalityLoveLanguage: response.TapPersonalityLoveLanguage || "",
          TapPrivacyShowSmartPhotos:
            response.TapPrivacyShowSmartPhotos ?? false,
          TapPersonalDetailsInterests:
            response.TapPersonalDetailsInterests || "",
          TapPersonalDetailsEducation:
            response.TapPersonalDetailsEducation || "",
          TapLifestyleWorkoutFrequency:
            response.TapLifestyleWorkoutFrequency || "",
          TapPersonalDetailsLookingFor:
            response.TapPersonalDetailsLookingFor || "",
          TapPersonalDetailsFamilyPlans:
            response.TapPersonalDetailsFamilyPlans || "",
          TapLifestyleDietaryPreference:
            response.TapLifestyleDietaryPreference || "",
          TapGoingOutPreferredActivities:
            response.TapGoingOutPreferredActivities || "",
          TapPrivacyShowCurrentLocation:
            response.TapPrivacyShowCurrentLocation ?? false,
          TapPersonalityCommunicationStyle:
            response.TapPersonalityCommunicationStyle || "",
          // TapHealthAndWellnessCovidVaccine:
          //   response.TapHealthAndWellnessCovidVaccine ?? false,
          TapPersonalDetailsSexualOrientation:
            response.TapPersonalDetailsSexualOrientation || "",
          TapPersonalDetailsRelationshipGoals:
            response.TapPersonalDetailsRelationshipGoals || "",
          TapMusicAndEntertainmentSpotifyAnthem:
            response.TapMusicAndEntertainmentSpotifyAnthem || "",
          TapMyCommunicationStyleResponsiveness:
            response.TapMyCommunicationStyleResponsiveness || "",
          TapMyCommunicationStylePhoneUsageHabits:
            response.TapMyCommunicationStylePhoneUsageHabits || "",
          TapMusicAndEntertainmentTopSpotifyArtists:
            response.TapMusicAndEntertainmentTopSpotifyArtists || "",
          TapMyCommunicationStylePreferredCommunicationMethod:
            response.TapMyCommunicationStylePreferredCommunicationMethod || "",
          CurLocation: {
            TapProfilelng: response?.CurLocation?.TapProfilelng ?? 0,
            TapProfilelat: response?.CurLocation?.TapProfilelat ?? 0,
            tap_profile_id: response?.CurLocation?.tap_profile_id ?? 0,
            TapProfileAreaName: response?.CurLocation?.TapProfileAreaName || "",
            TapProfileCityName: response?.CurLocation?.TapProfileCityName || "",
            TapProfileCountryName:
              response?.CurLocation?.TapProfileCountryName || "",
            TapProfileCountryCode:
              response?.CurLocation?.TapProfileCountryCode || "",
          },

          images: response.images,
        });

        //TODO: have to use this one once image are good
        // updateCurrentUserCtx(prev => ({
        //   ...prev,
        //   UserInfo: {
        //     ...prev.UserInfo,
        //     profilePicture: response.images?.[0]?.image_url,
        //   },
        // }));

        setMyProfilePreferences({
          TapLifestylePets: response.TapLifestylePets || "",
          TapPrivacyShowAge: response.TapPrivacyShowAge ?? false,
          TapLifestyleOpenTo: response.TapLifestyleOpenTo || "",
          TapPersonalityType: response.TapPersonalityType || "",
          TapLifestyleSmoking: response.TapLifestyleSmoking || "",
          TapLifestyleWorkout: response.TapLifestyleWorkout || "",
          TapLanguagesLanguage: Array.isArray(response.TapLanguagesLanguage)
            ? response.TapLanguagesLanguage?.join(", ")
            : response.TapLanguagesLanguage || "",
          TapPersonalityTrait: response.TapPersonalityTrait || "",
          TapLifestyleDrinking: response.TapLifestyleDrinking || "",
          TapLifestyleCannabis: response.TapLifestyleCannabis || "",
          TapDiscoveryLocation: response.TapDiscoveryLocation || "",
          TapProfessionalSchool: response.TapProfessionalSchool || "",
          TapGoingOutSocialVibe: response.TapGoingOutSocialVibe || "",
          TapGoingOutDressStyle: response.TapGoingOutDressStyle || "",
          TapPrivacyShowGender: response.TapPrivacyShowGender ?? false,
          TapLifestyleLifestyle: response.TapLifestyleLifestyle || "",
          TapCurLocationLivingIn: response.TapCurLocationLivingIn || "",
          TapProfessionalCompany: response.TapProfessionalCompany || "",
          TapLifestyleLookingFor: response.TapLifestyleLookingFor || "",
          TapPersonalityLoveStyle: response.TapPersonalityLoveStyle || "",
          TapProfessionalLanguage: response.TapProfessionalLanguage || "",
          TapProfessionalJobTitle: response.TapProfessionalJobTitle || "",
          TapLifestyleSocialMedia: response.TapLifestyleSocialMedia || "",
          TapMyWeekendsPaceEnergy: response.TapMyWeekendsPaceEnergy || "",
          TapMyWeekendsActivities: response.TapMyWeekendsActivities || "",
          TapPrivacyShowDistance: response.TapPrivacyShowDistance ?? false,
          TapPersonalDetailsGender: response.TapPersonalDetailsGender || "",
          TapPersonalDetailsZodiac: response.TapPersonalDetailsZodiac || "",
          TapPersonalDetailsOpenTo: response.TapPersonalDetailsOpenTo || "",
          TapMyWeekendsSocialEnergy: response.TapMyWeekendsSocialEnergy || "",
          TapMyWeekendsSocialHabits: response.TapMyWeekendsSocialHabits || "",
          TapPersonalDetailsAboutMe: response.TapPersonalDetailsAboutMe || "",
          TapLifestyleSleepingHabits: response.TapLifestyleSleepingHabits || "",
          TapPersonalityLoveLanguage: response.TapPersonalityLoveLanguage || "",
          TapPrivacyShowSmartPhotos:
            response.TapPrivacyShowSmartPhotos ?? false,
          TapPersonalDetailsInterests:
            response.TapPersonalDetailsInterests || "",
          TapPersonalDetailsEducation:
            response.TapPersonalDetailsEducation || "",
          TapLifestyleWorkoutFrequency:
            response.TapLifestyleWorkoutFrequency || "",
          TapPersonalDetailsLookingFor:
            response.TapPersonalDetailsLookingFor || "",
          TapPersonalDetailsFamilyPlans:
            response.TapPersonalDetailsFamilyPlans || "",
          TapLifestyleDietaryPreference:
            response.TapLifestyleDietaryPreference || "",
          TapGoingOutPreferredActivities:
            response.TapGoingOutPreferredActivities || "",
          TapPrivacyShowCurrentLocation:
            response.TapPrivacyShowCurrentLocation ?? false,
          TapPersonalityCommunicationStyle:
            response.TapPersonalityCommunicationStyle || "",
          // TapHealthAndWellnessCovidVaccine:
          //   response.TapHealthAndWellnessCovidVaccine ?? false,
          TapPersonalDetailsSexualOrientation:
            response.TapPersonalDetailsSexualOrientation || "",
          TapPersonalDetailsRelationshipGoals:
            response.TapPersonalDetailsRelationshipGoals || "",
          TapMusicAndEntertainmentSpotifyAnthem:
            response.TapMusicAndEntertainmentSpotifyAnthem || "",
          TapMyCommunicationStyleResponsiveness:
            response.TapMyCommunicationStyleResponsiveness || "",
          TapMyCommunicationStylePhoneUsageHabits:
            response.TapMyCommunicationStylePhoneUsageHabits || "",
          TapMusicAndEntertainmentTopSpotifyArtists:
            response.TapMusicAndEntertainmentTopSpotifyArtists || "",
          TapMyCommunicationStylePreferredCommunicationMethod:
            response.TapMyCommunicationStylePreferredCommunicationMethod || "",
          CurLocation: {
            TapProfilelng: response?.CurLocation?.TapProfilelng ?? 0,
            TapProfilelat: response?.CurLocation?.TapProfilelat ?? 0,
            tap_profile_id: response?.CurLocation?.tap_profile_id ?? 0,
            TapProfileAreaName: response?.CurLocation?.TapProfileAreaName || "",
            TapProfileCityName: response?.CurLocation?.TapProfileCityName || "",
            TapProfileCountryName:
              response?.CurLocation?.TapProfileCountryName || "",
            TapProfileCountryCode:
              response?.CurLocation?.TapProfileCountryCode || "",
          },
          images: response.images,
        });
      }
    } catch (error) {
      console.log("error in getting my profile preferences", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onEditLocationPressed = () => {
    navigation.navigate("EditCityScreen", {
      isMatchPreferencesFlow: false,
    });
  };

  const onHeaderBackPressed = () => {
    navigation.goBack();
  };

  const onHandleSwitchVal = (val: number) => {
    if (val === 1) {
      setMyProfilePreferences((preVal) => ({
        ...preVal,
        TapPrivacyShowAge: !preVal.TapPrivacyShowAge,
      }));
    } else if (val === 2) {
      setMyProfilePreferences((preVal) => ({
        ...preVal,
        TapPrivacyShowDistance: !preVal.TapPrivacyShowDistance,
      }));
    } else if (val === 3) {
      setMyProfilePreferences((preVal) => ({
        ...preVal,
        TapPrivacyShowCurrentLocation: !preVal.TapPrivacyShowCurrentLocation,
      }));
    } else if (val === 4) {
      setMyProfilePreferences((preVal) => ({
        ...preVal,
        TapPrivacyShowSmartPhotos: !preVal.TapPrivacyShowSmartPhotos,
      }));
    } else if (val === 5) {
      setMyProfilePreferences((preVal) => ({
        ...preVal,
        TapPrivacyShowGender: !preVal.TapPrivacyShowGender,
      }));
    }
  };

  const onImageSelectionPressed = (index: number) => {
    console.log("index pressed", index);
    selectionImageIndex = index;
    setIsImageSelectionPopup(true);
  };

  const onChangeImagePressed = async (flag: number, index: number) => {
    try {
      let options: {
        maxWidth: number;
        maxHeight: number;
        includeBase64: boolean;
        mediaType: MediaType;
      } = {
        maxWidth: 300,
        maxHeight: 300,
        includeBase64: false,
        mediaType: "photo",
      };
      if (flag === 1) {
        console.warn("here");
        launchImageLibrary(options, (res) => {
          console.log("response", res);
          if (res.didCancel) {
            console.log("User cancelled image picker");
          } else if (res.errorCode) {
            console.warn("err");
          } else {
            if (res.assets && res.assets?.length > 0) {
              const imageUri = res.assets?.[0]?.uri;
              if (imageUri) {
                setIsImageSelectionPopup(false);
                setMyImagesData((prevVal) =>
                  prevVal.map((item, idx) =>
                    idx === index ? { ...item, image: imageUri } : item,
                  ),
                );
                SaveProfileImages(res.assets?.[0]);
              }
            }
          }
        });
      } else {
        launchCamera(options, (res) => {
          if (res.didCancel) {
          } else if (res.errorCode) {
          } else {
            if (res.assets && res.assets?.length > 0) {
              const imageUri = res.assets?.[0]?.uri;
              if (imageUri) {
                setIsImageSelectionPopup(false);
                setMyImagesData((prevVal) =>
                  prevVal.map((item, idx) =>
                    idx === index ? { ...item, image: imageUri } : item,
                  ),
                );
                SaveProfileImages(res.assets?.[0]);
              }
            }
          }
        });
      }
    } catch (err) {
      console.warn("err:", err);
    }
  };

  const SaveProfileImages = async (assets: any) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", {
        uri: assets.uri,
        name: assets.fileName ?? "photo.jpg",
        type: assets.type ?? "image/jpeg",
      });

      console.log("form", formData);
      let response = await SaveProfileImagesService(
        UserEmail as string,
        formData,
      );
      if (response.status === 200) {
        simpleToast("Image saved successfully");
      }
    } catch (error) {
      console.log("error in getting allowed values", error);
      simpleToast(`Image not saved successfully ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const onImageSelectionPopupClose = () => {
    setIsImageSelectionPopup(false);
  };
  const onImageSelectionOptionPressed = (selectionValue: number) => {
    onChangeImagePressed(selectionValue, selectionImageIndex);
  };

  const onImageDeletePressed = (index: number) => {
    setMyImagesData((prevVal) =>
      prevVal.map((item, idx) =>
        idx === index ? { ...item, image: "" } : item,
      ),
    );
  };

  const getAllowedValues = async () => {
    try {
      setIsLoading(true);
      let response = await GetAllowedValuesService();
      if (response) {
        setAllowedValues(response);
        updateAllowedCtx(response);
      }
    } catch (error) {
      console.log("error in getting allowed values", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProfileImages = async () => {
    try {
      setIsLoading(true);
      let response = await GetProfileImagesService(UserEmail as string);
      if (response) {
        setMyImagesData((prevState) => {
          const updatedState = [...prevState];
          response.forEach((item) => {
            const index = item.ID - 1;
            if (index >= 0 && index < updatedState.length) {
              updatedState[index] = { image: item.URL };
            }
          });
          return updatedState;
        });
        updateMyImagesCtx(
          response?.map((item) => ({
            image: item.URL,
          })),
        );
        // updateMyImagesCtx(prevState => {
        //   const updatedState = [...prevState];
        //   response.forEach(item => {
        //     const index = item.ID - 1;
        //     if (index >= 0 && index < updatedState.length) {
        //       updatedState[index] = {image: item.URL};
        //     }
        //   });
        //   return updatedState;
        // });

        //TODO: will be removed one preferences api is fixed by backend
        updateCurrentUserCtx((prev) => ({
          ...prev,
          UserInfo: {
            ...prev.UserInfo,
            profilePicture: response?.[0].URL,
          },
        }));
      }
    } catch (error) {
      console.log("error in getting allowed values", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSavePressed = async () => {
    try {
      // for (let key in myProfilePreferences) {
      //   if (myProfilePreferences[key] !== myProfilePreferencesCtx[key]) {
      //     console.log('there are updates');
      //   } else {
      //     console.log('no new updates');
      //     return;
      //   }
      // }
      // return;
      setIsLoading(true);
      const response = await SaveMyProfilePreferencesService(
        UserEmail as string,
        myProfilePreferences,
      );

      console.log("response of saving =>>>>", response);

      if (response.Message === ApiResponseEnums.MY_PROFILE_PREFERENCES_SAVE) {
        setIsLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      setIsLoading(false);
      simpleToast("Something went wrong please try again later");
      console.log("error in saving preferences", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCategoryPressed = (title: string) => {
    setNewSelectedCategory((prevCategory) =>
      prevCategory === title ? "" : title,
    );
  };

  const onSubCategoryPressed = (
    title: string,
    subItem: string,
    parentCategory: string,
  ) => {
    const key =
      "Tap" + parentCategory?.replace(/\s+/g, "") + title?.replace(/\s+/g, "");

    const isSingleSelect = singleSelectTitles?.includes(title);

    setMyProfilePreferences((prev) => {
      const existingValue = prev[key as keyof IMyProfilePreferences] || "";

      const valuesArray = existingValue
        ? existingValue?.split(",").map((val) => val.trim())
        : [];

      let updatedArray;

      if (isSingleSelect) {
        // Single select logic
        if (valuesArray?.includes(subItem)) {
          updatedArray = [];
        } else {
          updatedArray = [subItem];
        }
      } else {
        // Multi-select logic
        if (valuesArray?.includes(subItem)) {
          updatedArray = valuesArray?.filter((val) => val !== subItem);
        } else {
          updatedArray = [...valuesArray, subItem];
        }
      }

      return {
        ...prev,
        [key]: updatedArray.join(", "),
      };
    });
  };
  // const onSubCategoryPressed = (
  //   title: string,
  //   subItem: string,
  //   parentCategory: string,
  // ) => {
  //   console.log('title', title);
  //   console.log('subItem,', subItem);
  //   console.log('parentCategory', parentCategory);

  //   const key =
  //     'Tap' + parentCategory.replace(/\s+/g, '') + title.replace(/\s+/g, '');
  //   setMyProfilePreferences(prev => {
  //     const existingValue = prev[key as keyof IMyProfilePreferences] || '';
  //     const valuesArray = existingValue
  //       ? existingValue?.split(',').map(val => val.trim())
  //       : [];
  //     let updatedArray;
  //     if (valuesArray?.includes(subItem)) {
  //       updatedArray = valuesArray?.filter(val => val !== subItem);
  //     } else {
  //       updatedArray = [...valuesArray, subItem];
  //     }
  //     return {
  //       ...prev,
  //       [key]: updatedArray.join(', '),
  //     };
  //   });
  // };

  const onChangeInputValues = (field: string, value: string) => {
    if (value?.charAt(0) === " ") {
      return;
    }
    if (field === "TapPersonalDetailsAboutMe") {
      if (value?.length > 500) {
        return;
      }
    }
    setMyProfilePreferences((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const onTabOnePressed = () => {
    setSelectedTab(1);
  };
  const onTabTwoPressed = () => {
    setSelectedTab(2);
  };

  const onGenderSelectPressed = () => {
    setIsHeightSelecting(false);
    setPickerPopupOptions(["Male", "Female"]);
    setIsHeightPopupVisible(true);
  };

  const onPickerChangeVal = (val: string) => {
    if (isHeightSelecting) {
      const match = val.match(/^(\d+)'(\d+)"/);
      const feet = match ? Number(match[1]) : 0;
      const inches = match ? Number(match[2]) : 0;

      setHeightAgeVal((prevValues) => ({
        ...prevValues,
        HeightFeet: feet,
        HeightInches: inches,
      }));
    } else {
      setHeightAgeVal((prevValues) => ({
        ...prevValues,
        Gender: val,
      }));
    }
  };

  const onHeightSelectPressed = () => {
    try {
      setIsHeightSelecting(true);
      const values = [];
      for (let feet = 1; feet <= 7; feet++) {
        for (let inches = 0; inches < 12; inches++) {
          if (feet === 7 && inches > 0) break;
          values.push(`${feet}'${inches}"`);
        }
      }
      setPickerPopupOptions(values);
      setIsHeightPopupVisible(true);
    } catch (error) {
      console.log("error in setting height picker values");
    }
  };

  const onPickerPopupConfirmPressed = () => {
    setIsHeightPopupVisible(false);
  };

  return (
    <MyPreferences
      myImagesData={myImagesData}
      allowedValues={allowedValues}
      selectedTab={selectedTab}
      isLoading={isLoading}
      newSelectedCategory={newSelectedCategory}
      myProfilePreferences={myProfilePreferences}
      isImageSelectionPopup={isImageSelectionPopup}
      //
      heightAgeVal={heightAgeVal}
      isHeightSelecting={isHeightSelecting}
      pickerPopupOptions={pickerPopupOptions}
      isHeightPopupVisible={isHeightPopupVisible}
      onPickerChangeVal={onPickerChangeVal}
      onHeightSelectPressed={onHeightSelectPressed}
      onGenderSelectPressed={onGenderSelectPressed}
      onPickerPopupConfirmPressed={onPickerPopupConfirmPressed}
      //
      onTabOnePressed={onTabOnePressed}
      onTabTwoPressed={onTabTwoPressed}
      onSavePressed={onSavePressed}
      onCategoryPressed={onCategoryPressed}
      onHandleSwitchVal={onHandleSwitchVal}
      onHeaderBackPressed={onHeaderBackPressed}
      onChangeInputValues={onChangeInputValues}
      onSubCategoryPressed={onSubCategoryPressed}
      onImageDeletePressed={onImageDeletePressed}
      onEditLocationPressed={onEditLocationPressed}
      onImageSelectionPressed={onImageSelectionPressed}
      onImageSelectionPopupClose={onImageSelectionPopupClose}
      onImageSelectionOptionPressed={onImageSelectionOptionPressed}
    />
  );
};
