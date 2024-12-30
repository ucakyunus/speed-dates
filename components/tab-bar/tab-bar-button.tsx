import { useEffect } from "react";
import { StyleSheet } from "react-native";

import { PlatformPressable } from "@react-navigation/elements";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { TAB_BAR_ICONS } from "@/constants/icons";

export const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  label,
  color,
  routeName,
}: {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  label: string;
  color: string;
  routeName: string;
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 },
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

    const top = interpolate(scale.value, [0, 1], [0, 9]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  return (
    <PlatformPressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {TAB_BAR_ICONS[routeName]({
          color,
        })}
      </Animated.View>
      <Animated.Text
        style={[
          {
            color,
            fontSize: 12,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </PlatformPressable>
  );
};

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
