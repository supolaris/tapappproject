import { View } from "react-native";

import auth from "@react-native-firebase/auth";
import { addEventListener } from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { MainStackScreenProps } from "../../@types/NavigationTypes";
import Loader from "../../components/common/Loader";
import { UserContext } from "../../context/Context";
import { MMKVStorage } from "../../utils/CommonFunctions";
import { getLocationPermission } from "../../utils/PermissionUtils";

const WalkthroughScreen = ({
  navigation,
}: MainStackScreenProps<"WalkthroughScreen">) => {
  const { updateIsInternetConnected } = UserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    handleNetworkInfo();
    getLocationPermission();
    checkTokenAuthentication();
  }, []);

  const handleNetworkInfo = async () => {
    try {
      addEventListener((state) => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        updateIsInternetConnected(state.isConnected!);
      });
    } catch (error) {
      console.log("Error arises on checking network info");
    }
  };

  const checkTokenAuthentication = async () => {
    const storedToken = MMKVStorage.getString("FirebaseToken");
    if (storedToken) {
      try {
        setIsLoading(true);
        const currentUser = auth.currentUser;
        if (currentUser) {
          const newToken = await currentUser.getIdToken(true);
          MMKVStorage.setString("FirebaseToken", newToken);
          global.token = newToken;
          navigation.replace("BottomTabs");
          console.log("User authenticated");
        } else {
          navigation.replace("LoginScreen");
          console.log("User not authenticated");
        }
      } catch (error) {
        console.log("Token check error:", error);
        navigation.replace("LoginScreen");
      } finally {
        setIsLoading(false);
      }
    } else {
      navigation.replace("LoginScreen");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Loader isLoading={isLoading} />
    </View>
  );
};

export default WalkthroughScreen;
