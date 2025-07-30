import { Camera, Send } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Pressable, View } from "react-native";

interface CaptureButtonProps {
  mode: "capture" | "send";
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const CaptureButton: React.FC<CaptureButtonProps> = ({
  mode,
  onPress,
  disabled = false,
  isLoading = false,
}) => {
  const borderColor = mode === "capture" ? "bg-primary" : "bg-white";
  const iconColor = mode === "capture" ? "black" : "white";
  const backgroundColor = mode === "capture" ? "bg-white" : "bg-primary";

  return (
    <View
      className={`w-[80px] h-[80px] items-center justify-center ${borderColor} rounded-full`}
    >
      <View className="w-[72px] h-[72px] rounded-full bg-black items-center justify-center">
        <Pressable
          className={`w-[64px] h-[64px] rounded-full items-center justify-center ${backgroundColor}`}
          onPress={onPress}
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={iconColor} />
          ) : mode === "capture" ? (
            <Camera size={24} color={iconColor} />
          ) : (
            <Send size={24} color={iconColor} />
          )}
        </Pressable>
      </View>
    </View>
  );
};
