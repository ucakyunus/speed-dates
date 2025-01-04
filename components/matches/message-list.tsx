import { MessageListItem } from "@/components/matches/message-list-item";
import { FlatList } from "react-native";

type Message = {
  id: string;
  name: string;
  images: string[];
  date: Date;
  message: string;
};

type MessageListProps = {
  data: Message[];
  onDelete: (id: string) => void;
};

export function MessageList({ data, onDelete }: MessageListProps) {
  return (
    <FlatList
      data={data}
      style={{ marginTop: 15 }}
      renderItem={({ item, index }: { item: Message; index: number }) => {
        return (
          <MessageListItem
            key={`${item.id}-${index}`}
            item={item}
            onDelete={onDelete}
          />
        );
      }}
    />
  );
}
