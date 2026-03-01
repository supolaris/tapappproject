import React from "react";
// import {FontFamily} from '../../constants/FontFamily';
import { ISignalsData } from "@/src/@types/apiInterfaces/signalsInterface";
import MainHeader from "@/src/components/common/headers/MainHeader";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ILikesSent } from "../../@types/apiInterfaces/SignalInterface";
import { TapAppColors } from "../../constants/TapAppColors";
import LikesSentReceiveView from "./LikesSentView";

interface ILikesProps {
  likeSentData: ISignalsData[];
  likeReceivedData: ISignalsData[];
  signalsData: ILikesSent[];
  isLoading: boolean;
  selectedLikesView: number;
  onBoostPress: () => void;
  onLikesTypePressed: (val: number) => void;
}

const Likes = (props: ILikesProps) => {
  const router = useRouter();

  const navigateToProfilePreview = () => {};

  return (
    <View style={styles.container}>
      {/* Navigation button to profile preview */}
      {/* <Loader isLoading={props.isLoading} /> */}
      <TouchableOpacity
        style={styles.profilePreviewButton}
        onPress={navigateToProfilePreview}
      >
        <Text style={styles.profilePreviewButtonText}>
          View Profile Preview
        </Text>
      </TouchableOpacity>

      <MainHeader showBackIcon={false} showSettingsIcon={false} title="Likes" />
      <View style={styles.likesHeaderView}>
        <View
          style={[
            styles.likesTypeTouchable,
            {
              borderRightWidth: 0.5,
              borderRightColor: TapAppColors.white,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => props.onLikesTypePressed(0)}
            style={styles.likesTouchable}
          >
            <Text
              style={[
                styles.likesTypeTouchableText,
                {
                  color:
                    props.selectedLikesView === 0
                      ? TapAppColors.white
                      : TapAppColors.primayGray,
                },
              ]}
            >
              Likes
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.likesTypeTouchable,
            {
              borderRightWidth: 0.5,
              borderRightColor: TapAppColors.white,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => props.onLikesTypePressed(1)}
            style={styles.likesTouchable}
          >
            <Text
              style={[
                styles.likesTypeTouchableText,
                {
                  color:
                    props.selectedLikesView === 1
                      ? TapAppColors.white
                      : TapAppColors.primayGray,
                },
              ]}
            >
              Likes Sent
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.likesTypeTouchable}>
          <TouchableOpacity
            onPress={() => props.onLikesTypePressed(2)}
            style={styles.likesTouchable}
          >
            <Text
              style={[
                styles.likesTypeTouchableText,
                {
                  color:
                    props.selectedLikesView === 2
                      ? TapAppColors.white
                      : TapAppColors.primayGray,
                },
              ]}
            >
              Top Picks
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.innerContainer}>
        {props.selectedLikesView === 0 ? (
          <LikesSentReceiveView likesData={props.likeReceivedData} />
        ) : props.selectedLikesView === 1 ? (
          <LikesSentReceiveView likesData={props.likeSentData} />
        ) : (
          <LikesSentReceiveView likesData={props.likeReceiveData} />
        )}
      </View>
    </View>
  );
};

export default Likes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapAppColors.appBackground,
  },
  innerContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  likesHeaderView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: TapAppColors.black,
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  likesTypeTouchable: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 5,
  },
  likesTypeTouchableText: {
    fontSize: 15,
    color: TapAppColors.white,
    // fontFamily: FontFamily.medium,
  },
  //
  likesContainer: {
    flex: 1,
  },
  likesTouchable: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  lottiView: {
    height: "50%",
  },
  boostButtonView: {},

  //
  noDataContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  noDataLottie: {
    height: "100%",
    width: "100%",
  },
  noDataImage: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "red",
    position: "absolute",
    top: "50%",
    left: "50%",
    height: 50,
    width: 50,
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  messageTextView: {
    alignItems: "center",
  },
  messageText: {
    fontSize: 15,
    color: TapAppColors.white,
  },
  profilePreviewButton: {
    backgroundColor: TapAppColors.white,
    margin: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  profilePreviewButtonText: {
    color: TapAppColors.black,
    fontWeight: "600",
    fontSize: 16,
  },
});
