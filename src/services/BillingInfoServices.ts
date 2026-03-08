import { deleteRequest, getRequest, putRequest } from "./ReactQueryRequests";

export const useGetUserInfo = () => {
  const response = getRequest(`${process.env.EXPO_PUBLIC_API_VERSION}/users`);
  return response;
};

export const useUpdateBillingInfo = () => {
  const response = putRequest(`${process.env.EXPO_PUBLIC_API_VERSION}/users`);
  return response;
};

export const useDeleteUser = () => {
  const response = deleteRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}/users`,
  );
  return response;
};
