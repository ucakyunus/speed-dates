import { useEffect, useState } from "react";

import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { getOnboardingState, ONBOARDING_KEY, storage } from "@/lib/mmkvStorage";
import Toast from "react-native-toast-message";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const currentState = getOnboardingState();
    setIsOnboarded(currentState ?? null);

    if (currentState === true) {
      router.replace("/");
    } else {
      router.replace("/onboarding");
    }

    const listener = storage.addOnValueChangedListener((key: string) => {
      if (key === ONBOARDING_KEY) {
        const newState = getOnboardingState();

        if (newState !== isOnboarded) {
          setIsOnboarded(newState ?? null);
          if (newState === true) {
            router.replace("/");
          } else {
            router.replace("/onboarding");
          }
        }
      }
    });

    return () => {
      listener.remove();
    };
  }, [isOnboarded, router]);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={DarkTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="chat-detail"
              options={{
                presentation: "modal",
                headerShown: false,
                animation: "slide_from_bottom",
              }}
            />
            <Stack.Screen
              name="video-simulator"
              options={{
                presentation: "fullScreenModal",
                headerShown: false,
                animation: "slide_from_bottom",
              }}
            />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>

      <Toast visibilityTime={2000} position="top" topOffset={insets.top + 10} />
    </>
  );
}
