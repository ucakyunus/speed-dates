import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const colors = {
  header: "#1C1C1C",
  headerText: "#FF6347",
  tab: "#2A2A2A",
  tabText: "#FF6347",
  text: "#E0E0E0",
};

export const _headerHeight = height * 0.4;
export const _headerHeightShrink = _headerHeight / 2;
export const _tabsHeight = height * 0.2;
export const _tabsHeightShrink = _tabsHeight / 2;
export const _width = width;

export const inputRange = [0, _headerHeightShrink + _tabsHeightShrink];

export const tabs = ["Messages", "Photos"];
