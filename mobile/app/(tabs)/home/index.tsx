import Header from "@/components/home/Header/Header";
import StatsCards from "@/components/home/StatsCards/StatsCards";
import WorkoutsList from "@/components/home/WorkoutsList/WorkoutsList";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#0b1120]">
      <ScrollView
        contentContainerClassName="items-center gap-8 px-8 pt-24 pb-12"
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
      >
        <Header userName="Gabriel" />
        <StatsCards />
        <WorkoutsList />
      </ScrollView>
    </View>
  );
}
