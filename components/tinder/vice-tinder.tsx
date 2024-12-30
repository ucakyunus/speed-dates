import { View } from "@/components/Themed";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useMemo, useState } from "react";
import { ViewStyle } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { TinderItem } from "@/components/tinder/tinder-item";
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from "react-native-reanimated";

// Constants
const _visibleItemsLength = 3;

// Types
type ViceTinderProps<T> = {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactNode;
  onEndReached?: () => void;
  onChange?: (index: number) => void;
  onMatch?: () => void;
  style?: ViewStyle;
  initialItem?: number;
};

export function ViceTinder<T>({
  data,
  onEndReached,
  renderItem,
  onChange,
  onMatch,
  style,
  initialItem = 0,
}: ViceTinderProps<T & { key: string }>) {
  const activeIndex = useSharedValue(initialItem);
  const [activeIndexState, setActiveIndexState] = useState(() => initialItem);

  useAnimatedReaction(
    () => {
      return Math.round(activeIndex.value);
    },
    (v) => {
      if (v + _visibleItemsLength > data.length - 1 && onEndReached) {
        runOnJS(onEndReached)();
      }
      if (onChange) {
        runOnJS(onChange)(v);
      }
      runOnJS(setActiveIndexState)(v);
    },
  );

  const visibleItems = useMemo(() => {
    return data.slice(
      activeIndexState,
      activeIndexState + _visibleItemsLength + 1,
    );
  }, [data, activeIndexState]);

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <GestureHandlerRootView style={{ flex: 1, marginBottom: tabBarHeight }}>
      <View style={style}>
        {visibleItems.map((item, index) => (
          <TinderItem
            key={item.key}
            activeIndex={activeIndex}
            index={index + activeIndexState}
            panEnabled={activeIndexState === index + activeIndexState}
            onMatch={onMatch}
          >
            {renderItem({ item, index: index + activeIndexState })}
          </TinderItem>
        ))}
      </View>
    </GestureHandlerRootView>
  );
}
