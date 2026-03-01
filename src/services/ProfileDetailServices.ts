import {ApiNames} from '../constants/ApiNames';
import {
  DeleteRequest,
  PatchRequest,
  PostRequest,
  PutRequest,
} from './FetchApis';

export const DeleteProfile = async (endpoint: string) => {
  const response = await DeleteRequest(endpoint);
  return response;
};

export const PostProfileDetail = async (data: any) => {
  const response = await PostRequest(ApiNames.ProvisionUser, data);
  return response;
};
export const UpdateProfileDetail = async (data: any) => {
  const response = await PutRequest(ApiNames.ProvisionUser, data);
  return response;
};
