/*
    Inspiration: https://dribbble.com/shots/5694244-Scroll-and-Selected-Tab
    VR Image: https://www.klipartz.com/en/sticker-png-lekuz
*/
import ChatList from "@/components/chat/chat-list";
import { Feather } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import { useNavigation } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

faker.seed(10);
const { width, height } = Dimensions.get("screen");

const colors = {
  header: "#1C1C1C",
  headerText: "#FF6347",
  tab: "#2A2A2A",
  tabText: "#FF6347",
  text: "#E0E0E0",
};

const _headerHeight = height * 0.4;
const _headerHeightShrink = _headerHeight / 2;
const _tabsHeight = height * 0.2;
const _tabsHeightShrink = _tabsHeight / 2;

const inputRange = [0, _headerHeightShrink + _tabsHeightShrink];
const Header = ({ scrollY }) => {
  const navigation = useNavigation();
  const stylez = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        inputRange,
        [_headerHeight, _headerHeightShrink],
        Extrapolation.CLAMP,
      ),
    };
  });
  const headerTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        inputRange,
        [1, 0],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            inputRange,
            [0, -_headerHeight],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          backgroundColor: colors.header,
          justifyContent: "center",
          // padding: 20,
        },
        stylez,
      ]}
    >
      <Animated.View style={headerTextStyle}>
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/035/819/192/large_2x/ai-generated-young-lady-in-bright-red-dress-on-the-background-of-a-picture-free-photo.jpg",
          }}
          style={{
            width: width,
            height: width,
            resizeMode: "cover",
            alignSelf: "center",
          }}
        />
      </Animated.View>
      <TouchableOpacity
        onPress={() => {
          // Assuming you have access to a navigation object
          navigation.goBack();
        }}
      >
        <View
          style={{
            height: _headerHeightShrink / 4,
            justifyContent: "center",
            position: "absolute",
            top: _headerHeightShrink / 2 - _headerHeightShrink / 8,
            width: 80,
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Add background
            borderRadius: 10, // Add rounded borders
            shadowColor: "#000", // Add shadow effects
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // For Android shadow
          }}
        >
          <Feather name="chevron-left" size={32} color="white" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const tabs = ["Messages", "Photos"];
const Tabs = ({ scrollY }) => {
  const stylez = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        inputRange,
        [_tabsHeight, _tabsHeightShrink],
        Extrapolation.CLAMP,
      ),
      margin: interpolate(
        scrollY.value,
        inputRange,
        [0, 20],
        Extrapolation.CLAMP,
      ),
      borderRadius: interpolate(
        scrollY.value,
        inputRange,
        [0, 20],
        Extrapolation.CLAMP,
      ),
      marginTop: interpolate(
        scrollY.value,
        inputRange,
        [0, -_tabsHeightShrink / 2],
        Extrapolation.CLAMP,
      ),
    };
  });
  const navTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(scrollY.value, inputRange, [
        colors.tabText,
        colors.headerText,
      ]),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            inputRange,
            [0, -_headerHeightShrink / 2],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateX: interpolate(
            scrollY.value,
            inputRange,
            [0, 10],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });
  const scrollStyles = useAnimatedStyle(() => {
    return {
      marginTop: interpolate(
        scrollY.value,
        inputRange,
        [30, 0],
        Extrapolation.CLAMP,
      ),
    };
  });
  return (
    <Animated.View
      style={[
        {
          backgroundColor: colors.tab,
          justifyContent: "center",
          paddingLeft: 50,
        },
        stylez,
      ]}
    >
      <Animated.Text
        style={[
          {
            color: colors.headerText,
            fontSize: 20,
            fontWeight: "700",
            position: "absolute",
            top: 30,
            left: 50,
          },
          navTextStyle,
        ]}
      >
        Mandy Flores, 24
      </Animated.Text>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[{ flexGrow: 0 }, scrollStyles]}
      >
        {tabs.map((tab, index) => (
          <View key={tab} style={{ marginRight: 40 }}>
            <Text
              style={{
                color: colors.tabText,
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              {tab}
            </Text>
            {index === 0 && (
              <View
                style={{
                  marginTop: 5,
                  height: 2,
                  backgroundColor: colors.tabText,
                  width: "50%",
                }}
              />
            )}
          </View>
        ))}
      </Animated.ScrollView>
    </Animated.View>
  );
};

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
