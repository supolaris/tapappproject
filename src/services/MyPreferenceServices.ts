import { IAllowedValues } from "../@types/apiInterfaces/commonInterface";
import { ISavePreferences } from "../@types/apiInterfaces/MatchPreferencesInterface";
import { IGetProfileImages } from "../@types/apiInterfaces/MyProfileInterface";
import {
  IMyProfilePreferences,
  ISaveMyProfilePreferences,
} from "../@types/apiInterfaces/MyProfilePreferencesInterface";
import { ApiNames } from "../constants/ApiNames";
import { MMKVStorage } from "../utils/CommonFunctions";
import { GetRequest, PostFormDataRequest, PostRequest } from "./FetchApis";

export const SavePreferencesService = async (data: any) => {
  const UserEmail = await MMKVStorage.getString("UserEmail");
  const completeEndpoint = `${ApiNames.ApiGroup}/${UserEmail}/preferences`;
  const { data: response }: { data: ISavePreferences } = await PostRequest(
    completeEndpoint,
    data
  );
  return response;
};

export const GetAllowedValuesService = async () => {
  const { data: response }: { data: IAllowedValues[] } = await GetRequest(
    ApiNames.GetAllowedPreferencesValues
  );
  return response;
};

//temp should get saved

export const GetProfileImagesService = async (email: string) => {
  const completeEndpoint = `${ApiNames.ApiGroup}/${email}/images`;
  const { data: response }: { data: IGetProfileImages[] } = await GetRequest(
    completeEndpoint
  );
  return response;
};

export const SaveProfileImagesService = async (email: string, data: any) => {
  const completeEndpoint = `${ApiNames.ApiGroup}/${email}/images`;
  const response = PostFormDataRequest(completeEndpoint, data);
  return response;
};

//

export const GetMyProfilePreferencesService = async (email: string) => {
  const completeEndpoint = `${ApiNames.ApiGroup}/${email}/profile`;
  const { data: response }: { data: IMyProfilePreferences } = await GetRequest(
    completeEndpoint
  );
  return response;
};

export const SaveMyProfilePreferencesService = async (
  UserEmail: string,
  data: IMyProfilePreferences
) => {
  const completeEndpoint = `${ApiNames.ApiGroup}/${UserEmail}/profile`;
  const { data: response }: { data: ISaveMyProfilePreferences } =
    await PostRequest(completeEndpoint, data);
  return response;
};
