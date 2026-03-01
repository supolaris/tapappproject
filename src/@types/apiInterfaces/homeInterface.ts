export interface IHomeUsersData {
  first_name: string;
  age: number;
  gender: string;
  distance: number;
  default_image: string;
  profile: IProfile;
}

export interface IProfile {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null;
  TapUserID: number;
  TapProfessionalJobTitle: string;
  TapProfessionalCompany: string;
  TapProfessionalSchool: string;
  TapProfessionalLanguage: string;
  TapLifestylePets: string;
  TapLifestyleDrinking: string;
  TapLifestyleSmoking: string;
  TapLifestyleCannabis: string;
  TapLifestyleWorkout: string;
  TapLifestyleDietaryPreference: string;
  TapLifestyleSleepingHabits: string;
  TapLifestyleSocialMedia: string;
  TapLifestyleLookingFor: string;
  TapLifestyleOpenTo: string;
  TapMusicAndEntertainmentSpotifyAnthem: string;
  TapMusicAndEntertainmentTopSpotifyArtists: string;
  TapPersonalDetailsGender: string;
  TapPersonalDetailsSexualOrientation: string;
  TapPersonalDetailsRelationshipGoals: string;
  TapPersonalDetailsAboutMe: string;
  TapPersonalDetailsInterests: string;
  TapPersonalDetailsZodiac: string;
  TapPersonalDetailsEducation: string;
  TapPersonalDetailsFamilyPlans: string;
  TapHealthAndWellnessCovidVaccine: boolean;
  TapPersonalityType: string;
  TapPersonalityCommunicationStyle: string;
  TapPersonalityLoveStyle: string;
  TapPersonalityLoveLanguage: string;
  TapPrivacyShowAge: boolean;
  TapPrivacyShowDistance: boolean;
  TapLanguages: string[];
  images: [];
}

export interface IProfileInteractionResponse {
  ID: number;
  PersonID: number;
  TargetPersonID: number;
  Interaction: string;
  CreatedAt: string;
  ExpiresAt: null | string;
}

export interface IProfileInteractionData {
  target_user_id: number;
  interaction: string;
}
