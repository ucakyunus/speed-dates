import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

export const TAB_BAR_ICONS: Record<
  string,
  (props: { color: string }) => React.ReactNode
> = {
  index: (props) => <Feather name="home" size={24} {...props} />,
  matches: (props) => <Ionicons name="people-sharp" size={26} {...props} />,
  profile: (props) => <AntDesign name="user" size={26} {...props} />,
};
