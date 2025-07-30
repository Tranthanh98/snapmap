import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, View } from "react-native";

export default function MapScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ThemedView className="flex-1">
        {/* Header */}
        <View className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <ThemedText type="title" className="text-center">
            {t("map.title")}
          </ThemedText>
        </View>

        {/* Map placeholder - will contain actual map implementation */}
        <View className="flex-1 items-center justify-center">
          <ThemedText className="text-gray-500 dark:text-gray-400 text-center">
            📍 {t("map.checkinsNearby")}
            {"\n"}
            {t("map.tapMarkers")}
          </ThemedText>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}
