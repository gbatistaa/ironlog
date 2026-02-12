import { useColorScheme } from "@/hooks/use-color-scheme";
import { Home } from "lucide-react-native";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#1E293B" : "#ffffff",
          borderTopColor: isDark ? "#1E293B" : "#e5e7eb",
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: isDark ? "#38bdf8" : "#38bdf8",
        tabBarInactiveTintColor: isDark ? "#6b7280" : "#9ca3af",
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
