import React, { useState } from "react";
import Geolocation from "react-native-geolocation-service";
import { useAppNavigation } from "../../@types/AppNavigation";
import { AppScreenProps } from "../../@types/NavigationTypes";
import { AppMessages } from "../../constants/AppMessages";
import { UserContext } from "../../context/Context";
import { GetLocationInfoService } from "../../services/MatchPreferenceServices";
import { simpleToast } from "../../utils/CommonFunctions";
import EditCity from "./EditCity";

const EditCityScreen = ({ route }: AppScreenProps<"EditCityScreen">) => {
  const navigation = useAppNavigation();

  const { isMatchPreferencesFlow } = route.params || {};

  const {
    matchPreferencesCtx,
    myProfilePreferencesCtx,
    updateMatchPreferencesCtx,
    updateMyProfilePreferencesCtx,
  } = UserContext();

  const [searchInputVal, setSearchInputVal] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onHeaderBackPressed = () => {
    navigation.goBack();
  };
  const onSearchChangeText = (val: string) => {
    setSearchInputVal(val);
  };

  const onGetLocationPressed = async () => {
    try {
      setIsLoading(true);
      const location = await getLonLat();
      console.log("location", location);
      const response = await GetLocationInfoService(
        location.latitude,
        location.longitude,
      );
      if (response) {
        if (isMatchPreferencesFlow) {
          updateMatchPreferencesCtx({
            ...matchPreferencesCtx,
            CurLocation: {
              TapProfilelng: parseInt(response.geonames?.[0]?.lng),
              TapProfilelat: parseInt(response.geonames?.[0]?.lat),
              tap_profile_id: 0,
              TapProfileAreaName: response.geonames?.[0]?.adminCode1,
              TapProfileCityName: response.geonames?.[0]?.name,
              TapProfileCountryName: response.geonames?.[0]?.countryName,
              TapProfileCountryCode: response.geonames?.[0]?.countryCode,
            },
          });
          navigation.goBack();
        } else {
          updateMyProfilePreferencesCtx({
            ...myProfilePreferencesCtx,
            CurLocation: {
              TapProfilelng: parseInt(response.geonames?.[0]?.lng),
              TapProfilelat: parseInt(response.geonames?.[0]?.lat),
              tap_profile_id: 0,
              TapProfileAreaName: response.geonames?.[0]?.adminCode1,
              TapProfileCityName: response.geonames?.[0]?.name,
              TapProfileCountryName: response.geonames?.[0]?.countryName,
              TapProfileCountryCode: response.geonames?.[0]?.countryCode,
            },
          });
          navigation.goBack();
        }
      } else {
        simpleToast(AppMessages.wentWrong);
      }
    } catch (error) {
      console.log("Error in getting location info here", error);
      simpleToast(AppMessages.wentWrong);
    } finally {
      setIsLoading(false);
    }
  };

  const getLonLat = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve(coords);
        },
        (error) => {
          console.log("Geolocation error:", error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    });
  };

  return (
    <EditCity
      searchInputVal={searchInputVal}
      isLoading={isLoading}
      onSearchChangeText={onSearchChangeText}
      onHeaderBackPressed={onHeaderBackPressed}
      onGetLocationPressed={onGetLocationPressed}
    />
  );
};

export default EditCityScreen;
