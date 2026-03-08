import React, { useState } from "react";
import { ILikesSent } from "../../@types/apiInterfaces/SignalInterface";
// import { getLikesSentService } from "../../services/LikesServices";
import { SignalsEnums } from "@/src/constants/AppEnums";
import { useGetSentSignals } from "@/src/services/LikesServices";
import { useRouter } from "expo-router";
import Likes from "./Likes";

export function LikesScreen() {
  const router = useRouter();
  const [selectedLikesView, setSelectedLikesView] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signalsData, setSignalsData] = useState<ILikesSent[]>([]);

  const getSentSignalsResponse = useGetSentSignals(SignalsEnums.SENT);
  const getReceivedSignalsResponse = useGetSentSignals(SignalsEnums.RECEIVED);

  const onLikesTypePressed = (val: number) => {
    setSelectedLikesView(val);
  };

  const onBoostPress = () => {};

  const onUserPressed = (userId: number) => {
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
    <Likes
      isLoading={isLoading}
      signalsData={signalsData}
      selectedLikesView={selectedLikesView}
      likeSentData={getSentSignalsResponse?.data}
      likeReceivedData={getReceivedSignalsResponse?.data}
      onBoostPress={onBoostPress}
      onUserPressed={onUserPressed}
      onLikesTypePressed={onLikesTypePressed}
    />
  );
}
