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

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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
    // Check the current onboarding state at the start
    const currentState = getOnboardingState();
    setIsOnboarded(currentState ?? null);

    // Navigate based on the current onboarding state
    if (currentState === true) {
      router.replace("/"); // Replace with main tab route
    } else {
      router.replace("/onboarding"); // Replace with onboarding route
    }

    // Listen for changes/removals of the `speeddates-onboarding` key
    const listener = storage.addOnValueChangedListener((key: string) => {
      if (key === ONBOARDING_KEY) {
        const newState = getOnboardingState();

        if (newState !== isOnboarded) {
          setIsOnboarded(newState ?? null);
          if (newState === true) {
            router.replace("/"); // Navigate to main page
          } else {
            router.replace("/onboarding"); // Navigate to onboarding page
          }
        }
      }
    });

    // Cleanup listener when component unmounts
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
              name="modal"
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="chat-detail"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>

      <Toast visibilityTime={2000} position="top" topOffset={insets.top + 10} />
    </>
  );
}
