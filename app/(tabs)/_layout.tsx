import { TabBar } from "@/components/tab-bar";
import Colors from "@/constants/Colors";
import {
  clearMatchedItems,
  removeOnboardingState,
  removeUserData,
} from "@/lib/mmkvStorage";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs, usePathname } from "expo-router";
import { Alert, TouchableOpacity } from "react-native";

export default function TabLayout() {
  const pathname = usePathname();

  const handleLogout = () => {
    Alert.alert("Çıkış Yap", "Çıkış yapmak istediğinizden emin misiniz?", [
      {
        text: "İptal",
        style: "cancel",
      },
      {
        text: "Çıkış Yap",
        style: "destructive",
        onPress: () => {
          removeOnboardingState();
          removeUserData();
          clearMatchedItems();
          router.replace("/onboarding");
        },
      },
    ]);
  };

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} currentRoute={pathname} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Explore" }} />
      <Tabs.Screen
        name="matches"
        options={{ title: "Chats", headerShown: true }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLogout}
              style={{ marginRight: 15 }}
            >
              <Ionicons
                name="log-out-outline"
                size={24}
                color={Colors.dark.text}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
