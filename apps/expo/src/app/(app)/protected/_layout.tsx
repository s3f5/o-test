import * as React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      initialRouteName="welcome"
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
