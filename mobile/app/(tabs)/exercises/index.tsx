import { ScrollView, View } from "react-native";
import Header from "@/components/exercises/Header/Header";
import ExercisesList from "@/components/exercises/ExercisesList/ExercisesList";

export default function ExercisesScreen() {
  return (
    <View className="flex-1 bg-[#0b1120] w-full">
      <ScrollView
        contentContainerClassName="flex gap-4 px-8 pt-24 pb-12 w-full"
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
      >
        <Header />
        <ExercisesList />
      </ScrollView>
    </View>
  );
}
