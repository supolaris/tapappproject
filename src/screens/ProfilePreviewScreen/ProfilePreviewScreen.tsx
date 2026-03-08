import { UserContext } from "@/src/context/Context";
import { useGetAllowedValuesService } from "@/src/services/CommonServices";
import {
  useGetUserById,
  useGetUserPreferences,
} from "@/src/services/ProfilePreviewServices";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import ProfilePreview from "./ProfilePreview";

export function ProfilePreviewScreen({
  isHeaderHidden,
}: {
  isHeaderHidden: boolean;
}) {
  const params = useLocalSearchParams();
  const { currentUserCtx } = UserContext();

  const userId = params?.userId
    ? params?.userId
    : currentUserCtx?.User?.PersonID;

  const userDataResponse = useGetUserById(userId as number);
  const allowedValuesResponse = useGetAllowedValuesService();
  const userPreferencesResponse = useGetUserPreferences();

  return (
    <ProfilePreview
      isHeaderHidden={isHeaderHidden}
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
