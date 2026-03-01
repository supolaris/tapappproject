import React from 'react';
import LottieView from 'lottie-react-native';
import {Pressable, StyleSheet, TouchableOpacity} from 'react-native';

export default function LogoLottie() {
  return (
    <TouchableOpacity>
      <LottieView
        autoPlay
        loop
        style={styles.lottie}
        source={require('../../../assets/lottie/logoLottie.json')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 80,
    height: 80,
  },
});
