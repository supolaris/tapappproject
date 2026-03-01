import React from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { imageRegistry } from "../constants/ImageRegistry";

export const BottomTabIcon = (props: {
  size: number;
  color: string;
  focused: boolean;
  activeSource?: ImageSourcePropType;
  inActiveSource?: ImageSourcePropType;
}) => {
  const source = props?.focused ? props.activeSource : props.inActiveSource;
  return source ? (
    <Image
      resizeMode="contain"
      style={[styles.image, { width: props.size, height: props.size }]}
      source={source}
    />
  ) : null;
};

const styles = StyleSheet.create({
  image: {
    width: 28,
    height: 28,
  },
});
