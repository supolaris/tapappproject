import { ReactNode, createContext, useContext, useState } from "react";
import {
  IAllowedValues,
  ICurrentUser,
  IMyImagesData,
} from "../@types/apiInterfaces/commonInterface";
import { IMatchPreferences } from "../@types/apiInterfaces/MatchPreferencesInterface";
import { IMyProfilePreferences } from "../@types/apiInterfaces/MyProfilePreferencesInterface";

export interface ContextType {
  myImagesCtx: IMyImagesData[];
  updateMyImagesCtx: (data: ContextType["myImagesCtx"]) => void;
  currentUserCtx: ICurrentUser;
  updateCurrentUserCtx: (data: ContextType["currentUserCtx"]) => void;
  isInternetConnected: boolean | null;
  updateIsInternetConnected: (
    value: ContextType["isInternetConnected"],
  ) => void;
  allowedValuesCtx: IAllowedValues[];
  updateAllowedCtx: (data: ContextType["allowedValuesCtx"]) => void;
  myProfilePreferencesCtx: IMyProfilePreferences;
  updateMyProfilePreferencesCtx: (
    data: ContextType["myProfilePreferencesCtx"],
  ) => void;
  matchPreferencesCtx: IMatchPreferences;
  updateMatchPreferencesCtx: (data: ContextType["matchPreferencesCtx"]) => void;
}
const initialContextValue: ContextType = {
  myImagesCtx: [],
  updateMyImagesCtx: () => {},
  isInternetConnected: false,
  updateIsInternetConnected: () => {},
  currentUserCtx: {
    User: {
      ID: -1,
      CreatedAt: "",
      UpdatedAt: "",
      DeletedAt: null,
      Login: "",
      UserFirstName: "",
      UserLastName: "",
      UserExternalID: "",
      UserExternalSystem: "",
      PersonID: -1,
      UserExternalPicURL: "",
      LastLogin: "",
      LastLoginCountry: "",
      LastLoginCity: "",
      LastLoginIP: "",
    },
    UserInfo: {
      ID: -1,
      CreatedAt: "",
      UpdatedAt: "",
      DeletedAt: null,
      Name: "",
      FirstName: "",
      MiddleName: "",
      LastName: "",
      Gender: "",
      DOB: "",
      Language: "",
      // Country: '',
      TimeZone: "",
      Addresses: null,
      ContactInfo: null,
      UserInfoID: -1,
      profile_type: "",
      HeightFeet: -1,
      HeightInches: -1,
    },
    UserRoles: {
      UserRoleList: null,
      LastGranted: "",
    },
  },
  updateCurrentUserCtx: () => {},
  myProfilePreferencesCtx: {
    // TapLanguages: [],
    TapLifestylePets: "",
    TapPrivacyShowAge: false,
    TapLifestyleOpenTo: "",
    TapPersonalityType: "",
    TapLifestyleSmoking: "",
    TapLifestyleWorkout: "",
    TapLanguagesLanguage: "",
    TapPersonalityTrait: "",
    TapLifestyleDrinking: "",
    TapLifestyleCannabis: "",
    TapDiscoveryLocation: "",
    TapProfessionalSchool: "",
    TapGoingOutSocialVibe: "",
    TapGoingOutDressStyle: "",
    TapPrivacyShowGender: false,
    TapLifestyleLifestyle: "",
    TapCurLocationLivingIn: "",
    TapProfessionalCompany: "",
    TapLifestyleLookingFor: "",
    TapPersonalityLoveStyle: "",
    TapProfessionalLanguage: "",
    TapProfessionalJobTitle: "",
    TapLifestyleSocialMedia: "",
    TapMyWeekendsPaceEnergy: "",
    TapMyWeekendsActivities: "",
    TapPrivacyShowDistance: false,
    TapPersonalDetailsGender: "",
    TapPersonalDetailsZodiac: "",
    TapPersonalDetailsOpenTo: "",
    TapMyWeekendsSocialEnergy: "",
    TapMyWeekendsSocialHabits: "",
    TapPersonalDetailsAboutMe: "",
    TapLifestyleSleepingHabits: "",
    TapPersonalityLoveLanguage: "",
    TapPrivacyShowSmartPhotos: false,
    TapPersonalDetailsInterests: "",
    TapPersonalDetailsEducation: "",
    TapLifestyleWorkoutFrequency: "",
    TapPersonalDetailsLookingFor: "",
    TapPersonalDetailsFamilyPlans: "",
    TapLifestyleDietaryPreference: "",
    TapGoingOutPreferredActivities: "",
    TapPrivacyShowCurrentLocation: false,
    TapPersonalityCommunicationStyle: "",
    // TapHealthAndWellnessCovidVaccine: false,
    TapPersonalDetailsSexualOrientation: "",
    TapPersonalDetailsRelationshipGoals: "",
    TapMusicAndEntertainmentSpotifyAnthem: "",
    TapMyCommunicationStyleResponsiveness: "",
    TapMyCommunicationStylePhoneUsageHabits: "",
    TapMusicAndEntertainmentTopSpotifyArtists: "",
    TapMyCommunicationStylePreferredCommunicationMethod: "",
    CurLocation: {
      TapProfilelng: 0,
      TapProfilelat: 0,
      tap_profile_id: 0,
      TapProfileAreaName: "",
      TapProfileCityName: "",
      TapProfileCountryName: "",
      TapProfileCountryCode: "",
    },
    images: [],
  },
  updateMyProfilePreferencesCtx: () => {},
  matchPreferencesCtx: {
    // TapLanguages: [],
    TapLifestylePets: "",
    TapLifestyleOpenTo: "",
    TapPersonalityType: "",
    TapLifestyleSmoking: "",
    TapLifestyleWorkout: "",
    TapLanguagesLanguage: "",
    TapPersonalityTrait: "",
    TapLifestyleDrinking: "",
    TapLifestyleCannabis: "",
    TapDiscoveryLocation: "",
    TapDiscoveryHasABio: false,
    TapProfessionalSchool: "",
    TapGoingOutSocialVibe: "",
    TapGoingOutDressStyle: "",
    TapLifestyleLifestyle: "",
    TapCurLocationLivingIn: "",
    TapProfessionalCompany: "",
    TapLifestyleLookingFor: "",
    TapPersonalityLoveStyle: "",
    TapProfessionalLanguage: "",
    TapProfessionalJobTitle: "",
    TapLifestyleSocialMedia: "",
    TapMyWeekendsPaceEnergy: "",
    TapMyWeekendsActivities: "",
    TapPersonalDetailsGender: "",
    TapPersonalDetailsZodiac: "",
    TapPersonalDetailsOpenTo: "",
    TapMyWeekendsSocialEnergy: "",
    TapMyWeekendsSocialHabits: "",
    TapPersonalDetailsAboutMe: "",
    TapLifestyleSleepingHabits: "",
    TapPersonalityLoveLanguage: "",
    TapPersonalDetailsInterests: "",
    TapPersonalDetailsEducation: "",
    TapDiscoveryMaximumDistance: 0,
    TapDiscoveryAgeRangeMinimum: 0,
    TapDiscoveryAgeRangeMaximum: 0,
    TapLifestyleWorkoutFrequency: "",
    TapPersonalDetailsLookingFor: "",
    TapPersonalDetailsFamilyPlans: "",
    TapDiscoveryMaxNumberOfPhotos: 0,
    TapLifestyleDietaryPreference: "",
    TapGoingOutPreferredActivities: "",
    TapPersonalityCommunicationStyle: "",
    // TapHealthAndWellnessCovidVaccine: false,
    TapPersonalDetailsSexualOrientation: "",
    TapPersonalDetailsRelationshipGoals: "",
    TapMusicAndEntertainmentSpotifyAnthem: "",
    TapMyCommunicationStyleResponsiveness: "",
    TapMyCommunicationStylePhoneUsageHabits: "",
    TapMusicAndEntertainmentTopSpotifyArtists: "",
    TapMyCommunicationStylePreferredCommunicationMethod: "",
    CurLocation: {
      TapProfilelng: 0,
      TapProfilelat: 0,
      tap_profile_id: 0,
      TapProfileAreaName: "",
      TapProfileCityName: "",
      TapProfileCountryName: "",
      TapProfileCountryCode: "",
    },
  },
  updateMatchPreferencesCtx: () => {},
  allowedValuesCtx: [],
  updateAllowedCtx: () => {},
};

