import { MessageListItem } from "@/components/matches/message-list-item";
import { useState } from "react";
import { FlatList } from "react-native";

type Message = {
  key: string;
  name: string;
  images: string[];
  date: Date;
  message: string;
};

type MessageListProps = { data: Message[] };

export function MessageList({ data: initialData }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>(initialData);

  const handleDelete = (key: string) => {
    setMessages((prev) => prev.filter((message) => message.key !== key));
  };

  return (
    <FlatList
      data={initialData}
      style={{ marginTop: 15 }}
      renderItem={({ item }: { item: Message }) => {
        return (
          <MessageListItem
            item={item}
            onDelete={() => handleDelete(item.key)}
          />
        );
      }}
    />
  );
}
