import { useState } from "react";
import * as React from "react";
import { Pressable, Text, View } from "react-native";
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
      <View className="flex-1 items-center justify-end pb-4">
        <LogoSvg />
      </View>

      <View className="mt-12 flex-1 gap-4">
        <Text className="text-center text-3xl text-foreground">
          {t("login.welcomeMsg", { username: "David" })} <HandMetal />
        </Text>
        <View className="flex items-center justify-center">
          <Text className="w-2/3 text-center text-lg text-foreground">
            {t("login.selectWorkspace")}
          </Text>
        </View>
        <Button>
          <Text className="text-md font-semibold text-primary-foreground">
            Sushi Ninja
          </Text>
        </Button>
        <Button>
          <Text className="text-md font-semibold text-primary-foreground">
            Best Burgers
          </Text>
        </Button>
        <Pressable onPress={() => setChecked(!checked)}>
          <View className="mt-4 flex w-full flex-row justify-between px-1">
            <Text className="text-lg text-foreground">
              {t("login.remember")}
            </Text>
            <Switch
              size="sm"
              checked={checked}
              onCheckedChange={() => setChecked(!checked)}
            />
          </View>
          <Text className="-mt-1 w-3/4 px-1 text-sm text-foreground">
            {t("login.rememberInfo")}
          </Text>
        </Pressable>
      </View>

      <View className="flex-[0.5] items-center justify-center py-4">
        <Text className="text-3xl font-bold text-foreground">ordio</Text>
      </View>
    </View>
  );
}
