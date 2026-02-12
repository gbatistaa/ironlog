import React from "react";
import { Text } from "react-native";

export default function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Text className="font-bold text-white text-2xl">{children}</Text>
    </>
  );
}
