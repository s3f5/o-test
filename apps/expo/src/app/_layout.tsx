import * as React from "react";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@react-navigation/native";
import i18n from "i18n.config";
import { I18nextProvider } from "react-i18next";

import { useColorScheme } from "~/lib/hooks/useColorScheme";
import { useNativeThemes } from "~/lib/hooks/useNativeThemes";
import GeistLight from "../../assets/fonts/Geist-Light.ttf";
import GeistMedium from "../../assets/fonts/Geist-Medium.ttf";
import GeistRegular from "../../assets/fonts/Geist-Regular.ttf";

export default function Root() {
  const hasMounted = React.useRef(false);
  const { isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { lightTheme, darkTheme } = useNativeThemes();

  useFonts({
    "Geist-Light": GeistLight,
    "Geist-Regular": GeistRegular,
    "Geist-Medium": GeistMedium,
  });

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) return null;

  return (
    <ThemeProvider value={isDarkColorScheme ? darkTheme : lightTheme}>
      <I18nextProvider i18n={i18n}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <Slot />
      </I18nextProvider>
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect = React.useLayoutEffect;
