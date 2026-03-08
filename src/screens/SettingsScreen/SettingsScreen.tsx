import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
// import { logoutUser } from "../../utils/CommonFunctions";
import { router } from "expo-router";
import Settings from "./Settings";

export const SettingsScreen = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onHeaderBackPressed = () => {
    navigation.goBack();
  };

  const onToggleSwitch = () => {};
  const onWhoCanSeePressed = () => {};
  const onMyVisibilityPressed = () => {};
  const onSavePressed = () => {};

  const onLogOutPressed = async () => {
    try {
      setIsLoading(true);
      const isDataCleared = await logoutUser();
      if (isDataCleared) {
        navigation.replace("WalkthroughScreen");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onBillingInfoPressed = () => {
    router.push("/(app)/billingInfo.router");
  };

  return (
    <Settings
      isLoading={isLoading}
      onHeaderBackPressed={onHeaderBackPressed}
      onToggleSwitch={onToggleSwitch}
      onWhoCanSeePressed={onWhoCanSeePressed}
      onMyVisibilityPressed={onMyVisibilityPressed}
      onSavePressed={onSavePressed}
      onLogOutPressed={onLogOutPressed}
      onBillingInfoPressed={onBillingInfoPressed}
    />
  );
};
