import { Image as ExpoImage } from "expo-image";
// import LottieView from "lottie-react-native";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { View } from "@/components/Themed";
import { ViceTinder } from "@/components/tinder/vice-tinder";
import { tinderData } from "@/constants/tinder-data";

export function TinderList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const confettiRef = useRef<LottieView>(null);

  const handleMatch = () => {
    // confettiRef.current?.play();
    console.log("match");
  };

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
          source={{ uri: tinderData[currentIndex]?.images[0] }}
          blurRadius={70}
        />
      </Animated.View>

      {/* <LottieView
        ref={confettiRef}
        source={require("@/assets/lottie/confetti2.json")}
        style={StyleSheet.absoluteFill}
        autoPlay={false}
        loop={false}
      /> */}

      <ViceTinder
        data={tinderData}
        style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        onChange={(index) => {
          setCurrentIndex(index);
        }}
        onMatch={handleMatch}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: 200,
              aspectRatio: 1 / 1.66,
              overflow: "hidden",
              borderRadius: 12,
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
                uri: item.images[0],
              }}
              style={{
                flex: 1,
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
