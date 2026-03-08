export const ApiNames = {
  ApiGroup: "v3",
  DeleteUser: "v3/users",
  ProvisionUser: "v3/users",
  GetMyProfileData: "v3/users",
  MatchPreferences: "/preferences",
  MyProfilePreferences: "/profile",
  CheckProfileExists: "testconnect",
  GetProvisionUserDetails: "v3/users",
  GetAllowedPreferencesValues: "allowedValues",

  //home
  home: {
    getCurrentUserInfo: "users",
  },
  likes: {
    getSentLikes: "users/signals",
  },
  getMatchedProfiles: "/matches",
  postInteraction: "/Signals",
  walkthrough: {},
  signals: {
    addInteraction: "signals",
    receivedSignals: "signals",
    sentSignals: "signals",
  },
};
