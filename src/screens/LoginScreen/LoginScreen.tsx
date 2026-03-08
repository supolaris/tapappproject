import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import React, { useState } from "react";
import { ApiNames } from "../../constants/ApiNames";
import { useAuth } from "../../context/AuthContext";
import { UserContext } from "../../context/Context";
import { getProfile } from "../../services/LoginServices";
import { simpleToast } from "../../utils/CommonFunctions";
import Login from "./Login";

GoogleSignin.configure({
  webClientId:
    "177866303276-ibika99t7ac5bikjsfe60arsqabcjnip.apps.googleusercontent.com",
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

export const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  const { isInternetConnected } = UserContext();
  const [isLoading, setIsLoading] = useState(false);

  const checkProfileExists = async () => {
    try {
      console.log(
        "Checking profile exists with endpoint:",
        ApiNames.CheckProfileExists,
      );
      const response = await getProfile(ApiNames.CheckProfileExists);
      console.log("Profile check response:", response?.data);
      if (response?.data?.ProfileExists) {
        router.replace("/(app)/tabs/home");
      } else {
        // Navigate to profile setup if needed
        // For now, go to home
        router.replace("/(app)/tabs/home");
      }
    } catch (error) {
      console.log("Profile check error:", error);
      // Navigate to home even if profile check fails
      router.replace("/(app)/tabs/home");
    }
  };

  const onGoogleLoginPressed = async () => {
    try {
      setIsLoading(true);

      // if (!isInternetConnected) {
      //   simpleToast("No internet connection");
      //   return;
      // }

      // Sign in with Google
      await signInWithGoogle();

      // Check if profile exists and navigate accordingly
      await checkProfileExists();
    } catch (error: any) {
      console.log("Google login error:", error);
      if (error.code === GoogleSignin.SIGN_IN_CANCELLED) {
        simpleToast("Sign in was cancelled");
      } else if (error.code === GoogleSignin.IN_PROGRESS) {
        simpleToast("Sign in is already in progress");
      } else if (error.code === GoogleSignin.PLAY_SERVICES_NOT_AVAILABLE) {
        simpleToast("Google Play Services not available");
      } else {
        simpleToast("Sign in failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Login isLoading={isLoading} onGoogleLoginPressed={onGoogleLoginPressed} />
  );
};
