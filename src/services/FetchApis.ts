import apiClient from "./ApiClient";

export const GetRequest = (endpoint: string, customBaseURL?: string) => {
  return apiClient.get(endpoint, {
    baseURL: customBaseURL,
  });
};

export const GetLocationRequest = (
  endpoint: string,
  customBaseURL?: string
) => {
  return apiClient.get(endpoint, {
    baseURL: customBaseURL,
  });
};

export const PostRequest = (
  endpoint: string,
  data: any,
  customBaseURL?: string
) => {
  return apiClient.post(endpoint, data, {
    baseURL: customBaseURL,
  });
};

export const PatchRequest = (
  endpoint: string,
  data: any,
  customBaseURL?: string
) => {
  return apiClient.patch(endpoint, data, {
    baseURL: customBaseURL,
  });
};

export const PutRequest = (
  endpoint: string,
  data: any,
  customBaseURL?: string
) => {
  return apiClient.put(endpoint, data, {
    baseURL: customBaseURL,
  });
};

export const DeleteRequest = (endpoint: string, customBaseURL?: string) => {
  return apiClient.delete(endpoint, {
    baseURL: customBaseURL,
  });
};

export const PostFormDataRequest = (
  endpoint: string,
  formData: any,
  customBaseURL?: string
) => {
  return apiClient.post(endpoint, formData, {
    baseURL: customBaseURL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
