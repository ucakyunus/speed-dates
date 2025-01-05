import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { messages } from "@/constants/messages";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

export const ChatList = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [currentDialog, setCurrentDialog] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [showResponses, setShowResponses] = useState(false);
  const scrollY = useSharedValue(0);
  const scrollViewRef = useRef<Animated.ScrollView>(null);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = withSpring(e.contentOffset.y);
  });

  const scrollToEnd = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const sendSystemMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text, isUser: false },
      ]);
      setIsTyping(false);
      setShowResponses(true);
      scrollToEnd();
    }, 1000);
  };

  const handleResponseSelect = (response: string, answer: string) => {
    setShowResponses(false);
    // Add user response
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: response, isUser: true },
    ]);
    scrollToEnd();

    // Show typing indicator and then system response
    setIsTyping(true);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: answer, isUser: false },
      ]);
      setIsTyping(false);
      setCurrentDialog((prev) => prev + 1);
      scrollToEnd();
    }, 1000);
  };

  useEffect(() => {
    const currentMessage = messages.find((m) => m.dialog === currentDialog);
    if (currentMessage) {
      sendSystemMessage(currentMessage.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDialog]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {chatMessages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessage : styles.systemMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                { color: message.isUser ? Colors.dark.text : Colors.dark.text },
              ]}
            >
              {message.text}
            </Text>
          </View>
        ))}
        {isTyping && (
          <View style={styles.typingContainer}>
            <ActivityIndicator color={Colors.dark.text} size="small" />
          </View>
        )}
      </Animated.ScrollView>

      {showResponses && (
        <View style={styles.responsesContainer}>
          <View style={styles.responsesInnerContainer}>
            {messages
              .find((m) => m.dialog === currentDialog)
              ?.responses.map((item) => (
                <Pressable
                  key={item.key}
                  style={({ pressed }) => [
                    styles.responseButton,
                    pressed && styles.responseButtonPressed,
                  ]}
                  onPress={() =>
                    handleResponseSelect(item.response, item.answer)
                  }
                >
                  <Text style={styles.responseText}>{item.response}</Text>
                </Pressable>
              ))}
          </View>
        </View>
      )}

      {!showResponses && currentDialog > messages.length && (
        <Pressable style={styles.fullWidthButton}>
          <Link href="/video-simulator" style={styles.buttonText}>
            Go to Video Simulator
          </Link>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 10,
    paddingBottom: 300,
  },
  messageContainer: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 16,
    maxWidth: width * 0.75,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0066FF",
  },
  systemMessage: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  typingContainer: {
    padding: 8,
    alignSelf: "flex-start",
    marginLeft: 12,
  },
  responsesContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    backgroundColor: "rgba(0,0,0,0.9)",
    backdropFilter: "blur(10px)",
  },
  responsesInnerContainer: {
    borderRadius: 16,
    overflow: "hidden",
    gap: 8,
  },
  responseButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    shadowColor: Colors.dark.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    transform: [{ scale: 1 }],
  },
  responseButtonPressed: {
    backgroundColor: "rgba(255,255,255,0.12)",
    transform: [{ scale: 0.98 }],
  },
  responseText: {
    fontSize: 15,
    color: Colors.dark.text,
    textAlign: "center",
    fontWeight: "500",
  },
  fullWidthButton: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: "#0066FF",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
