import { X } from "lucide-react-native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface PhotoDisplayComponentProps {
  photoUri: string;
  onCancel: () => void;
}

export const PhotoDisplayComponent: React.FC<PhotoDisplayComponentProps> = ({
  photoUri,
  onCancel,
}) => {
  return (
    <View className="w-full aspect-square rounded-2xl overflow-hidden relative">
      <Image
        source={{ uri: photoUri }}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />

      {/* Cancel button to retake photo */}
      <TouchableOpacity
        className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full items-center justify-center"
        onPress={onCancel}
      >
        <X size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
};
