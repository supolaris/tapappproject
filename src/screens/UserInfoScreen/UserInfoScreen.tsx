import { router } from "expo-router";
import React, { useState } from "react";
import { UserContext } from "../../context/Context";
import UserInfo from "./UserInfo";

export const UserInfoScreen = () => {
  const { currentUserCtx } = UserContext();
  const [profileProgress, setProfileProgress] = useState(0.4);

  const onHeaderHeartPressed = () => {
    router.push("/(app)/matchPreferences.router");
  };

  const onHeaderSettingsPressed = () => {
    router.push("/(app)/settings.router");
  };
  const onImagePressed = () => {
    console.log("first");

    router.push("/(app)/myPreferences.router");
  };

  return (
    <UserInfo
      profileProgress={profileProgress}
      UserInfo={currentUserCtx?.UserInfo}
      onImagePressed={onImagePressed}
      onHeaderHeartPressed={onHeaderHeartPressed}
      onHeaderSettingsPressed={onHeaderSettingsPressed}
    />
  );
};
