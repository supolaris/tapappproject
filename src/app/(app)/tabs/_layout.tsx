import BottomTabBar from "@/src/components/BottomTabBar";
import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
      initialRouteName="home"
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#FFFFFF" : "#666666",
                fontSize: 15,
                fontWeight: focused ? "600" : "400",
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#FFFFFF" : "#666666",
                fontSize: 15,
                fontWeight: focused ? "600" : "400",
              }}
            >
              Likes
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="userInfo"
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#FFFFFF" : "#666666",
                fontSize: 15,
                fontWeight: focused ? "600" : "400",
              }}
            >
              Info
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
