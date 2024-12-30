import { MessageListItem } from "@/components/matches/message-list-item";
import { telegramData } from "@/constants/telegram-data";
import { FlatList } from "react-native";

type MessageListProps = { data: typeof telegramData };

export function MessageList({ data }: MessageListProps) {
  return (
    <FlatList
      data={data}
      style={{ marginTop: 15 }}
      renderItem={({ item }: { item: (typeof telegramData)[number] }) => {
        return <MessageListItem item={item} />;
      }}
    />
  );
}
