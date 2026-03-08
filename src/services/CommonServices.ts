import { getRequest } from "./ReactQueryRequests";

export const useGetAllowedValuesService = () => {
  const response = getRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}/allowedValues`,
  );
  return response;
};

export const useGetLocationInfoService = (
  latitude: number,
  longitude: number,
) => {
  const completeEndpoint = `findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&username=supolaris`;
  const response = getRequest(completeEndpoint, "http://api.geonames.org/");
  return response;
};
