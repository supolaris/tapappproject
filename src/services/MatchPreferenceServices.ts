import { ISelectedMatchPreferences } from "../@types/apiInterfaces/MatchPreferencesInterface";
import { ApiNames } from "../constants/ApiNames";
import { GetRequest } from "./FetchApis";
import { getRequest, postRequest } from "./ReactQueryRequests";

let tempEmail = "msulaman061@gmail.com";
export const GetAllowedValuesService = async (endpoint: string) => {
  const response = await GetRequest(endpoint);
  return response;
};

export const usePostMatchPreferencesService = () => {
  const response = postRequest(
    `${ApiNames.ApiGroup}/users/${tempEmail}/preferences`,
  );
  return response;
};

export const GetMatchPreferencesService = async (email: string) => {
  const completeEndpoint = `${ApiNames.ApiGroup}/${email}/preferences`;
  const { data: response }: { data: ISelectedMatchPreferences } =
    await GetRequest(completeEndpoint);
  return response;
};

// ===> new

export const useGetMatchedPreferences = () => {
  const response = getRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}/users/${tempEmail}/preferences`,
  );
  return response;
};
