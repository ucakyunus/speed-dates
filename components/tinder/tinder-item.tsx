import { PropsWithChildren } from "react";
import { Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
} from "react-native-reanimated";
import Toast from "react-native-toast-message";

import { tinderData } from "@/constants/tinder-data";
import { saveMatchedItem } from "@/lib/mmkvStorage";

const { width } = Dimensions.get("window");

// Constants
const _visibleItemsLength = 3;
const _itemSize = width * 0.6;
const _rotationDeg = 20;

const minVelocity = 500;
const minTranslateX = width / 4;

type TinderItemProps = PropsWithChildren<{
  activeIndex: SharedValue<number>;
  index: number;
  panEnabled: boolean;
  onMatch?: () => void;
}>;

export function TinderItem({
  activeIndex,
  index,
  panEnabled,
  children,
  onMatch,
}: TinderItemProps) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const handleMatch = () => {
    saveMatchedItem(tinderData[index]);
    Toast.show({
      type: "success",
      text1: "Yeni bir eşleşme!",
      text2: "Tebrikler! Yeni bir eşleşme yakaladınız.",
      position: "top",
      visibilityTime: 3000,
    });
    if (onMatch) {
      onMatch();
    }
  };

  const pan = Gesture.Pan()
    .enabled(panEnabled)
    .onChange((e) => {
      x.value += e.changeX;
      y.value += e.changeY;
    })
    .onEnd((e) => {
      if (
        Math.abs(e.velocityX) > minVelocity ||
        Math.abs(e.translationX) > minTranslateX
      ) {
        const isSwipedRight = e.velocityX > 0;
        x.value = withSpring(width * 2 * Math.sign(e.velocityX));
        y.value = withDecay({
          velocity: e.velocityY,
        });

        // If swiped right and item is matched, save to storage and show toast
        if (isSwipedRight && tinderData[index]?.matched) {
          runOnJS(handleMatch)();
        }

        activeIndex.value = withSpring(activeIndex.value + 1, {
          mass: 1,
          damping: 45,
          stiffness: 200,
          overshootClamping: false,
        });
      } else {
        // Come back to initial values
        x.value = withSpring(0);
        y.value = withSpring(0);
      }
    });

  const styles = useAnimatedStyle(() => {
    // [visible items + 1 (hidden), third (right), second(left), first(center)]
    const inputRange = [index - 3, index - 2, index - 1, index];
    return {
      position: "absolute",
      zIndex: panEnabled ? 10 : _visibleItemsLength - index,
      transform: [
        {
          rotate: `${interpolate(activeIndex.value, inputRange, [
            0,
            _rotationDeg,
            -_rotationDeg,
            0,
          ])}deg`,
        },
        {
          translateX:
            interpolate(activeIndex.value, inputRange, [
              0,
              _itemSize / 2,
              -_itemSize / 2,
              0,
            ]) + x.value,
        },
        {
          translateY: y.value,
        },
      ],
      opacity: interpolate(activeIndex.value, inputRange, [0, 0.8, 0.8, 1]),
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={styles}>{children}</Animated.View>
    </GestureDetector>
  );
}
