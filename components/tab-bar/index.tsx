import { useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet } from "react-native";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { TabBarButton } from "@/components/tab-bar/tab-bar-button";
import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";

type TabBarProps = BottomTabBarProps & {
  currentRoute?: string;
};

export const TabBar = ({
  state,
  descriptors,
  navigation,
  currentRoute,
}: TabBarProps) => {
  const [dimensions, setDimensions] = useState({
    height: 20,
    width: 100,
  });

  const [activeIndex, setActiveIndex] = useState(state.index);

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (event: LayoutChangeEvent) => {
    setDimensions({
      height: event.nativeEvent.layout.height,
      width: event.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tabPositionX.value }],
  }));

  useEffect(() => {
    if (currentRoute) {
      const index = state.routes.findIndex((route) =>
        currentRoute.includes(route.name),
      );
      if (index !== -1) {
        setActiveIndex(index);
        tabPositionX.value = withSpring(buttonWidth * index, {
          duration: 1500,
        });
      }
    }
  }, [currentRoute]);

  return (
    <View onLayout={onTabbarLayout} style={styles.tabBar}>
      <Animated.View
        style={[
          {
            position: "absolute",
            backgroundColor: Colors.dark.tint,
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 25,
          },
          animatedStyle,
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: string =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : typeof options.title === "string"
              ? options.title
              : route.name;

        const isFocused = activeIndex === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500,
          });

          setActiveIndex(index);

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={
              isFocused ? Colors.dark.background : Colors.dark.tabIconDefault
            }
            label={label}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 80,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: Colors.dark.text,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    borderCurve: "continuous",
  },
});
