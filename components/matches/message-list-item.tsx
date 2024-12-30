import { Text, View } from "@/components/Themed";
import { useWindowDimensions } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

import { Avatar } from "@/components/matches/avatar";

type MessageListItemProps = {
  item: {
    name: string;
    avatar: string;
    hasStories: boolean;
    bg: string;
    date: Date;
    message: string;
  };
};

export function MessageListItem({ item }: MessageListItemProps) {
  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={() => {
        alert(`Pressed on ${item.name}`);
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
        <Avatar
          image={item.avatar}
          size={60}
          hasStories={item.hasStories}
          bg={item.bg}
        />
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0,0,0,0.1)",
            flex: 1,
            paddingBottom: 10,
            gap: 4,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "700" }}>{item.name}</Text>
            <Text style={{ opacity: 0.5 }}>{item.date.toDateString()}</Text>
          </View>
          <Text style={{ opacity: 0.4 }} numberOfLines={2}>
            {item.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
