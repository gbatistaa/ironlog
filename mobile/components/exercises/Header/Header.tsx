import { Text, View } from "react-native";

export default function Header() {
  return (
    <View className="flex w-full">
      <Text className="font-bold text-white text-3xl">Exercises</Text>
      <Text className="text-gray-400 text-lg">
        Manage your exercises catalog
      </Text>
    </View>
  );
}
