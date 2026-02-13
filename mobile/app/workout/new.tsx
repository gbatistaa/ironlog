import { View, Text, TextInput, Pressable, Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { X } from "lucide-react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import api from "@/api/api";
import { AxiosError } from "axios";

const BORDER_DEFAULT = "rgba(255, 255, 255, 0.2)";
const BORDER_FOCUSED = "#38bdf8";
const TIMING_CONFIG = { duration: 200, easing: Easing.out(Easing.ease) };

export default function NewWorkoutScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const nameBorderStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      isNameFocused ? BORDER_FOCUSED : BORDER_DEFAULT,
      TIMING_CONFIG,
    ),
  }));

  const descriptionBorderStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      isDescriptionFocused ? BORDER_FOCUSED : BORDER_DEFAULT,
      TIMING_CONFIG,
    ),
  }));

  const handleCreateWorkout = async () => {
    try {
      const response = await api.post("/workout", {
        name,
        description,
      });
      console.log("Workout created:", response.data);
      router.back();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (Array.isArray(error.response?.data.message)) {
          error.response?.data.message.forEach((message: string) => {
            alert(message);
          });
        } else {
          alert(error.response?.data.message);
        }
      } else {
        alert("An error occurred while creating the workout.");
        console.error("Error creating workout:", error);
      }
    }
  };

  return (
    <Pressable
      onPress={Keyboard.dismiss}
      className="flex-1 bg-[#0b1120] px-6 pt-10"
    >
      <View className="flex flex-row justify-between items-center mb-8">
        <Text className="font-bold text-white text-2xl">New Workout</Text>
        <Pressable
          onPress={() => router.back()}
          className="bg-white/10 active:bg-white/20 p-2 rounded-full"
        >
          <X color="#ffffff" size={20} />
        </Pressable>
      </View>

      <View className="flex flex-col gap-5">
        <View className="flex flex-col gap-2">
          <Text className="font-semibold text-gray-400 text-sm">Name</Text>
          <Animated.View
            style={[{ borderWidth: 2, borderRadius: 12 }, nameBorderStyle]}
          >
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Push, Pull, Legs..."
              placeholderTextColor="#4b5563"
              className="bg-[#1e293b] px-4 py-3 rounded-xl text-white text-base"
              onFocus={() => setIsNameFocused(true)}
              onBlur={() => setIsNameFocused(false)}
            />
          </Animated.View>
        </View>

        <View className="flex flex-col gap-2">
          <Text className="font-semibold text-gray-400 text-sm">
            Description
          </Text>
          <Animated.View
            style={[
              { borderWidth: 2, borderRadius: 12 },
              descriptionBorderStyle,
            ]}
          >
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your workout..."
              placeholderTextColor="#4b5563"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              className="bg-[#1e293b] px-4 py-3 rounded-xl min-h-[100px] text-white text-base"
              onFocus={() => setIsDescriptionFocused(true)}
              onBlur={() => setIsDescriptionFocused(false)}
            />
          </Animated.View>
        </View>

        <Pressable
          className="bg-[#38bdf8] active:bg-[#38bdf8]/80 mt-4 py-3 rounded-xl"
          onPress={handleCreateWorkout}
        >
          <Text className="font-bold text-white text-base text-center">
            Create Workout
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
