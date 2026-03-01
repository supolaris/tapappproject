import Loader from "@/src/components/common/Loader";
import RenderHomeUserSwiper from "@/src/components/common/renderComponents/RenderHomeUserSwiper";
import { TapAppColors } from "@/src/constants/TapAppColors";
import React from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { SafeAreaView } from "react-native-safe-area-context";

interface IHomeProps {
  isLoading: boolean;
  isHomeSwipePopupVisible: boolean;
  homeUsersData: any[];
  onUserSwipe: (index: number, interaction: string) => void;
  onUserDetailsPressed: (userData: any) => void;
}

const Home = (props: IHomeProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <Loader isLoading={props.isLoading} />
        {/* <HomeSwipePopup
          swipeDirection={"helloWorld"}
          isHomeSwipePopupVisible={false}
        /> */}
        <Swiper
          backgroundColor="transparent"
          containerStyle={{
            width: "100%",
            height: "100%",
          }}
          infinite
          stackSize={3}
          showSecondCard
          marginTop={20}
          stackSeparation={-20}
          cardVerticalMargin={0}
          cardHorizontalMargin={0}
          cards={props.homeUsersData}
          keyExtractor={(cardData) => cardData?.profile?.TapUserID ?? null}
          onSwipedTop={(index) => props.onUserSwipe(index, "superlike")}
          onSwipedLeft={(index) => props.onUserSwipe(index, "dislike")}
          onSwipedRight={(index) => props.onUserSwipe(index, "like")}
          onSwipedBottom={(index) => props.onUserSwipe(index, "skip")}
          renderCard={(item) => (
            <RenderHomeUserSwiper
              item={item}
              onUserDetailsPressed={props.onUserDetailsPressed}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapAppColors.appBackground,
  },
});
