import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {};

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  return <View className="bg-background" style={style} {...otherProps} />;
}
