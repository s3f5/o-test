import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useUnstableNativeVariable } from "nativewind";
import { useTranslation } from "react-i18next";

import { TypeWriter } from "~/components/type-writer";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function Index() {
  const { t } = useTranslation();
  const router = useRouter();
  const white = useUnstableNativeVariable("--white") as unknown as string;
  const grey = useUnstableNativeVariable("--grey-950") as unknown as string;
  const orange = useUnstableNativeVariable("--orange-500") as unknown as string;
  const primary = useUnstableNativeVariable("--blue-600") as unknown as string;

  const card = useUnstableNativeVariable("--grey-950") as unknown as string;

  const [bg, setBgColor] = useState<string>(white);
  const [textColor, setTextColor] = useState<string>(primary);
  const [colorIndex, setColorIndex] = useState(0);

  const colorArray = [
    { bg: white, text: primary },
    { bg: primary, text: white },
    { bg: white, text: grey },
    { bg: card, text: orange },
  ];

  const handleBgChange = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colorArray.length);

    if (colorArray[colorIndex]) {
      setBgColor(colorArray[colorIndex].bg);
      setTextColor(colorArray[colorIndex].text);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <View className={cn(`flex-1 justify-between bg-[] p-4`)}>
        <View className="flex-1 items-center justify-center">
          <TypeWriter
            textArray={[
              t("login.animations.timePlanning"),
              t("login.animations.changeShift"),
              t("login.animations.replacementSearch"),
              t("login.animations.rethinkWork"),
            ]}
            loop={false}
            onTypeComplete={() => router.replace("/(app)/login")}
            speed={100}
            delay={400}
            cursorStyle={`${
              textColor === grey
                ? "bg-card-foreground"
                : textColor === white
                  ? "bg-primary-foreground"
                  : textColor === primary
                    ? "bg-primary"
                    : textColor === orange
                      ? "bg-warning-foreground"
                      : "bg-primary"
            }`}
            textStyle={cn(
              "text-3xl",
              textColor === grey
                ? "text-card"
                : textColor === white
                  ? "text-primary-foreground"
                  : textColor === primary
                    ? "text-primary"
                    : textColor === orange
                      ? "text-warning-foreground"
                      : "text-primary",
            )}
            onChangeString={handleBgChange}
          />
        </View>
        <View className="flex">
          <Link href="/login" replace asChild>
            <Button className="rounded-xl bg-[--grey-extra]">
              <Text className="text-primary-foreground">{t("login.login")}</Text>
            </Button>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
