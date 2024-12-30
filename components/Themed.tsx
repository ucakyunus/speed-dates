import Colors from "@/constants/Colors";
import { Text as DefaultText, View as DefaultView } from "react-native";

export type TextProps = DefaultText["props"];
export type ViewProps = DefaultView["props"];

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  return (
    <DefaultText style={[{ color: Colors.dark.text }, style]} {...otherProps} />
  );
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  return (
    <DefaultView
      style={[{ backgroundColor: Colors.dark.background }, style]}
      {...otherProps}
    />
  );
}
