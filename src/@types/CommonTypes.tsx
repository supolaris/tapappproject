import { ImageSourcePropType } from "react-native";
import { InteractionsEnums } from "../constants/AppEnums";
import { ItemsData } from "../constants/StaticData";
import { Nullable } from "./apiInterfaces/commonInterface";

export type ItemsDataType = keyof typeof ItemsData;

export interface ICountriesData {
  name: string;
  code: string;
}

export interface IHomeUserData {
  id: number;
  name: string;
  age: string;
  locationDistance: string;
  picture: ImageSourcePropType;
}

export interface IFormValues {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  DOB: string;
  Country: string;
  // Email: string;
  Gender: string;
  // Cell: string;
  BillingAddress1: string;
  BillingAddress2: string;
  BillingCity: string;
  BillingState: string;
  BillingPincode: string;
  // ProfilePicLink: string;
  HeightFeet?: number;
  HeightInches?: number;
}

export interface IHeightAgeVal {
  HeightFeet: number;
  HeightInches: number;
  Gender: string;
}

export interface ILikesSentReceiveData {
  id: number;
  hoursLeft: number;
  image: ImageSourcePropType;
  interaction: InteractionsEnums;
}

export interface IUserImages {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  tap_profile_id: number;
  image_url: string;
  order: number;
}
export interface IUserCurlLocation {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  tap_profile_id: number;
  TapProfilelng: number;
  TapProfilelat: number;
  TapProfileCountryName: string;
  TapProfileCountryCode: string;
  TapProfileAreaName: string;
  TapProfileCityName: string;
}

export interface ICreatedUpdatedDeleted {
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: Nullable<string>;
}

export interface IUserProfile extends ICreatedUpdatedDeleted {
  ID: number;
  TapUserID: number;
  TapProfessionalJobTitle: string;
  TapProfessionalCompany: string;
  TapProfessionalSchool: string;
  TapProfessionalLanguage: string;
  TapLifestylePets: string;
  TapLifestyleDrinking: string;
  TapLifestyleSmoking: string;
  TapLifestyleCannabis: string;
  TapLifestyleWorkoutFrequency: string;
  TapLifestyleDietaryPreference: string;
  TapLifestyleSleepingHabits: string;
  TapLifestyleSocialMedia: string;
  TapMusicAndEntertainmentSpotifyAnthem: string;
  TapMusicAndEntertainmentTopSpotifyArtists: string;
  TapPersonalDetailsSexualOrientation: string;
  TapPersonalDetailsRelationshipGoals: string;
  TapPersonalDetailsAboutMe: string;
  TapPersonalDetailsInterests: string;
  TapPersonalDetailsZodiac: string;
  TapPersonalDetailsEducation: string;
  TapPersonalDetailsFamilyPlans: string;
  TapPersonalDetailsLookingFor: string;
  TapPersonalDetailsOpenTo: string;
  TapCurLocationLivingIn: string;
  TapHealthAndWellnessCovidVaccine: boolean;
  TapPersonalityType: string;
  TapPersonalityCommunicationStyle: string;
  TapPersonalityLoveStyle: string;
  TapPersonalityLoveLanguage: string;
  TapPersonalityTrait: string;
  TapGoingOutSocialVibe: string;
  TapGoingOutPreferredActivities: string;
  TapGoingOutDressStyle: string;
  TapMyWeekendsPaceEnergy: string;
  TapMyWeekendsSocialEnergy: string;
  TapMyWeekendsActivities: string;
  TapMyWeekendsSocialHabits: string;
  TapMyCommunicationStyleResponsiveness: string;
  TapMyCommunicationStylePreferredCommunicationMethod: string;
  TapMyCommunicationStylePhoneUsageHabits: string;
  TapPrivacyShowAge: boolean;
  TapPrivacyShowDistance: boolean;
  TapPrivacyShowCurrentLocation: boolean;
  TapPrivacyShowSmartPhotos: boolean;
  TapPrivacyShowGender: boolean;
  TapLanguagesLanguage: string[];
  images: IUserImages[];
  CurLocation: IUserCurlLocation;
}

export interface ICurlLocation {
  TapProfilelng: number;
  TapProfilelat: number;
  tap_profile_id: number;
  TapProfileAreaName: string;
  TapProfileCityName: string;
  TapProfileCountryName: string;
  TapProfileCountryCode: string;
}
