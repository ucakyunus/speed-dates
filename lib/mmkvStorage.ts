import { MMKV } from "react-native-mmkv";

// Create a new MMKV storage instance
export const storage = new MMKV();

const ONBOARDING_KEY = "speeddates-onboarding";
const MATCHED_ITEMS_KEY = "speeddates-matched-items";

const setOnboardingState = (state: boolean) => {
  storage.set(ONBOARDING_KEY, state);
};

const getOnboardingState = () => {
  return storage.contains(ONBOARDING_KEY)
    ? storage.getBoolean(ONBOARDING_KEY)
    : null;
};

const removeOnboardingState = () => {
  storage.delete(ONBOARDING_KEY);
};

const saveMatchedItem = (item: any) => {
  const existingMatches = getMatchedItems();
  const newMatches = [...existingMatches, item];
  storage.set(MATCHED_ITEMS_KEY, JSON.stringify(newMatches));
};

const getMatchedItems = () => {
  if (!storage.contains(MATCHED_ITEMS_KEY)) {
    return [];
  }
  return JSON.parse(storage.getString(MATCHED_ITEMS_KEY) || "[]");
};

const clearMatchedItems = () => {
  storage.delete(MATCHED_ITEMS_KEY);
};

export function removeMatchedItem(id: string) {
  const items = getMatchedItems();
  const filteredItems = items.filter((item: { id: string; }) => item.id !== id);
  storage.set(MATCHED_ITEMS_KEY, JSON.stringify(filteredItems));
}

export {
  clearMatchedItems,
  getMatchedItems,
  getOnboardingState,
  MATCHED_ITEMS_KEY,
  ONBOARDING_KEY,
  removeOnboardingState,
  saveMatchedItem,
  setOnboardingState,
};
