import CardTitle from "@/components/CardTitle";
import { View, Text } from "react-native";

interface StatCardProps {
  value: string | number;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <View className="flex flex-1 justify-center items-center bg-[#1e293b] border border-gray-500/30 rounded-xl h-24">
      <CardTitle>{value}</CardTitle>
      <Text className="text-gray-400 text-sm">{label}</Text>
    </View>
  );
}
