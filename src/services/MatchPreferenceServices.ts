import { IGeoLocationResponse } from "../@types/apiInterfaces/commonInterface";
import { ISelectedMatchPreferences } from "../@types/apiInterfaces/MatchPreferencesInterface";
import { ApiNames } from "../constants/ApiNames";
import { MMKVStorage } from "../utils/CommonFunctions";
import { GetLocationRequest, GetRequest, PostRequest } from "./FetchApis";
import { getRequest } from "./ReactQueryRequests";

let tempEmail = "msulaman061@gmail.com";
export const GetAllowedValuesService = async (endpoint: string) => {
  const response = await GetRequest(endpoint);
  return response;
};

export const PostMatchPreferences = async (endpoint: string, data: any) => {
  const UserEmail = await MMKVStorage.getString("UserEmail");
  const completeEndpoint = `${ApiNames.ApiGroup}/${UserEmail}${endpoint}`;
  const response = await PostRequest(completeEndpoint, data);
  return response;
};

export const GetMatchPreferencesService = async (email: string) => {
  const completeEndpoint = `${ApiNames.ApiGroup}/${email}/preferences`;
  const { data: response }: { data: ISelectedMatchPreferences } =
    await GetRequest(completeEndpoint);
  return response;
};

export const GetLocationInfoService = async (
  latitude: number,
  longitude: number,
) => {
  const completeEndpoint = `findNearbyPlaceNameJSON?lat=${latitude}1&lng=${longitude}&username=${appConfigs.geoLocationUser}`;
  const { data: response }: { data: IGeoLocationResponse } =
    await GetLocationRequest(completeEndpoint, "http://api.geonames.org/");
  return response;
};

// ===> new

export const useGetMatchedPreferences = () => {
  const response = getRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}/users/${tempEmail}/preferences`,
  );
  return response;
};
