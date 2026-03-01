import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import PrimaryButton from './buttons/PrimaryButton';
import {imageRegistry} from '../../constants/ImageRegistry';
import {lottieRegistry} from '../../constants/LottieRegistry';
import {StyleSheet} from 'react-native';
import {TapAppColors} from '../../constants/TapAppColors';
import {FontFamily} from '../../constants/FontFamily';
import {Image} from 'react-native';

interface INoLikesDataProps {
  message1: string;
  message2: string;
  message3: string;
  onBoostPress: () => void;
}

const NoLikesData = (props: INoLikesDataProps) => {
  return (
    <View style={styles.noDataContainer}>
      <View style={styles.lottiView}>
        <LottieView
          style={styles.noDataLottie}
          source={lottieRegistry.wavesLottie}
          autoPlay
          loop
        />
        <Image
          resizeMode="stretch"
          style={styles.noDataImage}
          source={imageRegistry.tempUser}
        />
      </View>

      <View style={styles.messageTextView}>
        <Text
          style={[
            styles.messageText,
            {
              marginBottom: 15,
            },
          ]}>
          {props.message1}
        </Text>
        <Text style={styles.messageText}>{props.message2}</Text>
        <Text style={styles.messageText}>{props.message3}</Text>
      </View>

      <View style={styles.boostButtonView}>
        <PrimaryButton text="Boost" onPress={props.onBoostPress} />
      </View>
    </View>
  );
};

export default NoLikesData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapAppColors.appBackground,
  },
  innerContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  likesHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TapAppColors.black,
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  likesTypeTouchable: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: 5,
  },
  likesTypeTouchableText: {
    fontSize: 15,
    color: TapAppColors.white,
    fontFamily: FontFamily.medium,
  },
  //
  likesContainer: {
    flex: 1,
  },
  likesTouchable: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  lottiView: {
    height: '50%',
  },
  boostButtonView: {},

  //
  noDataContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  noDataLottie: {
    height: '100%',
    width: '100%',
  },
  noDataImage: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'red',
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: 50,
    width: 50,
    transform: [{translateX: -25}, {translateY: -25}],
  },
  messageTextView: {
    alignItems: 'center',
  },
  messageText: {
    fontSize: 15,
    color: TapAppColors.white,
  },
});
