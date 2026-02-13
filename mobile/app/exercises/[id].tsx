import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronDown, X } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { BORDER_DEFAULT, BORDER_FOCUSED, TIMING_CONFIG } from "../workout/new";
import { MuscleGroup } from "@/common/enums/muscle-group.enum";
import { useAtom } from "jotai";
import { editingExerciseAtom } from "@/components/exercises/ExercisesList/ExercisesList";
import api from "@/api/api";
import { AxiosError } from "axios";

const AnimatedChevron = Animated.createAnimatedComponent(ChevronDown);

export default function ExerciseModalScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isNew = id === "new";
  const translateY = useSharedValue(500);
  const backdropOpacity = useSharedValue(0);

  const [name, setName] = useState("");
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [description, setDescription] = useState("");
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [isPickerFocused, setIsPickerFocused] = useState(false);
  const [muscleGroup, setMuscleGroup] = useState(MuscleGroup.CHEST);
  const [videoUrl, setVideoUrl] = useState("");
  const [isVideoUrlFocused, setIsVideoUrlFocused] = useState(false);
  const [editingExercise, setEditingExercise] = useAtom(editingExerciseAtom);

  const useAnimatedBorderStyle = (isFocused: boolean) => {
    return useAnimatedStyle(() => ({
      borderColor: withTiming(
        isFocused ? BORDER_FOCUSED : BORDER_DEFAULT,
        TIMING_CONFIG,
      ),
    }));
  };

  const descriptionBorderStyle = useAnimatedBorderStyle(isDescriptionFocused);
  const nameBorderStyle = useAnimatedBorderStyle(isNameFocused);
  const pickerBorderStyle = useAnimatedBorderStyle(isPickerFocused);
  const videoUrlBorderStyle = useAnimatedBorderStyle(isVideoUrlFocused);

  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(
            isPickerFocused ? "180deg" : "0deg",
            TIMING_CONFIG,
          ),
        },
      ],
    };
  });

  const [modalVisible, setModalVisible] = useState(false);

  const openPicker = () => {
    setIsPickerFocused(true);
    setModalVisible(true);
    Keyboard.dismiss();
  };

  const handlePickerSelect = (group: MuscleGroup) => {
    setMuscleGroup(group);
    setModalVisible(false);
    setIsPickerFocused(false);
  };

  const handlePickerClose = () => {
    setModalVisible(false);
    setIsPickerFocused(false);
  };

  useEffect(() => {
    if (isNew) {
      setEditingExercise(null);
      setName("");
      setDescription("");
      setMuscleGroup(MuscleGroup.CHEST);
    } else if (editingExercise) {
      setName(editingExercise.name);
      setDescription(editingExercise.description || "");
      setMuscleGroup(editingExercise.muscleGroup);
      setVideoUrl(editingExercise.videoUrl || "");
    }
  }, [isNew, editingExercise, setEditingExercise]);

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
    backdropOpacity.value = withTiming(1, { duration: 300 });
  }, [translateY, backdropOpacity]);

  const handleClose = () => {
    translateY.value = withTiming(500, {
      duration: 300,
      easing: Easing.in(Easing.cubic),
    });
    backdropOpacity.value = withTiming(0, { duration: 300 });
    setTimeout(() => router.back(), 300);
  };

  const handleCreateExercise = async () => {
    try {
      const response = await api.post("/exercise", {
        name,
        description,
        muscleGroup,
        videoUrl,
      });
      console.log("Exercise created:", response.data);
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
        alert("An error occurred while creating the exercise.");
        console.error("Error creating exercise:", error);
      }
    }
  };

  const handleUpdateExercise = async () => {
    try {
      const response = await api.put(`/exercise/${id}`, {
        name,
        description,
        muscleGroup,
        videoUrl,
      });
      console.log("Exercise created:", response.data);
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
        alert("An error occurred while creating the exercise.");
        console.error("Error creating exercise:", error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-end bg-[#0b1120] p-6">
        {/* Modal card */}
        <View className="flex flex-row justify-between items-center mb-6">
          <Text className="font-bold text-white text-xl">
            {isNew ? "New Exercise" : "Edit Exercise"}
          </Text>
          <Pressable
            onPress={handleClose}
            className="bg-white/10 active:bg-white/20 p-2 rounded-full"
          >
            <X color="#ffffff" size={18} />
          </Pressable>
        </View>

        {/* TODO: Add form here */}
        <View className="flex-1 gap-4 pb-14">
          <View className="flex flex-col gap-2">
            <Text className="font-semibold text-gray-400 text-sm">Name</Text>
            <Animated.View
              style={[{ borderWidth: 2, borderRadius: 12 }, nameBorderStyle]}
            >
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="e.g. Leg Press, Squat, Bench Press ..."
                placeholderTextColor="#4b556f"
                className="flex bg-[#1e293b] px-4 py-3 rounded-xl text-white text-base"
                onFocus={() => setIsNameFocused(true)}
                onBlur={() => setIsNameFocused(false)}
              />
            </Animated.View>
          </View>
          <View className="flex flex-col gap-2">
            <Text className="font-semibold text-gray-400 text-sm">
              Muscle Group
            </Text>

            <Pressable onPress={openPicker}>
              <Animated.View
                style={[
                  { borderWidth: 2, borderRadius: 12 },
                  pickerBorderStyle,
                ]}
                className="flex-row justify-between items-center bg-[#1e293b]/60 px-4 py-4 rounded-xl"
              >
                <Text className="text-white text-base capitalize">
                  {muscleGroup.toLowerCase()}
                </Text>
                <AnimatedChevron
                  style={chevronStyle}
                  color={isPickerFocused ? BORDER_FOCUSED : BORDER_DEFAULT}
                  size={20}
                />
              </Animated.View>
            </Pressable>
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
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="e.g. Leg Press, Squat, Bench Press ..."
                placeholderTextColor="#4b556f"
                className="flex bg-[#1e293b] px-4 py-3 rounded-xl min-h-[100px] text-white text-base"
                onFocus={() => setIsDescriptionFocused(true)}
                onBlur={() => setIsDescriptionFocused(false)}
              />
            </Animated.View>
          </View>
          <View className="flex flex-col gap-2">
            <Text className="font-semibold text-gray-400 text-sm">
              Video URL
            </Text>
            <Animated.View
              style={[
                { borderWidth: 2, borderRadius: 12 },
                videoUrlBorderStyle,
              ]}
            >
              <TextInput
                value={videoUrl}
                onChangeText={setVideoUrl}
                placeholder="e.g. Leg Press, Squat, Bench Press ..."
                placeholderTextColor="#4b556f"
                className="flex bg-[#1e293b] px-4 py-3 rounded-xl text-white text-base"
                onFocus={() => setIsVideoUrlFocused(true)}
                onBlur={() => setIsVideoUrlFocused(false)}
              />
            </Animated.View>
          </View>
          <Pressable
            className="bg-[#38bdf8] active:bg-[#38bdf8]/80 disabled:opacity-50 mt-auto py-3 rounded-xl"
            disabled={
              name.trim() === "" ||
              !Object.values(MuscleGroup).includes(muscleGroup)
            }
            onPress={isNew ? handleCreateExercise : handleUpdateExercise}
          >
            <Text className="font-bold text-white text-base text-center">
              {isNew ? "Create Exercise" : "Update Exercise"}
            </Text>
          </Pressable>
        </View>

        {/* Custom Picker Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handlePickerClose}
        >
          <Pressable
            className="flex-1 justify-end bg-black/50"
            onPress={handlePickerClose}
          >
            <View className="bg-[#1e293b] rounded-t-3xl max-h-[50%]">
              <View className="flex-row justify-between items-center p-4 border-gray-700 border-b">
                <Text className="font-bold text-white text-lg">
                  Select Muscle Group
                </Text>
                <Pressable onPress={handlePickerClose}>
                  <X color="#9ca3af" size={24} />
                </Pressable>
              </View>
              <ScrollView className="p-4">
                {Object.values(MuscleGroup).map((group) => (
                  <Pressable
                    key={group}
                    className={`p-4 mb-2 rounded-xl ${
                      muscleGroup === group ? "bg-[#38bdf8]/20" : "bg-[#0f172a]"
                    }`}
                    onPress={() => handlePickerSelect(group)}
                  >
                    <Text
                      className={`font-semibold capitalize text-center ${
                        muscleGroup === group
                          ? "text-[#38bdf8]"
                          : "text-gray-300"
                      }`}
                    >
                      {group}
                    </Text>
                  </Pressable>
                ))}
                <View className="h-8" />
              </ScrollView>
            </View>
          </Pressable>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}
