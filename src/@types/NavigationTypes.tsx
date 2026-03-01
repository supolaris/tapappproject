// import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof BottomStackParamList> =
  BottomTabScreenProps<BottomStackParamList, T>;

export type RootStackParamList = {
  HomeScreen: undefined;
  MyPreferencesScreen: undefined;
  BottomTabs: undefined;
  UserProfileDataForm_Screen: undefined;
  ProfileFormScreen: undefined;
  AllChatsScreen: undefined;
  MyProfileScreen: undefined;
  WalkthroughScreen: undefined;
  MatchPreferencesScreen: undefined;
  LoginScreen: undefined;
  SettingsScreen: undefined;
  ProfilePreviewScreen: undefined;
  MyPreferencesProfileScreen: undefined;
  EditCityScreen: {
    isMatchPreferencesFlow: boolean;
  };
};

export type BottomStackParamList = {
  HomeScreen: undefined;
  LikesScreen: undefined;
  CommunityScreen: undefined;
  AllChatsScreen: undefined;
  MyProfileScreen: undefined;
};

type AppStack = BottomStackParamList & RootStackParamList;
export type AppScreenProps<T extends keyof AppStack> = NativeStackScreenProps<
  AppStack,
  T
>;
