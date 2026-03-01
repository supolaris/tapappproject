import {
  useGetAllowedValues,
  useGetUserImages,
  // useGetUserById,
  useGetUserPreferences,
} from "@/src/services/ProfilePreviewServices";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import ProfilePreview from "./ProfilePreview";

export function ProfilePreviewScreen() {
  const params = useLocalSearchParams();

  const userId = params?.userData ? params?.userData : "";

  // const userDataResponse = useGetUserById(userId);
  const userImagesResponse = useGetUserImages();
  const allowedValuesResponse = useGetAllowedValues();
  const userPreferencesResponse = useGetUserPreferences();

  // console.log("userImagesResponse", userImagesResponse?.data);

  return (
    <ProfilePreview
      isLoading={
        userImagesResponse?.isLoading ||
        allowedValuesResponse?.isLoading ||
        userPreferencesResponse?.isLoading
      }
      userImages={userImagesResponse?.data}
      allowedValues={allowedValuesResponse?.data}
      userPreferences={userPreferencesResponse?.data}
    />
  );
}
