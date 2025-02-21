import * as React from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Link, useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { LogoSvg } from "~/lib/icons/logo";

const formSchema = z.object({
  email: z.string().email({ message: "true" }),
  password: z.string().min(8, { message: "true" }),
});

type FormData = z.infer<typeof formSchema>;

export default function Index() {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const onFocusHandler = () => {
    translateY.value = withTiming(-50, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const onBlurHandler = () => {
    translateY.value = withTiming(0, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const handleSignIn = (data: FormData) => {
    console.log("Form Data:", data);
    router.replace("/(app)/protected/welcome");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <Animated.View style={[animatedStyle, { flex: 1 }]}>
        <View className="flex-1 px-4">
          <View className="flex-1 items-center justify-end pb-12">
            <LogoSvg />
          </View>
          <View className="flex-1 gap-4 mt-12">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={t("login.mailPlaceholder")}
                  onFocus={onFocusHandler}
                  onBlur={onBlurHandler}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <Text className="text-destructive-foreground">
                {t("login.mailErrorMsg")}
              </Text>
            )}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={t("login.passwordPlaceholder")}
                  secureTextEntry
                  onFocus={onFocusHandler}
                  onBlur={onBlurHandler}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.password && (
              <Text className="text-foreground">
                {t("login.passwordErrorMsg")}
              </Text>
            )}

            <Button onPress={handleSubmit(handleSignIn)} className="rounded-xl">
              <Text className="text-md font-semibold text-primary-foreground">
                {t("global.continue")}
              </Text>
            </Button>

            <Link href="/" className="text-md text-center text-foreground">
              {t("login.forgotPW")}
            </Link>
          </View>
          <View className="flex-[0.5] items-center justify-center">
            <Text className="text-3xl font-bold text-foreground">ordio</Text>
          </View>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