const userContext = createContext<ContextType>(initialContextValue);
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [myImagesCtx, setMyImagesCtx] = useState<ContextType["myImagesCtx"]>(
    initialContextValue.myImagesCtx,
  );

  const updateMyImagesCtx = (state: ContextType["myImagesCtx"]) => {
    setMyImagesCtx(state);
  };

  const [isInternetConnected, setIsInternetConnected] = useState<
    ContextType["isInternetConnected"]
  >(initialContextValue.isInternetConnected);

  const updateIsInternetConnected = (
    state: ContextType["isInternetConnected"],
  ) => {
    setIsInternetConnected(state);
  };

  const [currentUserCtx, setUserData] = useState<ContextType["currentUserCtx"]>(
    initialContextValue.currentUserCtx,
  );
  const updateCurrentUserCtx = (data: ContextType["currentUserCtx"]) => {
    console.log("data", data);

    setUserData(data);
  };

  const [allowedValuesCtx, setAllowedValuesData] = useState<
    ContextType["allowedValuesCtx"]
  >(initialContextValue.allowedValuesCtx);
  const updateAllowedCtx = (data: ContextType["allowedValuesCtx"]) => {
    setAllowedValuesData(data);
  };

  const [myProfilePreferencesCtx, setMyProfilePreferences] = useState<
    ContextType["myProfilePreferencesCtx"]
  >(initialContextValue.myProfilePreferencesCtx);
  const updateMyProfilePreferencesCtx = (
    data: ContextType["myProfilePreferencesCtx"],
  ) => {
    setMyProfilePreferences(data);
  };

  const [matchPreferencesCtx, setMatchPreferences] = useState<
    ContextType["matchPreferencesCtx"]
  >(initialContextValue.matchPreferencesCtx);
  const updateMatchPreferencesCtx = (
    data: ContextType["matchPreferencesCtx"],
  ) => {
    setMatchPreferences(data);
  };

  return (
    <userContext.Provider
      value={{
        myImagesCtx,
        updateMyImagesCtx,
        currentUserCtx,
        updateCurrentUserCtx,
        allowedValuesCtx,
        updateAllowedCtx,
        matchPreferencesCtx,
        updateMatchPreferencesCtx,
        isInternetConnected,
        updateIsInternetConnected,
        myProfilePreferencesCtx,
        updateMyProfilePreferencesCtx,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
export const UserContext = () => {
  const context = useContext(userContext);
  return context;
};
