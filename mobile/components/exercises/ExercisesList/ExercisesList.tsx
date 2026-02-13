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
import { ExerciseType } from "@/common/interfaces/exercises/exercise.interface";
import { Dumbbell, Pencil, Trash, Trash2 } from "lucide-react-native";
import { MuscleGroupColor } from "@/common/enums/muscle-group-color.enum";

export const exercisesAtom = atom<ExerciseType[]>([]);
export const editingExerciseAtom = atom<ExerciseType | null>(null);

export default function ExercisesList() {
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [exercises, setExercises] = useAtom(exercisesAtom);
  const [, setEditingExercise] = useAtom(editingExerciseAtom);

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
      setExercises(
        data.sort((a, b) => a.muscleGroup.localeCompare(b.muscleGroup)),
      );
    };
    fetchExercises();
  }, [setExercises]);

  const handleEditExercise = (exercise: ExerciseType) => {
    setEditingExercise(exercise);
    router.push(`/exercises/${exercise.id}`);
  };

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
      <View className="flex justify-center gap-2">
        {exercises.map((exercise) => (
          <View
            key={exercise.id}
            className="flex flex-row items-center gap-2 bg-[#1e293b] p-4 rounded-xl"
          >
            <View className="flex justify-center items-center bg-[#38bdf8]/20 p-3 rounded-xl">
              <Dumbbell color="#38bdf8" size={20} strokeWidth={2} />
            </View>
            <View className="flex flex-col flex-1 gap-1">
              <Text className="font-bold text-white text-base">
                {exercise.name}
              </Text>
              <View
                className="self-start px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor:
                    MuscleGroupColor[exercise.muscleGroup] + "33",
                }}
              >
                <Text
                  className="font-bold text-sm capitalize"
                  style={{ color: MuscleGroupColor[exercise.muscleGroup] }}
                >
                  {exercise.muscleGroup}
                </Text>
              </View>
            </View>
            <View className="flex flex-row gap-2">
              <Pressable
                onPress={() => handleEditExercise(exercise)}
                className="active:bg-gray-500/40 p-2 rounded-xl"
              >
                <Pencil color="#9ca3af" size={20} strokeWidth={2} />
              </Pressable>
              <Pressable
                onPress={() => console.log("Delete", exercise.id)}
                className="active:bg-red-500/40 p-2 rounded-xl"
              >
                <Trash2 color="#ef4444" size={20} strokeWidth={2} />
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
