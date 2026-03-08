import { borderRadius } from "@/src/constants/AppConstants";
import { imageRegistry } from "@/src/constants/ImageRegistry";
import { normalizeHeight } from "@/src/utils/CommonFunctions";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IMatchedProfiles } from "../../../@types/apiInterfaces/homeInterface";
import { TapAppColors } from "../../../constants/TapAppColors";

interface IProps {
  item: IMatchedProfiles;
  onUserDetailsPressed: (userId: number) => void;
}

const RenderHomeUserSwiper = (props: IProps) => {
  const [imageError, setImageError] = useState(false);
  const finalImage =
    props.item?.default_image && !imageError
      ? { uri: props.item?.default_image }
      : imageRegistry.tempUser1;

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.flatListImageBackground}
      source={finalImage}
      onError={() => {
        setImageError(true);
      }}
    >
      <View style={styles.overlayView}>
        <View style={styles.useDetailsView}>
          <View style={styles.userNameAgeView}>
            <Text style={styles.userNameText}>{props.item?.first_name}</Text>
            {props.item?.age && (
              <Text style={styles.userAgeText}>{props.item?.age}</Text>
            )}
          </View>
          <View style={styles.locationView}>
            {props.item?.distance && (
              <Text style={styles.locationText}>
                {props.item?.distance} Miles Away
              </Text>
            )}
            <View style={{ justifyContent: "center", marginLeft: 8 }}>
              <Entypo
                style={styles.flatListLocationIcon}
                name="location"
                size={25}
                color="white"
              />
            </View>
          </View>
        </View>

        <View style={styles.iconsMainView}>
          <View style={styles.iconsView}>
            <TouchableOpacity style={styles.iconTouchable}>
              <Entypo name="cross" size={22} color="#f82b8e" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTouchable}>
              <AntDesign name="star" size={22} color="#0892ff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTouchable}>
              <AntDesign name="heart" size={22} color="#73cd37" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTouchable}>
              <FontAwesome name="bolt" size={22} color="#d050ef" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.iconTouchable}
            onPress={() => props.onUserDetailsPressed(props.item?.person_id)}
          >
            <AntDesign
              style={styles.flatListLocationIcon}
              name="profile"
              size={25}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RenderHomeUserSwiper;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListImageBackground: {
    overflow: "hidden",
    alignItems: "center",
    borderRadius: borderRadius.medium,
    justifyContent: "flex-end",
    height: normalizeHeight(800),
  },
  overlayView: {
    paddingBottom: 30,
    width: "90%",
  },
  useDetailsView: {},
  userNameAgeView: {
    marginVertical: 4,
    flexDirection: "row",
  },
  userNameText: {
    fontSize: 25,
    marginRight: 8,
    borderRadius: 10,
    paddingVertical: 5,
    textAlign: "center",
    paddingHorizontal: 10,
    color: TapAppColors.white,
    backgroundColor: TapAppColors.transparentBg,
  },
  userAgeText: {
    fontSize: 25,
    borderRadius: 10,
    textAlign: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: TapAppColors.white,
    backgroundColor: TapAppColors.transparentBg,
  },
  locationView: {
    paddingBottom: 20,
    flexDirection: "row",
  },
  flatListLocationIcon: {
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    backgroundColor: TapAppColors.transparentBg,
  },
  locationText: {
    fontSize: 25,
    borderRadius: 10,
    textAlign: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: TapAppColors.white,
    backgroundColor: TapAppColors.transparentBg,
  },
  iconsMainView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconsView: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconTouchable: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: TapAppColors.transparentBg,
  },
});
