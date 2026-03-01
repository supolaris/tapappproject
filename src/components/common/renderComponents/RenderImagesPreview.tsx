import React, { useEffect, useRef, useState } from "react";

import { IUserImages } from "@/src/@types/apiInterfaces/MyProfilePreferencesInterface";
import { useIsFocused } from "@react-navigation/native";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ImageView from "react-native-image-viewing";
import { TapAppColors } from "../../../constants/TapAppColors";
import { activeOpacity } from "../../../utils/CommonFunctions";

interface IProps {
  userImages: IUserImages[];
}

const RenderImagesPreview = (props: IProps) => {
  const isFocused = useIsFocused();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isFocused || !props.userImages?.length || visible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % props.userImages?.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isFocused, props.userImages, visible]);

  const onImagePressed = () => {
    setIsVisible(true);
  };

  // Return null if no data (after all hooks are called)
  if (!props.userImages || props.userImages.length === 0) {
    return null;
  }

  const renderBanners = ({ item }: { item: IUserImages }) => {
    return (
      <View style={{ width: 396 }}>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={onImagePressed}
        >
          <Image
            resizeMode="stretch"
            source={{ uri: item.URL }}
            style={{ width: "100%", height: 200 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageView
        images={props.userImages?.map((img) => ({ uri: img.URL }))}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="center"
        scrollEventThrottle={16}
        renderItem={renderBanners}
        snapToInterval={397}
        showsHorizontalScrollIndicator={false}
        data={props.userImages}
        keyExtractor={(index) => index.toString()}
        getItemLayout={(_, index) => ({
          length: 397,
          offset: 397 * index,
          index,
        })}
        onMomentumScrollEnd={(e) => {
          const offsetX = e.nativeEvent.contentOffset.x;
          const newIndex = Math.round(offsetX / 397);
          setCurrentIndex(newIndex);
        }}
      />
      <View
        style={{
          marginTop: 8,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {props.userImages?.map((_: any, i: number) => (
          <View
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: 50,
              marginHorizontal: 3,
              backgroundColor:
                i === currentIndex
                  ? TapAppColors.primaryColor
                  : TapAppColors.black,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default RenderImagesPreview;

const styles = StyleSheet.create({
  container: {},
});
