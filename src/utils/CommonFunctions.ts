import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AxiosError } from "axios";
import moment from "moment";
import { Dimensions, PixelRatio, Platform } from "react-native";
import { MMKVLoader } from "react-native-mmkv-storage";
import Toast from "react-native-simple-toast";
import { IMatchPreferences } from "../@types/apiInterfaces/MatchPreferencesInterface";
import { IMyProfilePreferences } from "../@types/apiInterfaces/MyProfilePreferencesInterface";
import { languagesData } from "../constants/StaticData";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scaleVertical = SCREEN_HEIGHT / 932;
const scaleHorizontal = SCREEN_WIDTH / 430;
const scale = SCREEN_WIDTH / 428;
export const activeOpacity = 0.5;
export const MMKVStorage = new MMKVLoader().initialize();

export const simpleToast = (message: string) => {
  Toast.show(message, Toast.LONG);
};

export const getErrorData = (e: unknown): string => {
  try {
    if (
      e instanceof AxiosError &&
      e?.response?.data?.result &&
      e.response.status === 400
    ) {
      return e.response.data.result;
    }
    return "";
  } catch (e) {
    return "";
  }
};

export const heightResize = (size: number) => {
  const newSize = size * scaleVertical;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
};

export const normalizeHeight = (size: number) => {
  const newSize = size * scaleVertical;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};

export const normalizeWidth = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};

export const imageAspectHeight = (width: number, height: number) => {
  const ratio = width / height;
  return normalizeWidth(width) / ratio;
};

export const normalizeFont = (size: number) => {
  const newSize = size * scaleHorizontal;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
};

export const logoutUser = async () => {
  try {
    await auth().signOut();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();

    // Clear all MMKV storage
    MMKVStorage.clearStore();

    // Clear global token
    if (typeof global !== "undefined") {
      global.token = "";
    }
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    return false;
  }
};

export const getLanguageName = (value: string): string => {
  return languagesData[value] || value;
};

export const getAgeFromDOB = (dob: string) => {
  return moment().diff(moment(dob), "years").toString();
};

// my profile preferences

export const isMyProfileItemSelected = (
  title: string,
  categoryTitle: string,
  item: string,
  preferences?: IMyProfilePreferences,
): boolean => {
  if (!preferences) return false;
  const key =
    "Tap" + categoryTitle.replace(/\s+/g, "") + title.replace(/\s+/g, "");
  const selectedValues = preferences[key as keyof IMyProfilePreferences];
  let valuesArray: string[] = [];
  if (Array.isArray(selectedValues)) {
    valuesArray = selectedValues.map(String);
  } else if (selectedValues && typeof selectedValues === "string") {
    valuesArray = selectedValues.split(",").map((val) => val.trim());
  }
  return valuesArray.includes(item);
};

export const getMyProfileSelectedValuesForSection = (
  title: string,
  subTitle: string,
  preferences?: IMyProfilePreferences,
): string[] => {
  if (!preferences) return [];
  const key = "Tap" + title?.replace(/\s+/g, "") + subTitle.replace(/\s+/g, "");
  const selected = preferences[key as keyof IMyProfilePreferences];
  if (Array.isArray(selected)) {
    return selected.map(String);
  }
  return selected && typeof selected === "string"
    ? selected.split(",").map((val) => val.trim())
    : [];
};

// match preferences

export const isMatchItemSelected = (
  title: string,
  categoryTitle: string,
  item: string,
  preferences?: IMatchPreferences,
): boolean => {
  if (!preferences) return false;
  const key =
    "Tap" + categoryTitle.replace(/\s+/g, "") + title.replace(/\s+/g, "");
  const selectedValues = preferences[key as keyof IMatchPreferences];
  let valuesArray: string[] = [];
  if (Array.isArray(selectedValues)) {
    valuesArray = selectedValues.map(String);
  } else if (selectedValues && typeof selectedValues === "string") {
    valuesArray = selectedValues.split(",").map((val) => val.trim());
  }
  return valuesArray.includes(item);
};

export const getMatchSelectedValuesForSection = (
  title: string,
  subTitle: string,
  preferences?: IMatchPreferences,
): string[] => {
  if (!preferences) return [];
  const key = "Tap" + title.replace(/\s+/g, "") + subTitle.replace(/\s+/g, "");
  const selected = preferences[key as keyof IMatchPreferences];
  if (Array.isArray(selected)) {
    return selected.map(String);
  }
  return selected && typeof selected === "string"
    ? selected.split(",").map((val) => val.trim())
    : [];
};

export const formatHeight = (feet: number, inches: number): string => {
  // Handle undefined or invalid values safely
  const safeFeet = isNaN(feet) ? 0 : feet;
  const safeInches = isNaN(inches) ? 0 : inches;

  return `${safeFeet}'${safeInches}"`;
};

export const getNameInitials = (name: string): string => {
  if (!name) return "";

  const words = name.trim()?.split(/\s+/); //?.split by spaces
  const initials = words?.slice(0, 2)?.map?.((word) => word[0]?.toUpperCase());
  return initials.join(" ");
};
