import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";

import { MessageList } from "@/components/matches/message-list";
import { View } from "@/components/Themed";
import { getMatchedItems } from "@/lib/mmkvStorage";

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
      // clearMatchedItems();
      // Get matched items when screen comes into focus
      const items = getMatchedItems();
      setMatchedItems(items);
    }, []),
  );

  // Transform matched items to match TelegramStories data structure
  const transformedData = matchedItems.map((item) => ({
    key: item.id,
    name: item.name,
    images: item.images,
    date: new Date(),
    message: item.bio,
  }));

  return (
    <View style={styles.container}>
      <MessageList data={transformedData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
