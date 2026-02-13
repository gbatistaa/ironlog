import { Plus } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";
import WorkoutCard from "./WorkoutCard";
import api from "@/api/api";
import { useEffect, useState } from "react";
import { WorkoutType } from "@/interfaces/home/workout.interface";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";

export default function WorkoutsList() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await api.get("/workout");
        setWorkouts(response.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          alert("Error fetching workouts: " + error.response?.data.message);
        } else {
          console.error("Error fetching workouts:", error);
        }
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <View className="flex flex-col gap-4 w-full">
      <View className="flex flex-row justify-between items-center">
        <Text className="font-bold text-white text-2xl">My workouts</Text>
        <Pressable
          onPress={() => router.push("/workout/new")}
          className="flex flex-row items-center gap-2 bg-[#38bdf8]/20 active:bg-[#38bdf8]/50 px-4 py-1.5 rounded-full"
        >
          {({ pressed }) => (
            <>
              <Plus
                color={pressed ? "#ffffff" : "#38bdf8"}
                size={15}
                strokeWidth={3}
              />
              <Text
                className={`font-semibold text-base ${pressed ? "text-white" : "text-[#38bdf8]"}`}
              >
                New
              </Text>
            </>
          )}
        </Pressable>
      </View>

      {workouts.map((workout, index) => (
        <WorkoutCard
          key={index}
          workout={workout}
          onPress={() => alert("Workout pressed")}
        />
      ))}
    </View>
  );
}
