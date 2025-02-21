import "@bacons/text-decoder/install";
import "../../styles.css";

import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Text } from "~/components/ui/text";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerBackTitle: "Back",
            headerTitle(props) {
              return (
                <Text className="text-xl font-semibold">
                  {toOptions(props.children)}
                </Text>
              );
            },
          }}
        >
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="protected"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

function toOptions(name: string) {
  const title = name
    .split("-")
    .map(function (str: string) {
      return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    })
    .join(" ");
  return title;
}
