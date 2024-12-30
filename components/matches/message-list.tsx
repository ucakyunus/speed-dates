import { MessageListItem } from "@/components/matches/message-list-item";
import { FlatList } from "react-native";

type Message = {
  key: string;
  name: string;
  images: string[];
  date: Date;
  message: string;
};

type MessageListProps = { data: Message[] };

export function MessageList({ data }: MessageListProps) {
  return (
    <FlatList
      data={data}
      style={{ marginTop: 15 }}
      renderItem={({ item }: { item: Message }) => {
        return <MessageListItem item={item} />;
      }}
    />
  );
}
