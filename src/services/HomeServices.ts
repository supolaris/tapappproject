import { ICurrentUser } from "../@types/apiInterfaces/commonInterface";
import { ApiNames } from "../constants/ApiNames";
import { GetRequest } from "./FetchApis";
import { getRequest, postRequest } from "./ReactQueryRequests";

let tempEmail = "msulaman061@gmail.com";
export const useGetMatchedProfilesService = () => {
  const response = getRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}users/${tempEmail}${ApiNames.getMatchedProfiles}`,
  );
  return response;
};

export const useAddUserInteraction = () => {
  const response = postRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}${ApiNames.signals.addInteraction}`,
  );
  return response;
};

export const getCurrentUserService = async () => {
  const { data: response }: { data: ICurrentUser } = await GetRequest(
    ApiNames.home.getCurrentUserInfo,
  );
  return response;
};
