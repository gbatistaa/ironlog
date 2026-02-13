import { Flame } from "lucide-react-native";
import { View, Text } from "react-native";
import useGreeting from "./useGreeting";

interface HeaderProps {
  userName: string;
  iconColor?: string;
  iconSize?: number;
}

export default function Header({
  userName,
  iconColor = "#38BDF8",
  iconSize = 32,
}: HeaderProps) {
  const greeting = useGreeting();

  return (
    <View className="flex flex-row justify-between items-center w-full">
      <View className="flex flex-col gap-2">
        <Text className="text-gray-400 text-lg">{greeting}</Text>
        <Text className="font-bold text-white text-4xl">{userName}</Text>
      </View>
      <View className="flex justify-center items-center bg-[#38bff8]/20 rounded-full w-16 h-16">
        <Flame color={iconColor} size={iconSize} />
      </View>
    </View>
  );
}
