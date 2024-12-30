import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

import { Avatar } from "@/components/matches/avatar";
import Colors from "@/constants/Colors";

type MessageListItemProps = {
  item: {
    name: string;
    images: string[];
    date: Date;
    message: string;
  };
};

export function MessageListItem({ item }: MessageListItemProps) {
  const { width } = useWindowDimensions();
  const router = useRouter();

  return (
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
          <Text style={{ color: Colors.dark.textSecondary }} numberOfLines={2}>
            {item.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
