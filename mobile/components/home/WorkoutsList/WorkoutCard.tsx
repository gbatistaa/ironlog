import CardTitle from "@/components/CardTitle";
import { ChevronRight, Flame } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";
import { WorkoutType } from "@/common/interfaces/home/workout.interface";

interface WorkoutCardProps {
  workout: WorkoutType;
  iconColor?: string;
  iconSize?: number;
  onPress?: () => void;
}

export default function WorkoutCard({
  workout,
  iconColor = "#38BDF8",
  iconSize = 24,
  onPress,
}: WorkoutCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex flex-row gap-4 bg-[#1e293b] p-4 border border-gray-500/30 rounded-xl w-full"
    >
      <View className="flex justify-center items-center bg-[#38bff8]/20 rounded-xl h-12 aspect-square">
        <Flame color={iconColor} size={iconSize} />
      </View>
      <View className="flex flex-1">
        <CardTitle size="small">{workout.name}</CardTitle>
        <Text className="text-gray-400">{workout.description}</Text>
      </View>
      <View className="flex justify-center items-center">
        <ChevronRight color="#94a3b8" size={24} />
      </View>
    </Pressable>
  );
}
