import {
  useGetAllowedValues,
  useGetUserById,
  // useGetUserById,
  useGetUserPreferences,
} from "@/src/services/ProfilePreviewServices";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import ProfilePreview from "./ProfilePreview";

export function ProfilePreviewScreen() {
  const params = useLocalSearchParams();

  const userId = params?.userId ? params?.userId : -1;

  const userDataResponse = useGetUserById(userId as number);
  const allowedValuesResponse = useGetAllowedValues();
  const userPreferencesResponse = useGetUserPreferences();

  return (
    <ProfilePreview
      isLoading={
        userDataResponse?.isLoading ||
        allowedValuesResponse?.isLoading ||
        userPreferencesResponse?.isLoading
      }
      allowedValues={allowedValuesResponse?.data}
      userByIdData={userDataResponse?.data}
    />
  );
}
