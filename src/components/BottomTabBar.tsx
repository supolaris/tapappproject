import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
        <View style={styles.content}>
          {state.routes?.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                style={styles.tabButton}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                activeOpacity={0.7}
              >
                <View
                  style={[styles.tabItem, isFocused && styles.tabItemFocused]}
                >
                  {options.tabBarIcon
                    ? options.tabBarIcon({
                        focused: isFocused,
                        color: isFocused ? "#FFFFFF" : "#666666",
                        size: 20,
                      })
                    : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  blurContainer: {
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  content: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    // transition: "all 0.2s ease",
  },
  tabItemFocused: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export default BottomTabBar;
