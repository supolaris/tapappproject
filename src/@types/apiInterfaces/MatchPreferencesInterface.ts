import { ICreatedUpdatedDeleted, ICurlLocation } from "../CommonTypes";

export interface ISelectedMatchPreferences {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
  tap_user_id: number;
  preferences: IMatchPreferences;
}

export interface ISavePreferences {
  Message: string;
  AdditionalMessage: string;
  TransactionTime: string;
}

// match profile preferences
export interface IMatchPreferencesResponse extends ICreatedUpdatedDeleted {
  ID: number;
  tap_user_id: number;
  preferences: IMatchPreferences;
}

export interface IMatchPreferences {
  TapLanguages: string[];
  TapLifestylePets: string;
  TapLifestyleOpenTo: string;
  TapPersonalityType: string;
  TapLifestyleSmoking: string;
  TapLifestyleWorkout: string;
  TapLanguagesLanguage: string;
  TapPersonalityTrait: string;
  TapLifestyleDrinking: string;
  TapLifestyleCannabis: string;
  TapDiscoveryLocation: string;
  TapDiscoveryHasABio: boolean;
  TapProfessionalSchool: string;
  TapGoingOutSocialVibe: string;
  TapGoingOutDressStyle: string;
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
  TapPersonalDetailsGender: string;
  TapPersonalDetailsZodiac: string;
  TapPersonalDetailsOpenTo: string;
  TapMyWeekendsSocialEnergy: string;
  TapMyWeekendsSocialHabits: string;
  TapPersonalDetailsAboutMe: string;
  TapLifestyleSleepingHabits: string;
  TapPersonalityLoveLanguage: string;
  TapPersonalDetailsInterests: string;
  TapPersonalDetailsEducation: string;
  TapDiscoveryMaximumDistance: number;
  TapDiscoveryAgeRangeMinimum: number;
  TapDiscoveryAgeRangeMaximum: number;
  TapLifestyleWorkoutFrequency: string;
  TapPersonalDetailsLookingFor: string;
  TapPersonalDetailsFamilyPlans: string;
  TapDiscoveryMaxNumberOfPhotos: number;
  TapLifestyleDietaryPreference: string;
  TapGoingOutPreferredActivities: string;
  TapPersonalityCommunicationStyle: string;
  TapHealthAndWellnessCovidVaccine: boolean;
  TapPersonalDetailsSexualOrientation: string;
  TapPersonalDetailsRelationshipGoals: string;
  TapMusicAndEntertainmentSpotifyAnthem: string;
  TapMyCommunicationStyleResponsiveness: string;
  TapMyCommunicationStylePhoneUsageHabits: string;
  TapMusicAndEntertainmentTopSpotifyArtists: string;
  TapMyCommunicationStylePreferredCommunicationMethod: string;
  CurLocation: ICurlLocation;
}
