import { Pressable, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
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
import { atom, useAtom } from "jotai";
import api from "@/api/api";
import { ExerciseType } from "@/interfaces/exercises/exercise.interface";

const exercisesAtom = atom<ExerciseType[]>([]);

export default function ExercisesList() {
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [exercises, setExercises] = useAtom(exercisesAtom);

  const router = useRouter();

  const searchBorderStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      isSearchFocused ? BORDER_FOCUSED : BORDER_DEFAULT,
      TIMING_CONFIG,
    ),
  }));

  useEffect(() => {
    const fetchExercises = async () => {
      const { data } = await api.get<ExerciseType[]>("/exercise");
      setExercises(data);
    };
    fetchExercises();
  }, [setExercises]);

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
        onPress={() => router.push("/exercises/modal")}
        className="bg-[#38bdf8]/10 active:bg-[#38bdf8]/20 mt-4 py-3 border-[#38bdf8]/20 border-2 border-dotted rounded-xl"
      >
        <Text className="font-bold text-white text-base text-center">
          Add Exercise
        </Text>
      </Pressable>
      <View className="flex gap-2">
        {exercises.map((exercise) => (
          <View key={exercise.id} className="flex flex-row gap-2">
            <Text className="text-white">{exercise.name}</Text>
            <Text className="text-white">{exercise.muscleGroup}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
