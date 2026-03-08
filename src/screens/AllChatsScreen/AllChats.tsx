import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MainHeader from "../../components/common/headers/MainHeader";
import { FontFamily } from "../../constants/FontFamily";
import { MessageData } from "../../constants/StaticData";
import { TapAppColors } from "../../constants/TapAppColors";
import { activeOpacity } from "../../utils/CommonFunctions";

interface IAllChatsProps {
  onMessagePressed: () => void;
}

const AllChats = (props: IAllChatsProps) => {
  const renderMessages = ({ item }: { item: any }) => {
    return (
      <View style={styles.renderMessages}>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          style={styles.renderDetail}
          onPress={props.onMessagePressed}
        >
          <View style={styles.renderImageView}>
            <Image
              resizeMode="stretch"
              style={styles.renderImage}
              source={item.image}
            />
          </View>
          <View style={styles.renderDetailView}>
            <View style={styles.renderTitleView}>
              <Text style={styles.renderTitleText}>{item.name}</Text>
            </View>

            <View style={styles.renderMessageView}>
              <Text numberOfLines={2} style={styles.renderMessageText}>
                {item.message}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={activeOpacity}
          style={styles.renderTurnTouchable}
        >
          <Text style={styles.renderTurnTouchableText}>Your turn</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <MainHeader
        showBackIcon={false}
        showSettingsIcon={false}
        title="All Chats"
        onHeaderBackPressed={() => {}}
        onHeaderSettingsPressed={() => {}}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.titleText}>Messages</Text>
        <View style={styles.messagesFlatlistView}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={MessageData}
            renderItem={renderMessages}
          />
        </View>
      </View>
    </View>
  );
};

export default AllChats;

const styles = StyleSheet.create({
  renderMessages: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  renderDetail: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "80%",
  },
  renderImageView: {
    width: "13%",
    marginRight: 10,
    marginTop: 5,
  },
  renderImage: {
    height: 40,
    width: 40,
    backgroundColor: TapAppColors.primaryGray,
    borderRadius: 100,
  },
  renderDetailView: {
    width: "85%",
  },
  renderTitleTurnView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  renderTitleView: {
    width: "80%",
  },
  renderTitleText: {
    fontSize: 15,
    color: TapAppColors.white,
    fontFamily: FontFamily.medium,
  },
  renderTurnTouchable: {
    width: "20%",
    backgroundColor: TapAppColors.white,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 3,
  },
  renderTurnTouchableText: {
    fontSize: 13,
    color: TapAppColors.black,
    fontFamily: FontFamily.medium,
  },
  renderMessageView: {
    width: "90%",
  },
  renderMessageText: {
    width: "100%",
    fontSize: 13,
    color: TapAppColors.white,
    fontFamily: FontFamily.regular,
  },
  //
  container: {
    flex: 1,
    backgroundColor: TapAppColors.appBackground,
  },
  innerContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    marginVertical: 30,
  },
  titleText: {
    fontSize: 15,
    color: TapAppColors.white,
  },
  messagesFlatlistView: {
    flex: 1,
    paddingTop: 20,
  },
});
