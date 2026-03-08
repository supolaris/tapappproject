import { useGetLocationInfoService } from "@/src/services/CommonServices";
import { getGeoLocationPermission } from "@/src/utils/PermissionUtils";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { AppMessages } from "../../constants/AppMessages";
import { UserContext } from "../../context/Context";
import { simpleToast } from "../../utils/CommonFunctions";
import EditCity from "./EditCity";

export const EditCityScreen = () => {
  const params = useLocalSearchParams();

  const isMatchPreferencesFlow = JSON.parse(
    params?.isMatchPreferencesFlow as string,
  ) as boolean;

  const {
    matchPreferencesCtx,
    myProfilePreferencesCtx,
    updateMatchPreferencesCtx,
    updateMyProfilePreferencesCtx,
  } = UserContext();

  const [searchInputVal, setSearchInputVal] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      let geoLocation = await Location.getCurrentPositionAsync({});

      if (!geoLocation?.coords) {
        console.log("long and lati not available");
        return;
      }
      console.log("location", geoLocation);
      const response = useGetLocationInfoService(
        geoLocation?.coords?.latitude,
        geoLocation?.coords?.longitude,
      );

      console.log("response =>>>>>>", response);

      // if (response) {
      //   if (isMatchPreferencesFlow) {
      //     updateMatchPreferencesCtx({
      //       ...matchPreferencesCtx,
      //       CurLocation: {
      //         TapProfilelng: parseInt(response.geonames?.[0]?.lng),
      //         TapProfilelat: parseInt(response.geonames?.[0]?.lat),
      //         tap_profile_id: 0,
      //         TapProfileAreaName: response.geonames?.[0]?.adminCode1,
      //         TapProfileCityName: response.geonames?.[0]?.name,
      //         TapProfileCountryName: response.geonames?.[0]?.countryName,
      //         TapProfileCountryCode: response.geonames?.[0]?.countryCode,
      //       },
      //     });
      //     // navigation.goBack();
      //   } else {
      //     updateMyProfilePreferencesCtx({
      //       ...myProfilePreferencesCtx,
      //       CurLocation: {
      //         TapProfilelng: parseInt(response.geonames?.[0]?.lng),
      //         TapProfilelat: parseInt(response.geonames?.[0]?.lat),
      //         tap_profile_id: 0,
      //         TapProfileAreaName: response.geonames?.[0]?.adminCode1,
      //         TapProfileCityName: response.geonames?.[0]?.name,
      //         TapProfileCountryName: response.geonames?.[0]?.countryName,
      //         TapProfileCountryCode: response.geonames?.[0]?.countryCode,
      //       },
      //     });
      //     // navigation.goBack();
      //   }
      // } else {
      //   simpleToast(AppMessages.wentWrong);
      // }
    } catch (error) {
      console.log("Error in getting location info here", error);
      simpleToast(AppMessages.wentWrong);
    } finally {
      setIsLoading(false);
    }
  };

  const aa = async () => {
    try {
      const locationPermission: any = await getGeoLocationPermission();
      if (locationPermission?.status !== "granted") {
        simpleToast("Location permission is required");
        return;
      }
      let geoLocation = await Location.getCurrentPositionAsync({});

      if (!geoLocation?.coords) {
        console.log("long and lati not available");
        return;
      }
      console.log("location", geoLocation);
      const response = useGetLocationInfoService(
        geoLocation?.coords?.latitude,
        geoLocation?.coords?.longitude,
      );

      console.log("response =>>>>>>", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <EditCity
      searchInputVal={searchInputVal}
      isLoading={isLoading}
      onSearchChangeText={onSearchChangeText}
      onGetLocationPressed={aa}
    />
  );
};
