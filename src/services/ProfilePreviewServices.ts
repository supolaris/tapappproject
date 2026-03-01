import { getRequest } from "./ReactQueryRequests";

const tempEmail = "msulaman061@gmail.com";

export const useGetUserById = (userId: number) => {
  const response = getRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}users/person/${userId}/match`,
  );
  return response;
};

export const useGetAllowedValues = () => {
  const response = getRequest(`allowedValues`);
  return response;
};

export const useGetUserPreferences = () => {
  const response = getRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}users/${tempEmail}/profile`,
  );
  return response;
};

export const useGetUserImages = () => {
  const response = getRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}users/${tempEmail}/images`,
  );
  return response;
};
