import React, { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type PropsType = {
  message?: string;
  show: boolean;
};
export function AnimatedErrorMessage({ message, show }: PropsType) {
  const height = useSharedValue(0);

  useEffect(() => {
    height.value = withTiming(show ? 20 : 0, { duration: 500 });
  }, [show, height]);

  const bodyStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: height.value > 0 ? 1 : 0,
  }));

  return (
    <Animated.View style={bodyStyle} className="overflow-hidden">
      {show && (
        <Text className="text-sm text-destructive-foreground">{message}</Text>
      )}
    </Animated.View>
  );
}
