import { forwardRef } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import * as SwitchPrimitives from "@rn-primitives/switch";
import { useUnstableNativeVariable } from "nativewind";

import { cn } from "~/lib/utils";

const Switch = forwardRef<
  SwitchPrimitives.RootRef,
  SwitchPrimitives.RootProps & {
    width?: number;
  }
>(({ className, width = 64, ...props }, ref) => {
  const translateX = useDerivedValue(() => (props.checked ? width - 28 : 0));

  const border = useUnstableNativeVariable("--grey-400") as string;
  const primary: string = useUnstableNativeVariable("--blue-600") as string;

  const animatedRootStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      Number(props.checked),
      [0, 1],
      [border, primary],
    );
    return {
      backgroundColor: withTiming(color, { duration: 200 }),
    };
  });

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(translateX.value, { duration: 400 }) },
    ],
  }));

  return (
    <Animated.View
      style={animatedRootStyle}
      className={cn(
        `h-8 w-[64px] rounded-full`,
        props.disabled && "opacity-50",
      )}
    >
      <SwitchPrimitives.Root
        className={cn(
          `h-8 w-[64px] shrink-0 flex-row items-center rounded-full border-2 border-transparent bg-transparent`,
          className,
        )}
        {...props}
        ref={ref}
      >
        <Animated.View style={animatedThumbStyle}>
          <SwitchPrimitives.Thumb
            className={
              "shadow-foreground/25 h-7 w-7 rounded-full bg-background shadow-md ring-0"
            }
          />
        </Animated.View>
      </SwitchPrimitives.Root>
    </Animated.View>
  );
});

Switch.displayName = "Switch";

export { Switch };
