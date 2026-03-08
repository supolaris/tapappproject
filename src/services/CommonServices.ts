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
  console.log("latitude", latitude);
  console.log("longitude", longitude);

  const completeEndpoint = `findNearbyPlaceNameJSON?lat=${latitude}1&lng=${longitude}&username=${process.env.EXPO_PUBLIC_GEOLOCATION_USERNAME}`;
  const response = getRequest(completeEndpoint, "http://api.geonames.org/");
  return response;
};
