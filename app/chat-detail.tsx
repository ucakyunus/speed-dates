import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Key, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ViewToken,
} from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Text, View } from "@/components/Themed";

export default function ChatDetailScreen() {
  const { width } = useWindowDimensions();
  const { images: imagesParam, name } = useLocalSearchParams<{
    images: string;
    name: string;
  }>();
  const images = JSON.parse(imagesParam);
  const imageHeight = useSharedValue(250);
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const imageStyle = useAnimatedStyle(() => {
    return {
      height: imageHeight.value,
    };
  });

  useEffect(() => {
    imageHeight.value = withSpring(250, {
      damping: 20,
      stiffness: 90,
    });
  }, []);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveImageIndex(viewableItems[0].index ?? 0);
      }
    },
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(300)}>
        <Animated.View style={[{ width }, imageStyle]}>
          <FlatList
            ref={flatListRef}
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
            renderItem={({ item: image }) => (
              <Image
                source={{ uri: image }}
                style={[{ width }, imageStyle]}
                resizeMode="cover"
              />
            )}
          />
          <View style={styles.pagination}>
            {images.map((_: any, index: Key | null | undefined) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeImageIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
          <TouchableOpacity
            style={[
              styles.closeButton,
              {
                top: 10,
                right: 10,
              },
            ]}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={18} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <Animated.View
        entering={FadeIn.delay(150).duration(300)}
        style={styles.content}
      >
        <Text style={styles.name}>{name}</Text>
        <View style={styles.chatContainer}>
          {/* Chat messages will go here */}
          <Text>Messages will appear here</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  closeButton: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  pagination: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignSelf: "center",
    gap: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 6,
    borderRadius: 12,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  paginationDotActive: {
    backgroundColor: "#fff",
    width: 18,
  },
});
