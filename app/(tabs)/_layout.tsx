import { Tabs, usePathname } from "expo-router";

import { TabBar } from "@/components/tab-bar";

export default function TabLayout() {
  const pathname = usePathname();

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
        options={{ title: "Profile", headerShown: true }}
      />
    </Tabs>
  );
}
