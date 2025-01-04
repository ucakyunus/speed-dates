import ChatList from "@/components/chat/chat-list";
import { Header } from "@/components/chat/header";
import { Tabs } from "@/components/chat/tabs";
import { _headerHeight, _tabsHeight } from "@/constants/chat";
import { faker } from "@faker-js/faker";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

faker.seed(10);

export default function StickyTabs() {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((ev) => {
    scrollY.value = ev.contentOffset.y;
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        style={[StyleSheet.absoluteFillObject]}
        contentContainerStyle={{
          padding: 20,
          paddingTop: _headerHeight + _tabsHeight + 20,
        }}
        // snapToOffsets={[_headerHeightShrink + _tabsHeightShrink]}
        // decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <ChatList />
      </Animated.ScrollView>

      <View style={{ position: "absolute" }}>
        <Header scrollY={scrollY} />
        <Tabs scrollY={scrollY} />
      </View>
    </View>
  );
}
