import { Check, X } from "lucide-react-native";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface PhotoDescriptionInputProps {
  description: string;
  onDescriptionChange: (description: string) => void;
  isLoading?: boolean;
}

export const PhotoDescriptionInput: React.FC<PhotoDescriptionInputProps> = ({
  description,
  onDescriptionChange,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    inputRef.current?.blur();
  };

  const handleClear = () => {
    onDescriptionChange("");
    inputRef.current?.focus();
  };

  return (
    <View className="relative rounded-full">
      <TextInput
        ref={inputRef}
        className="bg-white/10 text-white pl-4 py-3 h-12 rounded-full pr-20"
        placeholder={t("snap.photoDescription.placeholder")}
        placeholderTextColor="#9CA3AF"
        value={description}
        onChangeText={onDescriptionChange}
        multiline={false}
        maxLength={120}
        editable={!isLoading}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
        blurOnSubmit={true}
      />

      {/* Action buttons */}
      <View className="absolute right-2 top-1/2 -translate-y-1/2 flex-row gap-1">
        {description.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            className="w-8 h-8 bg-white/20 rounded-full items-center justify-center"
          >
            <X size={14} color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleSubmit}
          className="w-8 h-8 bg-primary/80 rounded-full items-center justify-center"
        >
          <Check size={14} color="white" />
        </TouchableOpacity>
      </View>

      {/* Character count */}
      <Text className="absolute -bottom-5 right-2 text-white/60 text-xs">
        {description.length}/120
      </Text>
    </View>
  );
};
