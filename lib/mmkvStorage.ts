import { MMKV } from "react-native-mmkv";

// Create a new MMKV storage instance
export const storage = new MMKV();

export const ONBOARDING_KEY = "onboarding_completed";
export const USER_DATA_KEY = "user_data";
export const MATCHED_ITEMS_KEY = "speeddates-matched-items";

export const setOnboardingState = (value: boolean) => {
  storage.set(ONBOARDING_KEY, value);
};

export const getOnboardingState = () => {
  return storage.getBoolean(ONBOARDING_KEY) || false;
};

export const removeOnboardingState = () => {
  storage.delete(ONBOARDING_KEY);
};

export type UserData = {
  name: string;
  preference: string;
  zodiac: string;
  interests: string[];
  profileImage?: string;
};

export const setUserData = (data: UserData) => {
  storage.set(USER_DATA_KEY, JSON.stringify(data));
};

export const getUserData = (): UserData | null => {
  const data = storage.getString(USER_DATA_KEY);
  return data ? JSON.parse(data) : null;
};

export const removeUserData = () => {
  storage.delete(USER_DATA_KEY);
};

export const saveMatchedItem = (item: any) => {
  const existingMatches = getMatchedItems();
  const newMatches = [...existingMatches, item];
  storage.set(MATCHED_ITEMS_KEY, JSON.stringify(newMatches));
};

export const getMatchedItems = () => {
  if (!storage.contains(MATCHED_ITEMS_KEY)) {
    return [];
  }
  return JSON.parse(storage.getString(MATCHED_ITEMS_KEY) || "[]");
};

export const clearMatchedItems = () => {
  storage.delete(MATCHED_ITEMS_KEY);
};

export function removeMatchedItem(id: string) {
  const items = getMatchedItems();
  const filteredItems = items.filter((item: { id: string }) => item.id !== id);
  storage.set(MATCHED_ITEMS_KEY, JSON.stringify(filteredItems));
}
