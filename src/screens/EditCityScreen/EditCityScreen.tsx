import { useGetLocationInfoService } from "@/src/services/CommonServices";
import { usePostMatchPreferencesService } from "@/src/services/MatchPreferenceServices";
import { getGeoLocationPermission } from "@/src/utils/PermissionUtils";
import { useQueryClient } from "@tanstack/react-query";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { AppMessages } from "../../constants/AppMessages";
import { simpleToast } from "../../utils/CommonFunctions";
import EditCity from "./EditCity";

export const EditCityScreen = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const params = useLocalSearchParams();

  const isMatchPreferencesFlow = JSON.parse(
    params?.isMatchPreferencesFlow as string,
  ) as boolean;

  const [searchInputVal, setSearchInputVal] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [geoCoordination, setGetCoordinates] = useState<{
    longitude: number;
    latitude: number;
  }>({
    longitude: -1,
    latitude: -1,
  });

  const geoLocationResponse = useGetLocationInfoService(
    geoCoordination.latitude,
    geoCoordination.longitude,
  );

  const postMatchPreferencesResponse = usePostMatchPreferencesService();

  const onSearchChangeText = (val: string) => {
    setSearchInputVal(val);
  };

  const onGetLocationPressed = async () => {
    try {
      setIsLoading(true);

      const locationPermission: any = await getGeoLocationPermission();

      if (locationPermission?.status !== "granted") {
        simpleToast("Location permission is required");
        return;
      }

      const geoLocation = await Location.getCurrentPositionAsync({});

      if (!geoLocation?.coords) {
        console.log("long and lati not available");
        return;
      }
      setGetCoordinates({
        latitude: geoLocation.coords.latitude,
        longitude: geoLocation.coords.longitude,
      });

      if (geoLocationResponse?.data?.geonames?.length > 0) {
        const locationData = {
          TapProfilelng: parseInt(geoLocationResponse.data?.geonames?.[0]?.lng),
          TapProfilelat: parseInt(geoLocationResponse.data?.geonames?.[0]?.lat),
          tap_profile_id: 0,
          TapProfileAreaName:
            geoLocationResponse.data?.geonames?.[0]?.adminCode1,
          TapProfileCityName: geoLocationResponse.data?.geonames?.[0]?.name,
          TapProfileCountryName:
            geoLocationResponse.data?.geonames?.[0]?.countryName,
          TapProfileCountryCode:
            geoLocationResponse.data?.geonames?.[0]?.countryCode,
        };

        if (isMatchPreferencesFlow) {
          postMatchPreferencesResponse?.mutate(
            { CurLocation: locationData },
            {
              onSuccess: (res) => {
                console.log("location save success =>>>", res);
                // TODO: invalidate get matched preferences
                // queryClient.invalidateQueries({ queryKey: [`${process.env.EXPO_PUBLIC_API_VERSION}/users/${tempEmail}/preferences`] });
                // router.back();
              },
              onError: (err: Error) => {
                console.log("location save error =>>>>", err);
              },
            },
          );
        } else {
          // other flow logic here
        }
      } else {
        console.log("location details not available");
      }
    } catch (error) {
      console.log("Error in getting location info here", error);
      simpleToast(AppMessages.wentWrong);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EditCity
      searchInputVal={searchInputVal}
      isLoading={
        isLoading ||
        geoLocationResponse?.isLoading ||
        postMatchPreferencesResponse?.isPending
      }
      onSearchChangeText={onSearchChangeText}
      onGetLocationPressed={onGetLocationPressed}
    />
  );
};
