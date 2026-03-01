import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";

import MainHeader from "@/src/components/common/headers/MainHeader";
import { borderRadius } from "@/src/constants/AppConstants";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { IUserInfo } from "../../@types/apiInterfaces/commonInterface";
import CustomText from "../../components/common/CustomText";
import CustomTouchable from "../../components/common/touchables/CustomTouchable";
import { imageRegistry } from "../../constants/ImageRegistry";
import { TapAppColors } from "../../constants/TapAppColors";
import { getAgeFromDOB, getNameInitials } from "../../utils/CommonFunctions";

interface IProps {
  UserInfo: IUserInfo;
  profileProgress: number;
  onImagePressed: () => void;
  onHeaderHeartPressed: () => void;
  onHeaderSettingsPressed: () => void;
}

const UserInfo = (props: IProps) => {
  return (
    <View style={styles.container}>
      <MainHeader
        showBackIcon={false}
        showSettingsIcon={true}
        title="My Profile"
        onHeaderHeartPressed={props.onHeaderHeartPressed}
        onHeaderSettingsPressed={props.onHeaderSettingsPressed}
      />
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <View style={styles.userImageNameView}>
            <TouchableOpacity onPress={props.onImagePressed}>
              {props.UserInfo?.profilePicture ? (
                <Image
                  resizeMode="cover"
                  style={styles.image}
                  source={
                    props.UserInfo.profilePicture
                      ? { uri: props.UserInfo?.profilePicture }
                      : imageRegistry.tempUser
                  }
                />
              ) : (
                <View
                  style={{
                    height: 150,
                    width: 150,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CustomText
                    preset={{
                      fontSize: 15,
                      fontWeight: "regular",
                      color: TapAppColors.white,
                      text: getNameInitials(props.UserInfo?.Name),
                    }}
                    style={{
                      marginLeft: 5,
                    }}
                  />
                </View>
              )}

              <View style={styles.editIcon}>
                <Feather name="edit" size={25} color={TapAppColors.white} />
              </View>
            </TouchableOpacity>
            <Progress.Circle
              style={{
                position: "absolute",
                top: 32,
                zIndex: -1,
              }}
              borderWidth={0}
              unfilledColor="white"
              size={165}
              strokeCap="round"
              animated={true}
              indeterminate={false}
              thickness={7}
              color={TapAppColors.primaryColor}
              progress={props.profileProgress}
            />

            <View style={styles.nameAgeView}>
              <CustomText
                preset={{
                  text: `${props.UserInfo?.FirstName} ${props.UserInfo?.LastName},`,
                  color: TapAppColors.white,
                  fontSize: 15,
                  fontWeight: "regular",
                }}
              />

              <CustomText
                preset={{
                  fontSize: 15,
                  fontWeight: "regular",
                  color: TapAppColors.white,
                  text: getAgeFromDOB(props.UserInfo?.DOB),
                }}
                style={{
                  marginLeft: 5,
                }}
              />
            </View>
          </View>

          <View style={styles.profileBadgesView}>
            <View style={styles.badgeView}>
              <View style={styles.nameIconView}>
                <Entypo
                  name="star"
                  size={25}
                  color={TapAppColors.primaryColor}
                />
                <CustomText
                  numberOfLines={1}
                  preset={{
                    text: "Super Likes",
                    color: TapAppColors.white,
                    fontSize: 14,
                    fontWeight: "regular",
                  }}
                  style={styles.badgeText}
                />
              </View>
              <TouchableOpacity style={styles.plusIcon}>
                <AntDesign
                  name="plus-circle"
                  size={25}
                  color={TapAppColors.white}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.badgeView}>
              <View style={styles.nameIconView}>
                <FontAwesome5
                  name="bolt"
                  size={25}
                  color={TapAppColors.primaryColor}
                />
                <CustomText
                  numberOfLines={1}
                  preset={{
                    text: "My Boost",
                    color: TapAppColors.white,
                    fontSize: 14,
                    fontWeight: "regular",
                  }}
                  style={styles.badgeText}
                />
              </View>
              <TouchableOpacity style={styles.plusIcon}>
                <AntDesign
                  name="plus-circle"
                  size={25}
                  color={TapAppColors.white}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.badgeView}>
              <View style={styles.nameIconView}>
                <FontAwesome5
                  name="fire-alt"
                  size={25}
                  color={TapAppColors.primaryColor}
                />
                <CustomText
                  numberOfLines={1}
                  preset={{
                    text: "My Gold",
                    color: TapAppColors.white,
                    fontSize: 14,
                    fontWeight: "regular",
                  }}
                  style={styles.badgeText}
                />
              </View>
              <TouchableOpacity style={styles.plusIcon}>
                <AntDesign
                  name="plus-circle"
                  size={25}
                  color={TapAppColors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.featuresMainView}>
            <View style={styles.featuresInnerView}>
              <View style={styles.titleView}>
                <CustomText
                  numberOfLines={1}
                  preset={{
                    text: "What's Include",
                    color: TapAppColors.black,
                    fontSize: 15,
                    fontWeight: "semiBold",
                  }}
                />
              </View>
              <View style={styles.featureListView}>
                <View style={styles.plainTypesView}>
                  <CustomText
                    numberOfLines={1}
                    preset={{
                      text: "Gold",
                      color: TapAppColors.black,
                      fontSize: 15,
                      fontWeight: "semiBold",
                    }}
                    style={styles.feature}
                  />

                  <CustomText
                    numberOfLines={1}
                    preset={{
                      text: "Platinum",
                      color: TapAppColors.black,
                      fontSize: 15,
                      fontWeight: "semiBold",
                    }}
                    style={styles.feature}
                  />
                </View>
              </View>
            </View>

            <View style={styles.featuresInnerView}>
              <View style={styles.titleView}>
                <CustomText
                  numberOfLines={1}
                  preset={{
                    text: "Priority Likes",
                    color: TapAppColors.black,
                    fontSize: 13,
                    fontWeight: "regular",
                  }}
                />
              </View>
              <View style={styles.featureListView}>
                <Octicons
                  style={styles.feature}
                  name="horizontal-rule"
                  size={20}
                  color={TapAppColors.black}
                />
                <MaterialIcons
                  style={styles.feature}
                  name="done"
                  size={20}
                  color={TapAppColors.black}
                />
              </View>
            </View>

            <View style={styles.featuresInnerView}>
              <View style={styles.titleView}>
                <CustomText
                  numberOfLines={1}
                  preset={{
                    text: "Message Before Matching",
                    color: TapAppColors.black,
                    fontSize: 13,
                    fontWeight: "regular",
                  }}
                />
              </View>
              <View style={styles.featureListView}>
                <Octicons
                  style={styles.feature}
                  name="horizontal-rule"
                  size={20}
                  color={TapAppColors.black}
                />
                <MaterialIcons
                  style={styles.feature}
                  name="done"
                  size={20}
                  color={TapAppColors.black}
                />
              </View>
            </View>

            <View style={styles.featuresInnerView}>
              <View style={styles.titleView}>
                <CustomText
                  numberOfLines={1}
                  preset={{
                    text: "See Who Likes you",
                    color: TapAppColors.black,
                    fontSize: 13,
                    fontWeight: "regular",
                  }}
                />
              </View>
              <View style={styles.featureListView}>
                <MaterialIcons
                  style={styles.feature}
                  name="done"
                  size={20}
                  color={TapAppColors.black}
                />
                <MaterialIcons
                  style={styles.feature}
                  name="done"
                  size={20}
                  color={TapAppColors.black}
                />
              </View>
            </View>
            <CustomTouchable
              preset={{
                text: "See All Features",
                variant: "secondary",
                textColor: TapAppColors.black,
                fontSize: 15,
                fontWeight: "medium",
              }}
              style={{
                marginTop: 20,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapAppColors.appBackground,
  },
  innerContainer: {
    flex: 1,
  },
  userImageNameView: {
    alignItems: "center",
    backgroundColor: TapAppColors.black,
    paddingTop: 40,
    paddingBottom: 60,
  },
  imageView: {},
  image: {
    height: 150,
    width: 150,
    borderRadius: 150,
  },
  editIcon: {
    backgroundColor: TapAppColors.black,
    position: "absolute",
    right: 10,
  },
  nameAgeView: {
    marginTop: 10,
    flexDirection: "row",
  },

  profileBadgesView: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  badgeView: {
    width: "30%",
    backgroundColor: TapAppColors.black,
    borderRadius: borderRadius.medium,
    paddingVertical: 20,
  },
  nameIconView: {
    alignItems: "center",
  },
  badgeText: {
    textAlign: "center",
    marginTop: 5,
    width: "90%",
  },
  plusIcon: {
    position: "absolute",
    top: -5,
    right: -5,
  },
  featuresMainView: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: TapAppColors.white,
    borderRadius: borderRadius.medium,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  featuresInnerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleView: {
    width: "50%",
    paddingVertical: 10,
  },

  featureListView: {
    justifyContent: "center",
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  plainTypesView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  feature: {
    alignItems: "center",
    width: "50%",
    textAlign: "center",
    color: TapAppColors.black,
  },
});
