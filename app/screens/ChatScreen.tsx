import { StyleSheet, Text, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

export default function ChatScreen() {
  const { userId } = useLocalSearchParams(); // Correct way to access route params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with User {userId}</Text>
      {/* Add your chat UI components here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6347",
  },
});
