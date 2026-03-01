import React, { useEffect, useState } from "react";
import { ILikesSent } from "../../@types/apiInterfaces/SignalInterface";
// import { getLikesSentService } from "../../services/LikesServices";
import { SignalsEnums } from "@/src/constants/AppEnums";
import { useGetSentSignals } from "@/src/services/LikesServices";
import Likes from "./Likes";

export function LikesScreen() {
  const [selectedLikesView, setSelectedLikesView] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signalsData, setSignalsData] = useState<ILikesSent[]>([]);

  const getSentSignalsResponse = useGetSentSignals(SignalsEnums.SENT);
  const getReceivedSignalsResponse = useGetSentSignals(SignalsEnums.RECEIVED);

  const onLikesTypePressed = (val: number) => {
    setSelectedLikesView(val);
  };

  const onBoostPress = () => {};

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    // try {
    //   setIsLoading(true);
    //   // const response = await getLikesSentService("sent");
    //   if (response) {
    //     console.log("response of likes sent", response);
    //     setSignalsData(response);
    //   }
    // } catch (error) {
    //   console.log("Error in getting my profile data", error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Likes
      likeSentData={getSentSignalsResponse?.data}
      likeReceivedData={getReceivedSignalsResponse?.data}
      signalsData={signalsData}
      isLoading={isLoading}
      selectedLikesView={selectedLikesView}
      onBoostPress={onBoostPress}
      onLikesTypePressed={onLikesTypePressed}
    />
  );
}
