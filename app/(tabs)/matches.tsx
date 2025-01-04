import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";

import { MessageList } from "@/components/matches/message-list";
import { View } from "@/components/Themed";
import { getMatchedItems, removeMatchedItem } from "@/lib/mmkvStorage";

type MatchedItem = {
  id: string;
  name: string;
  age: number;
  bio: string;
  distance: number;
  images: string[];
  matched: boolean;
};

export default function MatchesScreen() {
  const [matchedItems, setMatchedItems] = useState<MatchedItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      const items = getMatchedItems();
      setMatchedItems(items);
    }, []),
  );

  const transformedData = matchedItems.map((item) => ({
    id: item.id,
    name: item.name,
    images: item.images,
    date: new Date(),
    message: item.bio,
  }));

  const handleDelete = (id: string) => {
    setMatchedItems((prev) => prev.filter((message) => message.id !== id));
    removeMatchedItem(id);
  };

  return (
    <View style={styles.container}>
      <MessageList data={transformedData} onDelete={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
