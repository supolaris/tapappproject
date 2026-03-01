import React from 'react';
import LottieView from 'lottie-react-native';
import {Pressable, StyleSheet} from 'react-native';
import {lottieRegistry} from '../../../constants/LottieRegistry';

export default function LoginLottie() {
  return (
    <Pressable>
      <LottieView
        autoPlay
        loop
        style={styles.lottie}
        source={lottieRegistry.logoLottie}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 500,
    height: 450,
  },
});
