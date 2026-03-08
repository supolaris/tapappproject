import { ApiNames } from "../constants/ApiNames";
import { getRequest, postRequest } from "./ReactQueryRequests";

let tempEmail = "msulaman061@gmail.com";
export const useGetMatchedProfilesService = () => {
  const response = getRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}/users/${tempEmail}${ApiNames.getMatchedProfiles}`,
  );
  return response;
};

export const useAddUserInteraction = () => {
  const response = postRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}/${ApiNames.signals.addInteraction}`,
  );
  return response;
};

export const useGetCurrentUserService = () => {
  const response = getRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}/${ApiNames.home.getCurrentUserInfo}`,
  );
  return response;
};
