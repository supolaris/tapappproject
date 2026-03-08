import { ICurlLocation, IUserImages } from "../CommonTypes";

// my profile preferences
export interface IMyProfilePreferences {
  // TapLanguages: string[];
  TapLifestylePets: string;
  TapPrivacyShowAge: boolean;
  TapLifestyleOpenTo: string;
  TapPersonalityType: string;
  TapLifestyleSmoking: string;
  TapLifestyleWorkout: string;
  TapLanguagesLanguage: string;
  TapPersonalityTrait: string;
  TapLifestyleDrinking: string;
  TapLifestyleCannabis: string;
  TapDiscoveryLocation: string;
  // TapDiscoveryHasABio: boolean;
  TapProfessionalSchool: string;
  TapGoingOutSocialVibe: string;
  TapGoingOutDressStyle: string;
  TapPrivacyShowGender: boolean;
  TapLifestyleLifestyle: string;
  TapCurLocationLivingIn: string;
  TapProfessionalCompany: string;
  TapLifestyleLookingFor: string;
  TapPersonalityLoveStyle: string;
  TapProfessionalLanguage: string;
  TapProfessionalJobTitle: string;
  TapLifestyleSocialMedia: string;
  TapMyWeekendsPaceEnergy: string;
  TapMyWeekendsActivities: string;
  TapPrivacyShowDistance: boolean;
  TapPersonalDetailsGender: string;
  TapPersonalDetailsZodiac: string;
  TapPersonalDetailsOpenTo: string;
  TapMyWeekendsSocialEnergy: string;
  TapMyWeekendsSocialHabits: string;
  TapPersonalDetailsAboutMe: string;
  TapLifestyleSleepingHabits: string;
  TapPersonalityLoveLanguage: string;
  TapPrivacyShowSmartPhotos: boolean;
  TapPersonalDetailsInterests: string;
  TapPersonalDetailsEducation: string;
  // TapDiscoveryMaximumDistance: number;
  // TapDiscoveryAgeRangeMinimum: number;
  // TapDiscoveryAgeRangeMaximum: number;
  TapLifestyleWorkoutFrequency: string;
  TapPersonalDetailsLookingFor: string;
  TapPersonalDetailsFamilyPlans: string;
  // TapDiscoveryMaxNumberOfPhotos: number;
  TapLifestyleDietaryPreference: string;
  TapGoingOutPreferredActivities: string;
  TapPrivacyShowCurrentLocation: boolean;
  TapPersonalityCommunicationStyle: string;
  // TapHealthAndWellnessCovidVaccine: boolean;
  TapPersonalDetailsSexualOrientation: string;
  TapPersonalDetailsRelationshipGoals: string;
  TapMusicAndEntertainmentSpotifyAnthem: string;
  TapMyCommunicationStyleResponsiveness: string;
  TapMyCommunicationStylePhoneUsageHabits: string;
  TapMusicAndEntertainmentTopSpotifyArtists: string;
  TapMyCommunicationStylePreferredCommunicationMethod: string;
  CurLocation: ICurlLocation;
  images: IUserImages[];
}

// save response

export interface ISaveMyProfilePreferences {
  Message: string;
  TransactionTime: string;
  AdditionalMessage: string;
}
