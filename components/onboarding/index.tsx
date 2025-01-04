import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { onboarding_bgs, onboarding_list } from "@/constants/onboarding";
import { setOnboardingState, setUserData } from "@/lib/mmkvStorage";

const { width, height } = Dimensions.get("screen");

export function Onboarding() {
  const [formData, setFormData] = React.useState({
    preference: "",
    name: "",
    zodiac: "",
    interests: [] as string[],
  });

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef<any>(null);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const validateAndComplete = () => {
    if (!formData.preference) {
      flatListRef.current?.scrollToIndex({ index: 0 });
      return;
    }
    if (!formData.name) {
      flatListRef.current?.scrollToIndex({ index: 1 });
      return;
    }
    if (!formData.zodiac) {
      flatListRef.current?.scrollToIndex({ index: 2 });
      return;
    }
    if (formData.interests.length === 0) {
      flatListRef.current?.scrollToIndex({ index: 3 });
      return;
    }

    setUserData({
      preference: formData.preference,
      name: formData.name,
      zodiac: formData.zodiac,
      interests: formData.interests,
    });

    setOnboardingState(true);
  };

  const renderInputSection = (item: any) => {
    switch (item.type) {
      case "preference":
        return (
          <Animated.View
            style={[
              styles.inputContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {item.options.map((option: any) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionButton,
                  formData.preference === option.id && styles.selectedOption,
                ]}
                onPress={() =>
                  setFormData({ ...formData, preference: option.id })
                }
              >
                <View style={styles.optionContent}>
                  <Ionicons
                    name={
                      option.id === "women"
                        ? "woman"
                        : option.id === "men"
                          ? "man"
                          : "people"
                    }
                    size={24}
                    color={formData.preference === option.id ? "#fff" : "#333"}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      formData.preference === option.id &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {option.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
        );

      case "name":
        return (
          <Animated.View
            style={[
              styles.inputContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TextInput
              style={styles.textInput}
              placeholder={item.placeholder}
              placeholderTextColor="rgba(255,255,255,0.8)"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </Animated.View>
        );

      case "zodiac":
        const getZodiacIcon = (
          zodiac: string,
        ): keyof typeof Ionicons.glyphMap => {
          const iconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
            Aries: "flame-outline",
            Taurus: "leaf-outline",
            Gemini: "people-outline",
            Cancer: "moon-outline",
            Leo: "sunny-outline",
            Virgo: "flower-outline",
            Libra: "scale-outline",
            Scorpio: "bug-outline",
            Sagittarius: "arrow-forward-circle-outline",
            Capricorn: "triangle-outline",
            Aquarius: "water-outline",
            Pisces: "fish-outline",
          };
          return iconMap[zodiac] || "star-outline";
        };

        return (
          <Animated.View
            style={[
              styles.inputContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.optionsGrid}>
              {item.options.map((zodiac: string) => (
                <TouchableOpacity
                  key={zodiac}
                  style={[
                    styles.zodiacOption,
                    formData.zodiac === zodiac && styles.selectedOption,
                  ]}
                  onPress={() => setFormData({ ...formData, zodiac })}
                >
                  <View style={styles.optionContent}>
                    <Ionicons
                      name={getZodiacIcon(zodiac)}
                      size={20}
                      color={formData.zodiac === zodiac ? "#fff" : "#333"}
                    />
                    <Text
                      style={[
                        styles.optionText,
                        formData.zodiac === zodiac && styles.selectedOptionText,
                      ]}
                    >
                      {zodiac}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        );

      case "interests":
        const getInterestIcon = (
          interest: string,
        ): keyof typeof Ionicons.glyphMap => {
          const iconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
            Music: "musical-notes",
            Sports: "basketball",
            Travel: "airplane",
            Art: "color-palette",
            "Movies/TV": "film",
            Books: "book",
            Food: "restaurant",
            Photography: "camera",
            Dance: "fitness",
            Yoga: "body",
            Nature: "leaf",
            Technology: "hardware-chip",
          };
          return iconMap[interest] || "heart";
        };

        return (
          <Animated.View
            style={[
              styles.inputContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.optionsGrid}>
              {item.options.map((interest: string) => (
                <TouchableOpacity
                  key={interest}
                  style={[
                    styles.interestOption,
                    formData.interests.includes(interest) &&
                      styles.selectedOption,
                  ]}
                  onPress={() => {
                    const interests = formData.interests.includes(interest)
                      ? formData.interests.filter((i) => i !== interest)
                      : [...formData.interests, interest];
                    setFormData({ ...formData, interests });
                  }}
                >
                  <View style={styles.optionContent}>
                    <Ionicons
                      name={getInterestIcon(interest)}
                      size={20}
                      color={
                        formData.interests.includes(interest) ? "#fff" : "#333"
                      }
                    />
                    <Text
                      style={[
                        styles.optionText,
                        formData.interests.includes(interest) &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {interest}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        );

      default:
        return null;
    }
  };

  const inputRange = onboarding_list.map((_, i) => i * width);
  const backgroundColor = scrollX.interpolate({
    inputRange,
    outputRange: onboarding_bgs,
  });

  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "-35deg", "35deg"],
  });
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  const isLastPage = currentIndex === onboarding_list.length - 1;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(newIndex);
      },
    },
  );

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor,
          },
        ]}
      />

      <TouchableOpacity onPress={validateAndComplete} style={styles.skipButton}>
        <Text style={styles.skipButtonText}>Skip Ad</Text>
        <Ionicons
          name="play-skip-forward-outline"
          size={18}
          color="#666"
          style={{ marginLeft: 4 }}
        />
      </TouchableOpacity>

      <Animated.View
        style={{
          width: height * 0.65,
          height: height * 0.65,
          borderRadius: 96,
          backgroundColor: "rgba(255,255,255,0.9)",
          position: "absolute",
          top: -height * 0.2,
          left: -height * 0.1,
          transform: [
            {
              translateX,
            },
            {
              rotate,
            },
          ],
        }}
      />

      <Animated.FlatList
        ref={flatListRef}
        data={onboarding_list}
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}
        style={{ paddingBottom: height * 0.03 }}
        onScroll={handleScroll}
        keyExtractor={(item) => item.key}
        pagingEnabled
        horizontal
        renderItem={({ item, index }) => {
          return (
            <View style={{ width, height: "100%" }}>
              <View style={styles.headerContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.headerImage}
                />
                <Text
                  style={styles.title}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                >
                  {item.title}
                </Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <View style={styles.optionsContainer}>
                {renderInputSection(item)}
                {isLastPage && (
                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={validateAndComplete}
                  >
                    <Text style={styles.completeButtonText}>Complete</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />

      <View style={styles.pagination}>
        {onboarding_list.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i}
              style={[
                styles.paginationDot,
                {
                  opacity,
                  transform: [{ scale }],
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  headerImage: {
    width: width / 2.5,
    height: width / 2.5,
    resizeMode: "contain",
  },
  optionsContainer: {
    flex: 0.6,
    justifyContent: "flex-end",
    paddingBottom: 80,
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipButtonText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    color: "#333",
    fontWeight: "900",
    fontSize: 32,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: "center",
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    color: "#666",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  inputContainer: {
    marginHorizontal: 20,
  },
  textInput: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 12,
    padding: 15,
    color: "#333",
    fontSize: 18,
    fontWeight: "500",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionButton: {
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 18,
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedOption: {
    backgroundColor: "#333",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  optionIcon: {
    marginBottom: 4,
  },
  optionText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },
  selectedOptionText: {
    color: "#fff",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  zodiacOption: {
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 10,
    borderRadius: 12,
    marginVertical: 4,
    width: "31%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  interestOption: {
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 10,
    borderRadius: 12,
    marginVertical: 4,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pagination: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    margin: 6,
    backgroundColor: "#333",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  completeButton: {
    backgroundColor: "#333",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
