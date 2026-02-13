import { Pressable, Text, TextInput, View } from "react-native";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  BORDER_DEFAULT,
  BORDER_FOCUSED,
  TIMING_CONFIG,
} from "@/app/workout/new";
import { useRouter } from "expo-router";

export default function ExercisesList() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchBorderStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      isSearchFocused ? BORDER_FOCUSED : BORDER_DEFAULT,
      TIMING_CONFIG,
    ),
  }));

  return (
    <View className="flex gap-4">
      <Animated.View
        style={[{ borderWidth: 2, borderRadius: 12 }, searchBorderStyle]}
      >
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="e.g. Leg Press, Squat, Bench Press ..."
          placeholderTextColor="#4b556f"
          className="flex bg-[#1e293b] px-4 py-3 rounded-xl text-white text-base"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </Animated.View>
      <Pressable
        onPress={() => router.push("/exercises/new")}
        className="bg-[#38bdf8]/10 active:bg-[#38bdf8]/20 mt-4 py-3 border-[#38bdf8]/20 border-2 border-dotted rounded-xl"
      >
        <Text className="font-bold text-white text-base text-center">
          Add Exercise
        </Text>
      </Pressable>
      <View></View>
    </View>
  );
}
