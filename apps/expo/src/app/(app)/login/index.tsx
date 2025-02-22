import * as React from "react";
import { useState } from "react";
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
import { AnimatedErrorMessage } from "~/components/ui/form/animated-error-msg";
import { Input } from "~/components/ui/input";
import { EyeClosed } from "~/lib/icons/eye-closed";
import { Eye } from "~/lib/icons/eye-open";
import { LogoSvg } from "~/lib/icons/logo";

const formSchema = z.object({
  emailOrPhone: z.string().refine(
    (value) => {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      const isPhoneNumber =
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
          value,
        );

      return isEmail || isPhoneNumber;
    },
    {
      message: "true",
    },
  ),
  password: z.string().min(8, { message: "true" }),
});

type FormData = z.infer<typeof formSchema>;

export default function Index() {
  const router = useRouter();
  const { t } = useTranslation();
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      emailOrPhone: "",
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
    // some signIn logic
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
          <View className="mt-12 flex-1 gap-2">
            <Controller
              control={control}
              name="emailOrPhone"
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
            <AnimatedErrorMessage
              message={t("login.mailErrorMsg")}
              show={!!errors.emailOrPhone}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View className="relative">
                  <Input
                    placeholder={t("login.passwordPlaceholder")}
                    secureTextEntry={hidePassword}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    onChangeText={onChange}
                    value={value}
                  />
                  {hidePassword ? (
                    <EyeClosed
                      className="absolute right-2 top-3"
                      onPress={() => setHidePassword(!hidePassword)}
                    />
                  ) : (
                    <Eye
                      className="absolute right-2 top-3"
                      onPress={() => setHidePassword(!hidePassword)}
                    />
                  )}
                </View>
              )}
            />
            <AnimatedErrorMessage
              message={t("login.passwordErrorMsg")}
              show={!!errors.password}
            />
            <Button onPress={handleSubmit(handleSignIn)} disabled={!isValid}>
              <Text className="text-md font-semibold text-primary-foreground">
                {t("global.continue")}
              </Text>
            </Button>

            <Link href="/" className="text-center text-sm text-foreground">
              {t("login.forgotPW")}
            </Link>
          </View>
          <View className="flex-[0.5] items-center justify-center py-4">
            <Text className="text-3xl font-bold text-foreground">ordio</Text>
          </View>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
