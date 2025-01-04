import { useEffect } from "react";

import { useNavigation, useRouter } from "expo-router";

import { Onboarding } from "@/components/onboarding";
import { getOnboardingState } from "@/lib/mmkvStorage";

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const onboardingCompleted = getOnboardingState();
    if (onboardingCompleted) {
      router.push("/(tabs)");
    }
  }, [router]);

  return <Onboarding />;
}
