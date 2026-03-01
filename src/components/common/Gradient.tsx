import { borderRadius } from "@/src/constants/AppConstants";
import React from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface IProps {
  borderColor: string;
  children: any;
}

const Gradient: React.FC<IProps> = ({
  borderColor,

  children,
}) => {
  return (
    <LinearGradient
      colors={["#ffffff", "#cccccc"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[
        styles.linearGradient,
        {
          borderColor: borderColor,
        },
      ]}
    >
      {children}
    </LinearGradient>
  );
};

export default Gradient;

const styles = StyleSheet.create({
  linearGradient: {
    borderWidth: 1,
    borderRadius: borderRadius.medium,
  },
});
