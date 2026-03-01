import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../context/AuthContext";
import { UserProvider } from "../context/Context";
import { AuthProvider } from "../context/AuthContext";
import { useEffect } from "react";
import { router } from "expo-router";
import "react-native-reanimated";
import queryClient from "../context/queryClient";

// Index screen that redirects based on auth state
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <AuthNavigator />
            <StatusBar style="dark" animated backgroundColor="#ffffff" />
          </ThemeProvider>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function AuthNavigator() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is logged in, redirect to app
        router.replace("/(app)/tabs/home");
      } else {
        // User is not logged in, show auth screen
        router.replace("/auth");
      }
    }
  }, [user, loading]);

  if (loading) {
    return null; // Or show a loading spinner
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="likesDetail" options={{ title: "Likes Detail" }} />
    </Stack>
  );
}
