import CardTitle from "@/components/CardTitle";
import { ChevronRight, Flame, Plus } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex items-center gap-8 bg-[#0b1120] px-8 pt-24 h-full">
      {/* Header */}
      <View className="flex flex-row justify-between items-center w-full">
        <View className="flex flex-col gap-2">
          <Text className="text-gray-400 text-lg">Good afternoon</Text>
          <Text className="font-bold text-white text-4xl">Gabriel</Text>
        </View>
        <View className="flex justify-center items-center bg-[#38bff8]/20 rounded-full w-16 h-16">
          <Flame color="#38BDF8" size={32} />
        </View>
      </View>

      {/* Stats cards */}
      <View className="flex flex-row gap-4 w-full">
        <View className="flex flex-1 justify-center items-center bg-[#1e293b] border border-gray-500/30 rounded-xl h-24">
          <CardTitle>3</CardTitle>
          <Text className="text-gray-400 text-sm">Workouts</Text>
        </View>
        <View className="flex flex-1 justify-center items-center bg-[#1e293b] border border-gray-500/30 rounded-xl h-24">
          <CardTitle>12</CardTitle>
          <Text className="text-gray-400 text-sm">Exercises</Text>
        </View>
        <View className="flex flex-1 justify-center items-center bg-[#1e293b] border border-gray-500/30 rounded-xl h-24">
          <CardTitle>3</CardTitle>
          <Text className="text-gray-400 text-sm">This week</Text>
        </View>
      </View>

      {/* Workouts list */}
      <View className="flex flex-col gap-2 w-full">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-bold text-white text-2xl">My workouts</Text>
          <Pressable className="flex flex-row items-center gap-2 bg-[#38bdf8]/10 px-4 py-1.5 rounded-full">
            <Plus color="#38bdf8" size={15} strokeWidth={3} />
            <Text className="font-semibold text-[#38bdf8] text-base">New</Text>
          </Pressable>
        </View>
      </View>

      <View className="flex flex-row gap-4 bg-[#1e293b] p-4 border border-gray-500/30 rounded-xl w-full">
        <View className="flex justify-center items-center bg-[#38bff8]/20 rounded-xl h-12 aspect-square">
          <Flame color="#38BDF8" size={24} />
        </View>
        <View className="flex flex-1">
          <CardTitle>Push</CardTitle>
          <Text className="text-gray-400 text-sm">12 exercises</Text>
        </View>
        <View className="flex justify-center items-center">
          <ChevronRight color="#94a3b8" size={24} />
        </View>
      </View>
    </View>
  );
}
