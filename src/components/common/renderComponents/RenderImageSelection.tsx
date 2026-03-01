import React, { memo } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { TapAppColors } from "../../../constants/TapAppColors";
import { activeOpacity, borderRadius } from "../../../utils/CommonFunctions";

interface IRenderImageSelection {
  index: number;
  item: { image: string };
  onImageDeletePressed: (index: number) => void;
  onImageSelectionPressed: (index: number) => void;
}

const RenderImageSelection = (props: IRenderImageSelection) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={activeOpacity}
      onPress={() => props.onImageSelectionPressed(props.index)}
    >
      <View
        style={[
          styles.innerContainer,
          {
            borderWidth: props.item.image ? 0 : 1,
            borderStyle: props.item.image ? "solid" : "dashed",
          },
        ]}
      >
        <Image
          resizeMode="cover"
          style={styles.imageStyles}
          source={{
            uri: props.item.image,
          }}
        />
      </View>
      {props.item?.image !== "" && (
        <TouchableOpacity
          style={styles.addDelTouchable}
          activeOpacity={activeOpacity}
          onPress={() => props.onImageDeletePressed(props.index)}
        >
          <Entypo name="cross" size={17} color={TapAppColors.white} />
        </TouchableOpacity>
      )}
      {props.item?.image === "" && (
        <TouchableOpacity
          style={[
            styles.addDelTouchable,
            {
              backgroundColor: TapAppColors.primaryColor,
              borderColor: TapAppColors.white,
            },
          ]}
          activeOpacity={activeOpacity}
          onPress={() => props.onImageSelectionPressed(props.index)}
        >
          <Entypo name="plus" size={17} color={TapAppColors.white} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default memo(RenderImageSelection);

const styles = StyleSheet.create({
  container: {
    margin: 5,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: TapAppColors.transparentImagesBg,
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    alignSelf: "center",

    borderRadius: borderRadius,
    borderColor: TapAppColors.borderColor,
  },
  imageStyles: {
    height: "99%",
    width: "99%",
    borderRadius: borderRadius,
  },

  addDelTouchable: {
    right: -3,
    bottom: -3,
    borderWidth: 0.5,
    borderRadius: 100,
    padding: 2,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: TapAppColors.black,
    borderColor: TapAppColors.white,
  },
});
