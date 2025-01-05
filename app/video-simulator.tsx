import { Text, View } from "@/components/Themed";
import { videosCategories } from "@/constants/videos";
import { useEvent } from "expo";
import { BlurView } from "expo-blur";
import { useNavigation } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

const videoSources = {
  1: require("../assets/videos/1.mp4"),
  2: require("../assets/videos/2.mp4"),
  3: require("../assets/videos/3.mp4"),
};

export default function VideoSimulatorScreen() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [showSentences, setShowSentences] = useState(false);

  const navigation = useNavigation();

  const player = useVideoPlayer(
    videoSources[currentVideoIndex as keyof typeof videoSources],
    (player) => {
      player.loop = false;
      player.play();
    },
  );

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const { status } = useEvent(player, "statusChange", {
    status: player.status,
  });

  useEffect(() => {
    if (status === "readyToPlay" && !isPlaying && player.currentTime > 0) {
      setShowSentences(true);
    }
  }, [status, isPlaying, player.currentTime]);

  const handleOptionSelect = () => {
    setShowSentences(false);
    if (currentVideoIndex < 3) {
      setCurrentVideoIndex((prev) => prev + 1);
      player.replace(
        videoSources[(currentVideoIndex + 1) as keyof typeof videoSources],
      );
      player.play();
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "(tabs)" as never }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.video} contentFit="cover" />

      {showSentences && (
        <BlurView intensity={20} style={styles.blurContainer}>
          <View style={styles.sentencesContainer}>
            {videosCategories.map((category, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.sentenceButton,
                  pressed && styles.sentenceButtonPressed,
                ]}
                onPress={handleOptionSelect}
              >
                <Text style={styles.sentenceText}>{category.sentences[0]}</Text>
              </Pressable>
            ))}
          </View>
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  video: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sentencesContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    gap: 12,
    backgroundColor: "transparent",
  },
  sentenceButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  sentenceButtonPressed: {
    backgroundColor: "rgba(255,255,255,0.12)",
    transform: [{ scale: 0.98 }],
  },
  sentenceText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
