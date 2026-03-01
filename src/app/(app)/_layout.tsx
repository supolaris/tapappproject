import { Stack } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function AppLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="tabs"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profilePreview"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="billingInfo"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="myPreferences"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
