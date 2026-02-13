import React from "react";
import { Text } from "react-native";

export default function CardTitle({
  children,
  size,
}: {
  children: React.ReactNode;
  size?: "small" | "large";
}) {
  return (
    <>
      <Text
        className={`font-bold text-white ${size === "small" ? "text-xl" : "text-2xl"}`}
      >
        {children}
      </Text>
    </>
  );
}
