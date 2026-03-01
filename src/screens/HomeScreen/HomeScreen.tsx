import { UserContext } from "@/src/context/Context";
import {
  useAddUserInteraction,
  useGetCurrentUserService,
  useGetMatchedProfilesService,
} from "@/src/services/HomeServices";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { HomeScreenUsersData } from "../../constants/StaticData";
import Home from "./Home";

let likedUsersIndexes: number[] = [];
let dislikedUsersIndexes: number[] = [];
let superLikedUsersIndexes: number[] = [];

export function HomeScreen() {
  const router = useRouter();
  const [isHomeSwipePopupVisible, setIsHomeSwipePopupVisible] =
    useState<boolean>(false);
  const { updateCurrentUserCtx } = UserContext();

  const homeUsersResponse = useGetMatchedProfilesService();
  const homeUserInteractionResponse = useAddUserInteraction();
  const getCurrentUserResponse = useGetCurrentUserService();

  updateCurrentUserCtx(getCurrentUserResponse?.data);

  const swipeAction = () => {
    const interval = setInterval(() => {
      setIsHomeSwipePopupVisible(true);
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      setIsHomeSwipePopupVisible(false);
    }, 500);
  };

  const filterUsers = () => {
    const likedFilteredUsers = likedUsersIndexes.map(
      (index) => HomeScreenUsersData[index]?.id,
    );
    const dislikedFilteredUsers = dislikedUsersIndexes.map(
      (index) => HomeScreenUsersData[index]?.id,
    );
    const superLikedFilteredUsers = superLikedUsersIndexes.map(
      (index) => HomeScreenUsersData[index]?.id,
    );
  };

  const onUserSwipe = (index: number, interaction: string) => {
    const targetUserId = homeUsersResponse?.data?.[index]?.person_id;

    if (!targetUserId) {
      console.log("Target user id not found =>>>>>", targetUserId);
      return;
    }

    homeUserInteractionResponse.mutate(
      {
        TapRecepientID: 18,
        SignalDetails: {
          action: interaction,
          source: "profile_grid",
          note: "Loves hiking photos",
        },
      },
      {
        onSuccess: (res) => {
          console.log("interaction success =>>>", res);
        },
        onError: (err: any) => {
          console.log("interaction error =>>>>", err);
        },
      },
    );

    // from left
    //    swipeAction();
    // if (!dislikedUsersIndexes.includes(index)) {
    //   likedUsersIndexes.push(index);
    // }

    // from right
    //    swipeAction();
    // if (!likedUsersIndexes.includes(index)) {
    //   likedUsersIndexes.push(index);
    // }

    // from top
    //   swipeAction();
    // if (!likedUsersIndexes.includes(index)) {
    //   superLikedUsersIndexes.push(index);
    // }
  };

  const onUserDetailsPressed = (userId: number) => {
    if (!userId) {
      console.log("userId is not available for preview =>>>>>", userId);
      return;
    }
    router.push({
      pathname: "/(app)/profilePreview.router",
      params: {
        userId: userId,
      },
    });
  };

  return (
    <Home
      isLoading={homeUsersResponse?.isLoading}
      // homeUsersData={[]}
      homeUsersData={homeUsersResponse?.data ?? []}
      isHomeSwipePopupVisible={isHomeSwipePopupVisible}
      onUserSwipe={onUserSwipe}
      onUserDetailsPressed={onUserDetailsPressed}
    />
  );
}
