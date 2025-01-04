import {
  _headerHeightShrink,
  _tabsHeight,
  _tabsHeightShrink,
  colors,
  inputRange,
  tabs,
} from "@/constants/chat";
import { Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export const Tabs = ({ scrollY }: { scrollY: SharedValue<number> }) => {
  const styles = useAnimatedStyle(() => {
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
        styles,
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
