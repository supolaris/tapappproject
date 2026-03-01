import React, { useEffect, useState } from "react";
import { IMatchPreferences } from "../../@types/apiInterfaces/MatchPreferencesInterface";
import { IAllowedValues } from "../../@types/apiInterfaces/commonInterface";
import { singleSelectTitles } from "../../constants/StaticData";
import { UserContext } from "../../context/Context";
import {
  GetAllowedValuesService,
  SavePreferencesService,
} from "../../services/MyPreferenceServices";
import { GetMatchPreferencesService } from "../../services/MyProfileServices";
import { simpleToast } from "../../utils/CommonFunctions";
import MatchPreferences from "./MatchPreferences";

export const MatchPreferencesScreen = () => {
  const { matchPreferencesCtx, updateAllowedCtx, updateMatchPreferencesCtx } =
    UserContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allowedValues, setAllowedValues] = useState<IAllowedValues[]>([]);
  const [newSelectedCategory, setNewSelectedCategory] = useState<string>("");
  const [isAlertPopupVisible, setIsAlertPopupVisible] =
    useState<boolean>(false);
  const [matchPreferences, setMatchPreferences] = useState<IMatchPreferences>({
    // TapLanguages: matchPreferencesCtx?.TapLanguages || [],
    TapLifestylePets: matchPreferencesCtx?.TapLifestylePets || "",
    TapLifestyleOpenTo: matchPreferencesCtx?.TapLifestyleOpenTo || "",
    TapPersonalityType: matchPreferencesCtx?.TapPersonalityType || "",
    TapLifestyleSmoking: matchPreferencesCtx?.TapLifestyleSmoking || "",
    TapLifestyleWorkout: matchPreferencesCtx?.TapLifestyleWorkout || "",
    TapLanguagesLanguage: matchPreferencesCtx?.TapLanguagesLanguage || "",
    TapPersonalityTrait: matchPreferencesCtx?.TapPersonalityTrait || "",
    TapLifestyleDrinking: matchPreferencesCtx?.TapLifestyleDrinking || "",
    TapLifestyleCannabis: matchPreferencesCtx?.TapLifestyleCannabis || "",
    TapDiscoveryLocation: matchPreferencesCtx?.TapDiscoveryLocation || "",
    TapDiscoveryHasABio: matchPreferencesCtx?.TapDiscoveryHasABio ?? false,
    TapProfessionalSchool: matchPreferencesCtx?.TapProfessionalSchool || "",
    TapGoingOutSocialVibe: matchPreferencesCtx?.TapGoingOutSocialVibe || "",
    TapGoingOutDressStyle: matchPreferencesCtx?.TapGoingOutDressStyle || "",
    TapLifestyleLifestyle: matchPreferencesCtx?.TapLifestyleLifestyle || "",
    TapCurLocationLivingIn: matchPreferencesCtx?.TapCurLocationLivingIn || "",
    TapProfessionalCompany: matchPreferencesCtx?.TapProfessionalCompany || "",
    TapLifestyleLookingFor: matchPreferencesCtx?.TapLifestyleLookingFor || "",
    TapPersonalityLoveStyle: matchPreferencesCtx?.TapPersonalityLoveStyle || "",
    TapProfessionalLanguage: matchPreferencesCtx?.TapProfessionalLanguage || "",
    TapProfessionalJobTitle: matchPreferencesCtx?.TapProfessionalJobTitle || "",
    TapLifestyleSocialMedia: matchPreferencesCtx?.TapLifestyleSocialMedia || "",
    TapMyWeekendsPaceEnergy: matchPreferencesCtx?.TapMyWeekendsPaceEnergy || "",
    TapMyWeekendsActivities: matchPreferencesCtx?.TapMyWeekendsActivities || "",
    TapPersonalDetailsGender:
      matchPreferencesCtx?.TapPersonalDetailsGender || "",
    TapPersonalDetailsZodiac:
      matchPreferencesCtx?.TapPersonalDetailsZodiac || "",
    TapPersonalDetailsOpenTo:
      matchPreferencesCtx?.TapPersonalDetailsOpenTo || "",
    TapMyWeekendsSocialEnergy:
      matchPreferencesCtx?.TapMyWeekendsSocialEnergy || "",
    TapMyWeekendsSocialHabits:
      matchPreferencesCtx?.TapMyWeekendsSocialHabits || "",
    TapPersonalDetailsAboutMe:
      matchPreferencesCtx?.TapPersonalDetailsAboutMe || "",
    TapLifestyleSleepingHabits:
      matchPreferencesCtx?.TapLifestyleSleepingHabits || "",
    TapPersonalityLoveLanguage:
      matchPreferencesCtx?.TapPersonalityLoveLanguage || "",
    TapPersonalDetailsInterests:
      matchPreferencesCtx?.TapPersonalDetailsInterests || "",
    TapPersonalDetailsEducation:
      matchPreferencesCtx?.TapPersonalDetailsEducation || "",
    TapDiscoveryMaximumDistance:
      matchPreferencesCtx?.TapDiscoveryMaximumDistance ?? 0,
    TapDiscoveryAgeRangeMinimum:
      matchPreferencesCtx?.TapDiscoveryAgeRangeMinimum ?? 0,
    TapDiscoveryAgeRangeMaximum:
      matchPreferencesCtx?.TapDiscoveryAgeRangeMaximum ?? 0,
    TapLifestyleWorkoutFrequency:
      matchPreferencesCtx?.TapLifestyleWorkoutFrequency || "",
    TapPersonalDetailsLookingFor:
      matchPreferencesCtx?.TapPersonalDetailsLookingFor || "",
    TapPersonalDetailsFamilyPlans:
      matchPreferencesCtx?.TapPersonalDetailsFamilyPlans || "",
    TapDiscoveryMaxNumberOfPhotos:
      matchPreferencesCtx?.TapDiscoveryMaxNumberOfPhotos ?? 0,
    TapLifestyleDietaryPreference:
      matchPreferencesCtx?.TapLifestyleDietaryPreference || "",
    TapGoingOutPreferredActivities:
      matchPreferencesCtx?.TapGoingOutPreferredActivities || "",
    TapPersonalityCommunicationStyle:
      matchPreferencesCtx?.TapPersonalityCommunicationStyle || "",
    TapHealthAndWellnessCovidVaccine:
      matchPreferencesCtx?.TapHealthAndWellnessCovidVaccine ?? false,
    TapPersonalDetailsSexualOrientation:
      matchPreferencesCtx?.TapPersonalDetailsSexualOrientation || "",
    TapPersonalDetailsRelationshipGoals:
      matchPreferencesCtx?.TapPersonalDetailsRelationshipGoals || "",
    TapMusicAndEntertainmentSpotifyAnthem:
      matchPreferencesCtx?.TapMusicAndEntertainmentSpotifyAnthem || "",
    TapMyCommunicationStyleResponsiveness:
      matchPreferencesCtx?.TapMyCommunicationStyleResponsiveness || "",
    TapMyCommunicationStylePhoneUsageHabits:
      matchPreferencesCtx?.TapMyCommunicationStylePhoneUsageHabits || "",
    TapMusicAndEntertainmentTopSpotifyArtists:
      matchPreferencesCtx?.TapMusicAndEntertainmentTopSpotifyArtists || "",
    TapMyCommunicationStylePreferredCommunicationMethod:
      matchPreferencesCtx?.TapMyCommunicationStylePreferredCommunicationMethod ||
      "",
    CurLocation: {
      TapProfilelng: matchPreferencesCtx?.CurLocation?.TapProfilelng ?? 0,
      TapProfilelat: matchPreferencesCtx?.CurLocation?.TapProfilelat ?? 0,
      tap_profile_id: matchPreferencesCtx?.CurLocation?.tap_profile_id ?? 0,
      TapProfileAreaName:
        matchPreferencesCtx?.CurLocation?.TapProfileAreaName || "",
      TapProfileCityName:
        matchPreferencesCtx?.CurLocation?.TapProfileCityName || "",
      TapProfileCountryName:
        matchPreferencesCtx?.CurLocation?.TapProfileCountryName || "",
      TapProfileCountryCode:
        matchPreferencesCtx?.CurLocation?.TapProfileCountryCode || "",
    },
  });

  useEffect(() => {
    getAllowedValues();
    getMatchPreferences();
  }, []);

  useEffect(() => {
    setMatchPreferences((preVal) => ({
      ...preVal,
      CurLocation: matchPreferencesCtx?.CurLocation,
    }));
  }, [matchPreferencesCtx?.CurLocation]);

  const getMatchPreferences = async () => {
    try {
      setIsLoading(true);
      const response = await GetMatchPreferencesService();
      if (response) {
        updateMatchPreferencesCtx({
          // TapLanguages: response?.preferences?.TapLanguages || [],
          TapLifestylePets: response?.preferences?.TapLifestylePets || "",
          TapLifestyleOpenTo: response?.preferences?.TapLifestyleOpenTo || "",
          TapPersonalityType: response?.preferences?.TapPersonalityType || "",
          TapLifestyleSmoking: response?.preferences?.TapLifestyleSmoking || "",
          TapLifestyleWorkout: response?.preferences?.TapLifestyleWorkout || "",
          TapLanguagesLanguage:
            response?.preferences?.TapLanguagesLanguage || "",
          TapPersonalityTrait: response?.preferences?.TapPersonalityTrait || "",
          TapLifestyleDrinking:
            response?.preferences?.TapLifestyleDrinking || "",
          TapLifestyleCannabis:
            response?.preferences?.TapLifestyleCannabis || "",
          TapDiscoveryLocation:
            response?.preferences?.TapDiscoveryLocation || "",
          TapDiscoveryHasABio:
            response?.preferences?.TapDiscoveryHasABio ?? false,
          TapProfessionalSchool:
            response?.preferences?.TapProfessionalSchool || "",
          TapGoingOutSocialVibe:
            response?.preferences?.TapGoingOutSocialVibe || "",
          TapGoingOutDressStyle:
            response?.preferences?.TapGoingOutDressStyle || "",
          TapLifestyleLifestyle:
            response?.preferences?.TapLifestyleLifestyle || "",
          TapCurLocationLivingIn:
            response?.preferences?.TapCurLocationLivingIn || "",
          TapProfessionalCompany:
            response?.preferences?.TapProfessionalCompany || "",
          TapLifestyleLookingFor:
            response?.preferences?.TapLifestyleLookingFor || "",
          TapPersonalityLoveStyle:
            response?.preferences?.TapPersonalityLoveStyle || "",
          TapProfessionalLanguage:
            response?.preferences?.TapProfessionalLanguage || "",
          TapProfessionalJobTitle:
            response?.preferences?.TapProfessionalJobTitle || "",
          TapLifestyleSocialMedia:
            response?.preferences?.TapLifestyleSocialMedia || "",
          TapMyWeekendsPaceEnergy:
            response?.preferences?.TapMyWeekendsPaceEnergy || "",
          TapMyWeekendsActivities:
            response?.preferences?.TapMyWeekendsActivities || "",
          TapPersonalDetailsGender:
            response?.preferences?.TapPersonalDetailsGender || "",
          TapPersonalDetailsZodiac:
            response?.preferences?.TapPersonalDetailsZodiac || "",
          TapPersonalDetailsOpenTo:
            response?.preferences?.TapPersonalDetailsOpenTo || "",
          TapMyWeekendsSocialEnergy:
            response?.preferences?.TapMyWeekendsSocialEnergy || "",
          TapMyWeekendsSocialHabits:
            response?.preferences?.TapMyWeekendsSocialHabits || "",
          TapPersonalDetailsAboutMe:
            response?.preferences?.TapPersonalDetailsAboutMe || "",
          TapLifestyleSleepingHabits:
            response?.preferences?.TapLifestyleSleepingHabits || "",
          TapPersonalityLoveLanguage:
            response?.preferences?.TapPersonalityLoveLanguage || "",
          TapPersonalDetailsInterests:
            response?.preferences?.TapPersonalDetailsInterests || "",
          TapPersonalDetailsEducation:
            response?.preferences?.TapPersonalDetailsEducation || "",
          TapDiscoveryMaximumDistance:
            response?.preferences?.TapDiscoveryMaximumDistance ?? 0,
          TapDiscoveryAgeRangeMinimum:
            response?.preferences?.TapDiscoveryAgeRangeMinimum ?? 0,
          TapDiscoveryAgeRangeMaximum:
            response?.preferences?.TapDiscoveryAgeRangeMaximum ?? 0,
          TapLifestyleWorkoutFrequency:
            response?.preferences?.TapLifestyleWorkoutFrequency || "",
          TapPersonalDetailsLookingFor:
            response?.preferences?.TapPersonalDetailsLookingFor || "",
          TapPersonalDetailsFamilyPlans:
            response?.preferences?.TapPersonalDetailsFamilyPlans || "",
          TapDiscoveryMaxNumberOfPhotos:
            response?.preferences?.TapDiscoveryMaxNumberOfPhotos ?? 0,
          TapLifestyleDietaryPreference:
            response?.preferences?.TapLifestyleDietaryPreference || "",
          TapGoingOutPreferredActivities:
            response?.preferences?.TapGoingOutPreferredActivities || "",
          TapPersonalityCommunicationStyle:
            response?.preferences?.TapPersonalityCommunicationStyle || "",
          TapHealthAndWellnessCovidVaccine:
            response?.preferences?.TapHealthAndWellnessCovidVaccine ?? false,
          TapPersonalDetailsSexualOrientation:
            response?.preferences?.TapPersonalDetailsSexualOrientation || "",
          TapPersonalDetailsRelationshipGoals:
            response?.preferences?.TapPersonalDetailsRelationshipGoals || "",
          TapMusicAndEntertainmentSpotifyAnthem:
            response?.preferences?.TapMusicAndEntertainmentSpotifyAnthem || "",
          TapMyCommunicationStyleResponsiveness:
            response?.preferences?.TapMyCommunicationStyleResponsiveness || "",
          TapMyCommunicationStylePhoneUsageHabits:
            response?.preferences?.TapMyCommunicationStylePhoneUsageHabits ||
            "",
          TapMusicAndEntertainmentTopSpotifyArtists:
            response?.preferences?.TapMusicAndEntertainmentTopSpotifyArtists ||
            "",
          TapMyCommunicationStylePreferredCommunicationMethod:
            response?.preferences
              ?.TapMyCommunicationStylePreferredCommunicationMethod || "",
          CurLocation: {
            TapProfilelng:
              response?.preferences?.CurLocation?.TapProfilelng ?? 0,
            TapProfilelat:
              response?.preferences?.CurLocation?.TapProfilelat ?? 0,
            tap_profile_id:
              response?.preferences?.CurLocation?.tap_profile_id ?? 0,
            TapProfileAreaName:
              response?.preferences?.CurLocation?.TapProfileAreaName || "",
            TapProfileCityName:
              response?.preferences?.CurLocation?.TapProfileCityName || "",
            TapProfileCountryName:
              response?.preferences?.CurLocation?.TapProfileCountryName || "",
            TapProfileCountryCode:
              response?.preferences?.CurLocation?.TapProfileCountryCode || "",
          },
        });
        setMatchPreferences({
          // TapLanguages: response?.preferences?.TapLanguages || [],
          TapLifestylePets: response?.preferences?.TapLifestylePets || "",
          TapLifestyleOpenTo: response?.preferences?.TapLifestyleOpenTo || "",
          TapPersonalityType: response?.preferences?.TapPersonalityType || "",
          TapLifestyleSmoking: response?.preferences?.TapLifestyleSmoking || "",
          TapLifestyleWorkout: response?.preferences?.TapLifestyleWorkout || "",
          TapLanguagesLanguage:
            response?.preferences?.TapLanguagesLanguage || "",
          TapPersonalityTrait: response?.preferences?.TapPersonalityTrait || "",
          TapLifestyleDrinking:
            response?.preferences?.TapLifestyleDrinking || "",
          TapLifestyleCannabis:
            response?.preferences?.TapLifestyleCannabis || "",
          TapDiscoveryLocation:
            response?.preferences?.TapDiscoveryLocation || "",
          TapDiscoveryHasABio:
            response?.preferences?.TapDiscoveryHasABio ?? false,
          TapProfessionalSchool:
            response?.preferences?.TapProfessionalSchool || "",
          TapGoingOutSocialVibe:
            response?.preferences?.TapGoingOutSocialVibe || "",
          TapGoingOutDressStyle:
            response?.preferences?.TapGoingOutDressStyle || "",
          TapLifestyleLifestyle:
            response?.preferences?.TapLifestyleLifestyle || "",
          TapCurLocationLivingIn:
            response?.preferences?.TapCurLocationLivingIn || "",
          TapProfessionalCompany:
            response?.preferences?.TapProfessionalCompany || "",
          TapLifestyleLookingFor:
            response?.preferences?.TapLifestyleLookingFor || "",
          TapPersonalityLoveStyle:
            response?.preferences?.TapPersonalityLoveStyle || "",
          TapProfessionalLanguage:
            response?.preferences?.TapProfessionalLanguage || "",
          TapProfessionalJobTitle:
            response?.preferences?.TapProfessionalJobTitle || "",
          TapLifestyleSocialMedia:
            response?.preferences?.TapLifestyleSocialMedia || "",
          TapMyWeekendsPaceEnergy:
            response?.preferences?.TapMyWeekendsPaceEnergy || "",
          TapMyWeekendsActivities:
            response?.preferences?.TapMyWeekendsActivities || "",
          TapPersonalDetailsGender:
            response?.preferences?.TapPersonalDetailsGender || "",
          TapPersonalDetailsZodiac:
            response?.preferences?.TapPersonalDetailsZodiac || "",
          TapPersonalDetailsOpenTo:
            response?.preferences?.TapPersonalDetailsOpenTo || "",
          TapMyWeekendsSocialEnergy:
            response?.preferences?.TapMyWeekendsSocialEnergy || "",
          TapMyWeekendsSocialHabits:
            response?.preferences?.TapMyWeekendsSocialHabits || "",
          TapPersonalDetailsAboutMe:
            response?.preferences?.TapPersonalDetailsAboutMe || "",
          TapLifestyleSleepingHabits:
            response?.preferences?.TapLifestyleSleepingHabits || "",
          TapPersonalityLoveLanguage:
            response?.preferences?.TapPersonalityLoveLanguage || "",
          TapPersonalDetailsInterests:
            response?.preferences?.TapPersonalDetailsInterests || "",
          TapPersonalDetailsEducation:
            response?.preferences?.TapPersonalDetailsEducation || "",
          TapDiscoveryMaximumDistance:
            response?.preferences?.TapDiscoveryMaximumDistance ?? 0,
          TapDiscoveryAgeRangeMinimum:
            response?.preferences?.TapDiscoveryAgeRangeMinimum ?? 0,
          TapDiscoveryAgeRangeMaximum:
            response?.preferences?.TapDiscoveryAgeRangeMaximum ?? 0,
          TapLifestyleWorkoutFrequency:
            response?.preferences?.TapLifestyleWorkoutFrequency || "",
          TapPersonalDetailsLookingFor:
            response?.preferences?.TapPersonalDetailsLookingFor || "",
          TapPersonalDetailsFamilyPlans:
            response?.preferences?.TapPersonalDetailsFamilyPlans || "",
          TapDiscoveryMaxNumberOfPhotos:
            response?.preferences?.TapDiscoveryMaxNumberOfPhotos ?? 0,
          TapLifestyleDietaryPreference:
            response?.preferences?.TapLifestyleDietaryPreference || "",
          TapGoingOutPreferredActivities:
            response?.preferences?.TapGoingOutPreferredActivities || "",
          TapPersonalityCommunicationStyle:
            response?.preferences?.TapPersonalityCommunicationStyle || "",
          TapHealthAndWellnessCovidVaccine:
            response?.preferences?.TapHealthAndWellnessCovidVaccine ?? false,
          TapPersonalDetailsSexualOrientation:
            response?.preferences?.TapPersonalDetailsSexualOrientation || "",
          TapPersonalDetailsRelationshipGoals:
            response?.preferences?.TapPersonalDetailsRelationshipGoals || "",
          TapMusicAndEntertainmentSpotifyAnthem:
            response?.preferences?.TapMusicAndEntertainmentSpotifyAnthem || "",
          TapMyCommunicationStyleResponsiveness:
            response?.preferences?.TapMyCommunicationStyleResponsiveness || "",
          TapMyCommunicationStylePhoneUsageHabits:
            response?.preferences?.TapMyCommunicationStylePhoneUsageHabits ||
            "",
          TapMusicAndEntertainmentTopSpotifyArtists:
            response?.preferences?.TapMusicAndEntertainmentTopSpotifyArtists ||
            "",
          TapMyCommunicationStylePreferredCommunicationMethod:
            response?.preferences
              ?.TapMyCommunicationStylePreferredCommunicationMethod || "",
          CurLocation: {
            TapProfilelng:
              response?.preferences?.CurLocation?.TapProfilelng ?? 0,
            TapProfilelat:
              response?.preferences?.CurLocation?.TapProfilelat ?? 0,
            tap_profile_id:
              response?.preferences?.CurLocation?.tap_profile_id ?? 0,
            TapProfileAreaName:
              response?.preferences?.CurLocation?.TapProfileAreaName || "",
            TapProfileCityName:
              response?.preferences?.CurLocation?.TapProfileCityName || "",
            TapProfileCountryName:
              response?.preferences?.CurLocation?.TapProfileCountryName || "",
            TapProfileCountryCode:
              response?.preferences?.CurLocation?.TapProfileCountryCode || "",
          },
        });
      }
    } catch (error) {
      console.log("error in getting selected preferences", error);
    } finally {
      setIsLoading(false);
    }
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

  const onSavePressed = async () => {
    saveUpdates();
    console.log("first");
  };

  const saveUpdates = async () => {
    try {
      // let isPreferencesDifferent = false;
      // for (let key in matchPreferences) {
      //   if (matchPreferences[key] !== matchPreferencesCtx[key]) {
      //     isPreferencesDifferent = true;
      //     break;
      //   }
      // }
      // if (!isPreferencesDifferent) {
      //   simpleToast('No updates to save');
      //   return;
      // }

      setIsLoading(true);
      const response = await SavePreferencesService(matchPreferences);
      if (response.Message === "Updated") {
        setIsLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      setIsLoading(false);
      simpleToast("Something went wrong please try again later");
      console.log("error in saving preferences", error);
    }
  };

  const onHeaderBackPressed = () => {
    // let isPreferencesDifferent = false;
    // for (let key in matchPreferences) {
    //   if (matchPreferences[key] !== matchPreferencesCtx[key]) {
    //     isPreferencesDifferent = true;
    //     break;
    //   }
    // }
    // if (isPreferencesDifferent) {
    //   setIsAlertPopupVisible(true);
    // } else {
    // }
    navigation.goBack();
  };

  const onAlertPopupCancel = () => {
    setIsAlertPopupVisible(false);
    navigation.goBack();
  };
  const onAlertPopupConfirm = () => {
    setIsAlertPopupVisible(false);
    saveUpdates();
  };

  ///
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

    setMatchPreferences((prev) => {
      const existingValue = prev[key as keyof IMatchPreferences] || "";

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
  //   const key =
  //     'Tap' + parentCategory.replace(/\s+/g, '') + title.replace(/\s+/g, '');

  //   setMatchPreferences(prev => {
  //     const existingValue = prev[key as keyof IMatchPreferences] || '';
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

  const onLocationPressed = async () => {
    navigation.navigate("EditCityScreen", {
      isMatchPreferencesFlow: true,
    });
  };

  const onHandleSwitchVal = (val: number) => {
    if (val === 1) {
      setMatchPreferences((preVal) => ({
        ...preVal,
        TapDiscoveryHasABio: !preVal.TapDiscoveryHasABio,
      }));
    }
  };

  const onSliderValueChange = (field: number, val: number[]) => {
    if (field === 1) {
      setMatchPreferences((prev) => ({
        ...prev,
        TapDiscoveryMaximumDistance: val[0],
      }));
    } else if (field === 2) {
      setMatchPreferences((prev) => ({
        ...prev,
        TapDiscoveryMaxNumberOfPhotos: val[0],
      }));
    } else if (field === 3) {
      setMatchPreferences((prev) => ({
        ...prev,
        TapDiscoveryAgeRangeMinimum: val[0],
        TapDiscoveryAgeRangeMaximum: val[1],
      }));
    }
  };

  return (
    <MatchPreferences
      isLoading={isLoading}
      allowedValues={allowedValues}
      newSelectedCategory={newSelectedCategory}
      isAlertPopupVisible={isAlertPopupVisible}
      matchPreferences={matchPreferences}
      onSavePressed={onSavePressed}
      onLocationPressed={onLocationPressed}
      onHandleSwitchVal={onHandleSwitchVal}
      onCategoryPressed={onCategoryPressed}
      onAlertPopupCancel={onAlertPopupCancel}
      onAlertPopupConfirm={onAlertPopupConfirm}
      onHeaderBackPressed={onHeaderBackPressed}
      onSliderValueChange={onSliderValueChange}
      onSubCategoryPressed={onSubCategoryPressed}
    />
  );
};
