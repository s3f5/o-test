import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { cn } from "~/lib/utils";

export type PropTypes = {
  textArray: string[];
  speed?: number;
  loop?: boolean;
  delay?: number;
  textStyle?: string;
  cursorStyle?: string;
  onChangeString?: (newString: string) => void;
  onTypeComplete?: () => void;
};

export const TypeWriter = ({
  textArray,
  speed = 300,
  loop = false,
  delay = 40,
  textStyle,
  cursorStyle,
  onChangeString,
  onTypeComplete, // ADDED: Deconstructed onTypeComplete
}: PropTypes) => {
  const [stringIndex, setStringIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const opacity = useSharedValue(0);
  const prevStringIndex = useRef<number | null>(null);

  const animatedCursorStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 300, easing: Easing.linear }),
      -1,
      true,
    );
  }, []);

  useEffect(() => {
    if (
      onChangeString &&
      textArray[stringIndex] &&
      stringIndex !== prevStringIndex.current
    ) {
      onChangeString(textArray[stringIndex]);
      prevStringIndex.current = stringIndex;
    }
  }, [stringIndex, textArray, onChangeString]);

  useEffect(() => {
    if (!textArray.length) return;

    const timeout = setTimeout(() => {
      if (!textArray[stringIndex]) return;

      if (textIndex < textArray[stringIndex].length) {
        setTextIndex((prevIndex) => prevIndex + 1);
      } else {
        if (stringIndex < textArray.length - 1) {
          setTimeout(() => {
            setTextIndex(0);
            setStringIndex((prevIndex) => prevIndex + 1);
          }, delay);
        } else {
          // Check for onTypeComplete before looping or finishing
          if (onTypeComplete) {
            onTypeComplete(); // Call the callback
          }

          if (loop) {
            setTimeout(() => {
              setTextIndex(0);
              setStringIndex(0);
            }, delay);
          }
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [textIndex, stringIndex, textArray, speed, loop, delay, onTypeComplete]);

  return (
    <View className="flex flex-row items-center">
      <Text className={cn("mr-2 text-xl text-foreground", textStyle)}>
        {textArray[stringIndex]?.substring(0, textIndex)}
      </Text>
      <Animated.View style={[animatedCursorStyle]}>
        <Text className={cn("h-7 w-7 rounded-full bg-primary", cursorStyle)}>
          {" "}
        </Text>
      </Animated.View>
    </View>
  );
};
