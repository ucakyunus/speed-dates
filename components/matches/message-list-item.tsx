import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import SwipeableItem, { UnderlayParams } from "react-native-swipeable-item";
import Toast from "react-native-toast-message";

import { Avatar } from "@/components/matches/avatar";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";

type MessageListItemProps = {
  item: {
    id: string;
    name: string;
    images: string[];
    date: Date;
    message: string;
  };
  onDelete: (id: string) => void;
};

export function MessageListItem({ item, onDelete }: MessageListItemProps) {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const handleDelete = () => {
    // add item to deleted items
    onDelete(item.id);

    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Message deleted successfully",
    });
  };

  const renderUnderlayLeft = ({ percentOpen }: UnderlayParams<typeof item>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const animStyle = useAnimatedStyle(
      () => ({
        opacity: percentOpen.value,
      }),
      [percentOpen],
    );

    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            right: 0,
            top: 10,
            bottom: 10,
            width: 80,
            backgroundColor: "#FF0000",
            justifyContent: "center",
            alignItems: "center",
          },
          animStyle,
        ]}
      >
        <TouchableOpacity onPress={handleDelete}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SwipeableItem
      key={item.id}
      item={item}
      renderUnderlayLeft={renderUnderlayLeft}
      snapPointsLeft={[80]}
    >
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/chat-detail",
            params: {
              images: JSON.stringify(item.images),
              name: item.name,
            },
          });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            width,
            marginVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <Avatar image={item?.images[0]} size={60} />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Colors.dark.border,
              flex: 1,
              paddingBottom: 10,
              gap: 4,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "700", color: Colors.dark.text }}>
                {item.name}
              </Text>
              <Text style={{ color: Colors.dark.textTertiary }}>
                {item.date.toDateString()}
              </Text>
            </View>
            <Text
              style={{ color: Colors.dark.textSecondary }}
              numberOfLines={2}
            >
              {item.message}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </SwipeableItem>
  );
}
