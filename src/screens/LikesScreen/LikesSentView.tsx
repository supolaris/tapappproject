import { ISignalsData } from "@/src/@types/apiInterfaces/signalsInterface";
import { borderRadius } from "@/src/constants/AppConstants";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NoLikesData from "../../components/common/NoLikesData";
import { InteractionsEnums } from "../../constants/AppEnums";
import { AppMessages } from "../../constants/AppMessages";
import { FontFamily } from "../../constants/FontFamily";
import { TapAppColors } from "../../constants/TapAppColors";
import { activeOpacity } from "../../utils/CommonFunctions";

interface IProps {
  likesData: ISignalsData[];
  onBoostPress: () => void;
  onUserPressed: (userId: number) => void;
}

const LikesSentReceiveView = (props: IProps) => {
  const renderItem = ({ item }: { item: ISignalsData }) => {
    return (
      <TouchableOpacity
        onPress={() => props.onUserPressed(item.TapRecepientID)}
        activeOpacity={activeOpacity}
        style={styles.renderContainer}
      >
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: item.counterparty?.default_image }}
        />
        <View style={styles.interactionView}>
          <AntDesign
            size={
              item.SignalDetails?.action === InteractionsEnums.LIKE ? 40 : 45
            }
            color={TapAppColors.primaryColor}
            name={
              item.SignalDetails?.action === InteractionsEnums.LIKE
                ? "heart"
                : "star"
            }
          />
          <Text
            numberOfLines={1}
            style={[
              styles.timeText,
              {
                top:
                  item.SignalDetails?.action === InteractionsEnums.LIKE
                    ? 5
                    : 10,
              },
            ]}
          >
            {item.hoursLeft}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {props.likesData ? (
        <View style={styles.flatListView}>
          <FlatList
            numColumns={3}
            data={props.likesData}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    height: 30,
                  }}
                />
              );
            }}
          />
        </View>
      ) : (
        <NoLikesData
          onBoostPress={props.onBoostPress}
          message1="Likes sent will appear here"
          message2={AppMessages.boostMessage}
          message3={AppMessages.boost10x}
        />
      )}
    </View>
  );
};

export default LikesSentReceiveView;

const styles = StyleSheet.create({
  renderContainer: {
    margin: 5,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: borderRadius.large,
    backgroundColor: TapAppColors.inactiveColor,
  },
  interactionView: {
    right: 2,
    bottom: 0,
    position: "absolute",
  },
  timeText: {
    fontSize: 20,
    alignSelf: "center",
    position: "absolute",
    color: TapAppColors.black,
    fontFamily: FontFamily.medium,
  },
  //
  container: {
    flex: 1,
  },
  flatListView: {
    alignItems: "center",
  },
});
