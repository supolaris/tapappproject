import {GetRequest} from './FetchApis';

export const getProfile = async (endpoint: string) => {
  let response = await GetRequest(endpoint);
  return response;
};
