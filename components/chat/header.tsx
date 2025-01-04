import {
  _headerHeight,
  _headerHeightShrink,
  _width,
  colors,
  inputRange,
} from "@/constants/chat";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export const Header = ({ scrollY }: { scrollY: SharedValue<number> }) => {
  const navigation = useNavigation();

  const styles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        inputRange,
        [_headerHeight, _headerHeightShrink],
        Extrapolation.CLAMP,
      ),
    };
  });
  const headerTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        inputRange,
        [1, 0],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            inputRange,
            [0, -_headerHeight],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          backgroundColor: colors.header,
          justifyContent: "center",
          // padding: 20,
        },
        styles,
      ]}
    >
      <Animated.View style={headerTextStyle}>
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/035/819/192/large_2x/ai-generated-young-lady-in-bright-red-dress-on-the-background-of-a-picture-free-photo.jpg",
          }}
          style={{
            width: _width,
            height: _width,
            resizeMode: "cover",
            alignSelf: "center",
          }}
        />
      </Animated.View>
      <TouchableOpacity
        onPress={() => {
          // Assuming you have access to a navigation object
          navigation.goBack();
        }}
      >
        <View
          style={{
            height: _headerHeightShrink / 4,
            justifyContent: "center",
            position: "absolute",
            top: _headerHeightShrink / 2 - _headerHeightShrink / 8,
            width: 80,
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Add background
            borderRadius: 10, // Add rounded borders
            shadowColor: "#000", // Add shadow effects
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // For Android shadow
          }}
        >
          <Feather name="chevron-left" size={32} color="white" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
