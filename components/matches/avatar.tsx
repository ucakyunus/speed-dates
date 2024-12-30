import { forwardRef } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import Animated, { AnimatedStyle } from "react-native-reanimated";

type AvatarProps = {
  image: string;
  size: number;
  style?: AnimatedStyle<StyleProp<ViewStyle>>;
};

export const Avatar = forwardRef<any, AvatarProps>(
  ({ image, size, style }, ref) => {
    return (
      <Animated.View
        ref={ref}
        style={[
          {
            width: size,
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
          },
          style,
        ]}
      >
        <Animated.Image
          source={{ uri: image }}
          style={[
            StyleSheet.absoluteFillObject,
            {
              borderRadius: 100,
            },
          ]}
        />
      </Animated.View>
    );
  },
);

Avatar.displayName = "Avatar";
