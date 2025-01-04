import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { getUserData, setUserData, type UserData } from "@/lib/mmkvStorage";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const [userData, setUserDataState] = useState<UserData | null>(null);

  useFocusEffect(
    useCallback(() => {
      const data = getUserData();
      if (data) {
        setUserDataState(data);
      }
    }, []),
  );

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (userData) {
        const updatedUserData = {
          ...userData,
          profileImage: result.assets[0].uri,
        };
        setUserData(updatedUserData);
        setUserDataState(updatedUserData);
      }
    }
  };

  const getPreferenceIcon = (preference: string) => {
    switch (preference) {
      case "women":
        return "woman";
      case "men":
        return "man";
      default:
        return "people";
    }
  };

  const getZodiacIcon = (zodiac: string) => {
    switch (zodiac) {
      case "Aries":
        return "flame-outline" as const;
      case "Taurus":
        return "leaf-outline" as const;
      case "Gemini":
        return "people-outline" as const;
      case "Cancer":
        return "moon-outline" as const;
      case "Leo":
        return "sunny-outline" as const;
      case "Virgo":
        return "flower-outline" as const;
      case "Libra":
        return "scale-outline" as const;
      case "Scorpio":
        return "bug-outline" as const;
      case "Sagittarius":
        return "arrow-forward-circle-outline" as const;
      case "Capricorn":
        return "triangle-outline" as const;
      case "Aquarius":
        return "water-outline" as const;
      case "Pisces":
        return "fish-outline" as const;
      default:
        return "star-outline" as const;
    }
  };

  const getInterestIcon = (interest: string) => {
    switch (interest) {
      case "Music":
        return "musical-notes" as const;
      case "Sports":
        return "basketball" as const;
      case "Travel":
        return "airplane" as const;
      case "Art":
        return "color-palette" as const;
      case "Movies/TV":
        return "film" as const;
      case "Books":
        return "book" as const;
      case "Food":
        return "restaurant" as const;
      case "Photography":
        return "camera" as const;
      case "Dance":
        return "fitness" as const;
      case "Yoga":
        return "body" as const;
      case "Nature":
        return "leaf" as const;
      case "Technology":
        return "hardware-chip" as const;
      default:
        return "heart" as const;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImageBackground}>
          <View style={styles.profileImage}>
            {userData?.profileImage ? (
              <Image
                source={{ uri: userData.profileImage }}
                style={styles.profileImageStyle}
              />
            ) : (
              <Ionicons
                name="person-outline"
                size={44}
                color={Colors.dark.text}
              />
            )}
          </View>
          <TouchableOpacity onPress={pickImage} style={styles.editButton}>
            <View style={styles.editButtonBackground}>
              <Ionicons name="pencil" size={16} color={Colors.dark.text} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.name}>{userData?.name || "No Name"}</Text>

      <View style={styles.sectionsContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Looking For</Text>
          {userData?.preference && (
            <View style={styles.badge}>
              <Ionicons
                name={getPreferenceIcon(userData.preference)}
                size={18}
                color={Colors.dark.text}
              />
              <Text style={styles.badgeText}>
                {userData.preference === "women"
                  ? "Women"
                  : userData.preference === "men"
                    ? "Men"
                    : "Both"}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Zodiac Sign</Text>
          {userData?.zodiac && (
            <View style={styles.badge}>
              <Ionicons
                name={getZodiacIcon(userData.zodiac)}
                size={18}
                color={Colors.dark.text}
              />
              <Text style={styles.badgeText}>{userData.zodiac}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.badgeContainer}>
            {userData?.interests.map((interest, index) => (
              <View key={index} style={styles.badge}>
                <Ionicons
                  name={getInterestIcon(interest)}
                  size={18}
                  color={Colors.dark.text}
                />
                <Text style={styles.badgeText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.dark.background,
  },
  profileImageContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  profileImageBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.dark.border,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.dark.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: Colors.dark.background,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    color: Colors.dark.text,
  },
  sectionsContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 32,
    gap: 32,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark.textSecondary,
    marginBottom: 4,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: "500",
  },
  profileImageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  editButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  editButtonBackground: {
    backgroundColor: Colors.dark.background,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.dark.textTertiary,
  },
});
