import { Image as ExpoImage } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { View } from "@/components/Themed";
import { ViceTinder } from "@/components/tinder/vice-tinder";
import { tinderData } from "@/constants/tinder-data";

export function TinderList() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={StyleSheet.absoluteFill}
        key={`image-${currentIndex}`}
        exiting={FadeOut}
        entering={FadeIn}
      >
        <ExpoImage
          style={{ flex: 1, opacity: 0.4 }}
          source={{ uri: tinderData[currentIndex]?.image }}
          blurRadius={70}
        />
      </Animated.View>
      <ViceTinder
        data={tinderData}
        style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        onEndReached={() => {
          console.log("Fetching more data");
        }}
        onChange={(index) => {
          setCurrentIndex(index);
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: 200,
              aspectRatio: 1 / 1.66,
              // Shadow
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 9,
              },
              shadowOpacity: 0.3,
              shadowRadius: 12.35,
              elevation: 19,
            }}
          >
            <ExpoImage
              source={{
                uri: item.image,
              }}
              style={{
                flex: 1,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: "rgba(0,0,0,0.1)",
              }}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
