import { MMKVStorage } from "../utils/CommonFunctions";
import { getRequest } from "./ReactQueryRequests";

const userEmail = MMKVStorage.getString("UserEmail");

export const useGetUserById = (userId: number) => {
  const response = getRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}/users/person/${userId}/details`,
  );
  return response;
};

export const useGetUserPreferences = () => {
  const response = getRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}/users/${userEmail}/profile`,
  );
  return response;
};

export const useGetUserImages = () => {
  const response = getRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}/users/${userEmail}/images`,
  );
  return response;
};
