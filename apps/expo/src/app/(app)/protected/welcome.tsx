import { useState } from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { HandMetal } from "~/lib/icons/hand";
import { LogoSvg } from "~/lib/icons/logo";

export default function Index() {
  const [checked, setChecked] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <View className="flex-1 px-4">
      <View className="flex-1 items-center justify-end pb-12">
        <LogoSvg />
      </View>
      <View className="flex-1 gap-4 mt-12">
        <Text className="text-center text-3xl">
          {t("login.welcomeMsg", { username: "David" })} <HandMetal />
        </Text>
        <View className="flex items-center justify-center">
          <Text className="w-2/3 text-center text-lg">
            {t("login.selectWorkspace")}
          </Text>
        </View>
        <Button className="rounded-xl">
          <Text className="text-md font-semibold text-primary-foreground">
            Sushi Ninja
          </Text>
        </Button>
        <Button className="rounded-xl">
          <Text className="text-md font-semibold text-primary-foreground">
            Best Burgers
          </Text>
        </Button>
        <View className="mt-4 flex w-full flex-row justify-between">
          <Text className="text-lg">{t("login.remember")}</Text>
          <Switch
            checked={checked}
            onCheckedChange={() => setChecked(!checked)}
          />
        </View>
        <Text className="w-3/4 text-sm mt-0">{t("login.rememberInfo")}</Text>
      </View>
      <View className="flex-[0.5] items-center justify-center">
        <Text className="text-3xl font-bold">ordio</Text>
      </View>
    </View>
  );
}
