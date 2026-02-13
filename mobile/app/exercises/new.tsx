import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function NewExerciseScreen() {
  const router = useRouter();
  const translateY = useSharedValue(500);
  const backdropOpacity = useSharedValue(0);

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
      easing: Easing.out(Easing.cubic),
    });
    backdropOpacity.value = withTiming(0, { duration: 300 });
    setTimeout(() => router.back(), 300);
  };

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  return (
    <View className="flex-1 justify-end">
      {/* Backdrop */}
      <Animated.View
        style={[
          { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
          backdropStyle,
        ]}
      >
        <Pressable onPress={handleClose} className="flex-1 bg-black/50" />
      </Animated.View>

      {/* Modal card */}
      <Animated.View
        style={cardStyle}
        className="bg-[#0b1120] px-6 pt-6 pb-10 rounded-t-3xl h-[50%]"
      >
        <View className="flex flex-row justify-between items-center mb-6">
          <Text className="font-bold text-white text-xl">New Exercise</Text>
          <Pressable
            onPress={handleClose}
            className="bg-white/10 active:bg-white/20 p-2 rounded-full"
          >
            <X color="#ffffff" size={18} />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}
