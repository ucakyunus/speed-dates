import { View } from "@/components/Themed";
import { forwardRef } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import Animated, { AnimatedStyle } from "react-native-reanimated";

type AvatarProps = {
  image: string;
  size: number;
  bg: string;
  hasStories?: boolean;
  style?: AnimatedStyle<StyleProp<ViewStyle>>;
};

export const Avatar = forwardRef<any, AvatarProps>(
  ({ bg, image, size, hasStories, style }, ref) => {
    const borderSize = 2;

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
        {hasStories && (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: "white",
                borderRadius: 100,
                borderWidth: borderSize,
                borderColor: bg,
              },
            ]}
          />
        )}
        <Animated.Image
          source={{ uri: image }}
          style={[
            StyleSheet.absoluteFillObject,
            {
              top: borderSize * 2,
              left: borderSize * 2,
              bottom: borderSize * 2,
              right: borderSize * 2,
              borderRadius: 100,
            },
          ]}
        />
      </Animated.View>
    );
  },
);

Avatar.displayName = "Avatar";
