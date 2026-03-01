// import auth from "@react-native-firebase/auth";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { ApiNames } from "../../constants/ApiNames";
// import { UserContext } from "../../context/Context";
// import { getProfile } from "../../services/LoginServices";
// import { MMKVStorage, simpleToast } from "../../utils/CommonFunctions";
// import Login from "./Login";

// const webClientId = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;
// console.log("GoogleSignin webClientId:", webClientId);

// GoogleSignin.configure({
//   webClientId,
//   offlineAccess: true,
//   forceCodeForRefreshToken: false,
// });

// export const LoginScreen = () => {
//   const { isInternetConnected } = UserContext();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const checkProfileExists = async () => {
//     try {
//       let response = await getProfile(ApiNames.CheckProfileExists);
//       if (response?.data?.ProfileExists) {
//         router.replace("/(app)/tabs/home");
//       } else {
//         // TODO: Navigate to profile form screen when it exists
//         simpleToast("Profile setup required");
//       }
//     } catch (error) {
//       console.log("error", error);
//       // Navigate to home even if profile check fails
//       router.replace("/(app)/tabs/home");
//     }
//   };

//   const onGoogleLoginPressed = async () => {
//     console.log("first");

//     // if (!isInternetConnected) {
//     //   simpleToast(AppMessages.noInternet);
//     //   return;
//     // }

//     try {
//       setIsLoading(true);
//       await GoogleSignin.hasPlayServices({
//         showPlayServicesUpdateDialog: true,
//       });
//       const { idToken } = await GoogleSignin.signIn();

//       // Create Google credential and sign in with Firebase
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//       const userCredential =
//         await auth().signInWithCredential(googleCredential);

//       const userEmail = userCredential?.user?.email;
//       const userName = userCredential?.user?.displayName;
//       const userImage = userCredential?.user?.photoURL;
//       const firebaseToken = await userCredential?.user?.getIdToken();

//       console.log("firebaseToken", firebaseToken);
//       console.log("userEmail", userEmail);
//       console.log("userName", userName);

//       // Store user data in global and MMKV
//       if (typeof global !== "undefined") {
//         global.token = firebaseToken;
//       }
//       MMKVStorage.setString("UserEmail", userEmail || "");
//       MMKVStorage.setString("UserName", userName || "");
//       MMKVStorage.setString("UserImage", userImage || "");
//       MMKVStorage.setString("FirebaseToken", firebaseToken || "");

//       await checkProfileExists();
//     } catch (error: any) {
//       console.log("Google login error:", error);
//       if (error.code === GoogleSignin.SIGN_IN_CANCELLED) {
//         simpleToast("Sign in was cancelled");
//       } else if (error.code === GoogleSignin.IN_PROGRESS) {
//         simpleToast("Sign in is already in progress");
//       } else if (error.code === GoogleSignin.PLAY_SERVICES_NOT_AVAILABLE) {
//         simpleToast("Google Play Services not available");
//       } else {
//         simpleToast("Sign in failed. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Login isLoading={isLoading} onGoogleLoginPressed={onGoogleLoginPressed} />
//   );
// };

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React from "react";
import Login from "./Login";

GoogleSignin.configure({
  webClientId:
    "177866303276-ibika99t7ac5bikjsfe60arsqabcjnip.apps.googleusercontent.com",
  // offlineAccess: true,
  // forceCodeForRefreshToken: true,
});

export const LoginScreen = () => {
  const onGoogleLoginPressed = async () => {
    try {
      console.log("first");
      const response = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const signInResponse = await GoogleSignin.signIn();

      console.log("response", response);
      console.log("signInResponse", signInResponse);
    } catch (error) {
      console.log("error", error);
    }
  };

  return <Login onGoogleLoginPressed={onGoogleLoginPressed} />;
};
