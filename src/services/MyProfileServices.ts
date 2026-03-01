import { IMatchPreferencesResponse } from "../@types/apiInterfaces/MatchPreferencesInterface";
import { ApiNames } from "../constants/ApiNames";
import { MMKVStorage } from "../utils/CommonFunctions";
import { GetRequest } from "./FetchApis";

export const GetMatchPreferencesService = async () => {
  const userEmail = MMKVStorage.getString("UserEmail");
  const { data: response }: { data: IMatchPreferencesResponse } =
    await GetRequest(
      `${ApiNames.ApiGroup}/${userEmail}${ApiNames.MatchPreferences}`
    );
  return response;
};
