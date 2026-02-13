import "../global.css";

import { ThemeProvider, type Theme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import "react-native-reanimated";

const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: "#0a7ea4",
    background: "#ffffff",
    card: "#ffffff",
    text: "#11181C",
    border: "#e5e7eb",
    notification: "#ef4444",
  },
  fonts: {
    regular: { fontFamily: "System", fontWeight: "400" },
    medium: { fontFamily: "System", fontWeight: "500" },
    bold: { fontFamily: "System", fontWeight: "700" },
    heavy: { fontFamily: "System", fontWeight: "800" },
  },
};

const CustomDarkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#0a7ea4",
    background: "#000000",
    card: "#1e2022",
    text: "#ffffff",
    border: "#2d3134",
    notification: "#ef4444",
  },
  fonts: LightTheme.fonts,
};

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? CustomDarkTheme : LightTheme}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Modal",
          }}
        />
        <Stack.Screen
          name="workout/new"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
