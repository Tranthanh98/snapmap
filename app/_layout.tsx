import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";
import "../lib/i18n"; // Initialize i18n

import { SettingsProvider, useSettings } from "@/contexts/SettingsContext";

function AppContent() {
  const { isDarkMode } = useSettings();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="settings"
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
