import { View } from "react-native";
import StatCard from "./StatCard";

export interface Stat {
  value: string | number;
  label: string;
}

export default function StatsCards() {
  const stats = [
    { value: 3, label: "Workouts" },
    { value: 12, label: "Exercises" },
    { value: 3, label: "This week" },
  ];

  return (
    <View className="flex flex-row gap-4 w-full">
      {stats.map((stat, index) => (
        <StatCard key={index} value={stat.value} label={stat.label} />
      ))}
    </View>
  );
}
