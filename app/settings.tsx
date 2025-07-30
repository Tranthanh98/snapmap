import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import BottomSheet from "@/components/ui/BottomSheet";
import { getLanguegeLabel, languages } from "@/constants/languages";
import { AppearanceMode, useSettings } from "@/contexts/SettingsContext";
import i18n from "@/lib/i18n";
import { router } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Moon,
  Palette,
  Shield,
  Sun,
} from "lucide-react-native";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const {
    appearanceMode,
    setAppearanceMode,
    defaultPrivacyMode,
    setDefaultPrivacyMode,
    setPreferredLanguage,
  } = useSettings();

  const languageSheetRef = useRef<any>(null);
  const appearanceSheetRef = useRef<any>(null);
  const privacySheetRef = useRef<any>(null);

  const appearanceModes = [
    {
      label: t("settings.appearance.light"),
      value: "light" as AppearanceMode,
      icon: Sun,
    },
    {
      label: t("settings.appearance.dark"),
      value: "dark" as AppearanceMode,
      icon: Moon,
    },
    {
      label: t("settings.appearance.system"),
      value: "system" as AppearanceMode,
      icon: Palette,
    },
  ];

  const privacyModes = [
    {
      label: t("settings.privacy.friends"),
      value: "friends" as const,
      icon: Shield,
    },
    {
      label: t("settings.privacy.public"),
      value: "public" as const,
      icon: Globe,
    },
    {
      label: t("settings.privacy.private"),
      value: "private" as const,
      icon: Shield,
    },
  ];

  const changeLanguage = (language: string) => {
    setPreferredLanguage(language);
    languageSheetRef.current?.close();
  };

  const getAppearanceLabel = (mode: AppearanceMode) => {
    switch (mode) {
      case "light":
        return t("settings.appearance.light");
      case "dark":
        return t("settings.appearance.dark");
      case "system":
        return t("settings.appearance.system");
      default:
        return t("settings.appearance.system");
    }
  };

  const getPrivacyLabel = (privacy: string) => {
    switch (privacy) {
      case "friends":
        return t("settings.privacy.friends");
      case "public":
        return t("settings.privacy.public");
      case "private":
        return t("settings.privacy.private");
      default:
        return t("settings.privacy.friends");
    }
  };

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1 bg-background ">
        {/* Header */}
        <View className="flex-row items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)/profile")}
            className="mr-4 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronLeft
              size={24}
              className="text-primary-icon dark:text-primary-icon"
            />
          </TouchableOpacity>
          <ThemedText
            type="title"
            className="flex-1 text-center mr-8 text-primary-text dark:text-primary-text"
          >
            {t("settings.title")}
          </ThemedText>
        </View>

        <ScrollView className="flex-1">
          <View className="px-4 py-4">
            {/* Appearance Section */}
            <View className="mb-6">
              <ThemedText
                type="defaultSemiBold"
                className="text-lg mb-4 text-primary-text dark:text-primary-text"
              >
                {t("settings.appearance.title")}
              </ThemedText>

              <TouchableOpacity
                className="flex-row items-center py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                onPress={() => appearanceSheetRef.current?.open()}
              >
                <Palette
                  size={20}
                  className="text-primary-icon dark:text-primary-icon"
                />
                <ThemedText className="ml-4 flex-1 text-primary-text dark:text-primary-text">
                  {t("settings.appearance.theme")}
                </ThemedText>
                <ThemedText className="mx-2 text-primary-icon dark:text-primary-icon">
                  {getAppearanceLabel(appearanceMode)}
                </ThemedText>
                <ChevronRight
                  size={16}
                  className="text-gray-400 dark:text-gray-500"
                />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                onPress={() => languageSheetRef.current?.open()}
              >
                <Globe
                  size={20}
                  className="text-primary-icon dark:text-primary-icon"
                />
                <ThemedText className="ml-4 flex-1 text-primary-text dark:text-primary-text">
                  {t("settings.language.title")}
                </ThemedText>
                <ThemedText className="mx-2 text-primary-icon dark:text-primary-icon">
                  {getLanguegeLabel(i18n.language)}
                </ThemedText>
                <ChevronRight
                  size={16}
                  className="text-gray-400 dark:text-gray-500"
                />
              </TouchableOpacity>
            </View>

            {/* Privacy Section */}
            <View className="mb-6">
              <ThemedText
                type="defaultSemiBold"
                className="text-lg mb-4 text-primary-text dark:text-primary-text"
              >
                {t("settings.privacy.title")}
              </ThemedText>

              <TouchableOpacity
                className="flex-row items-center py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                onPress={() => privacySheetRef.current?.open()}
              >
                <Shield
                  size={20}
                  className="text-primary-icon dark:text-primary-icon"
                />
                <ThemedText className="ml-4 flex-1 text-primary-text dark:text-primary-text">
                  {t("settings.privacy.defaultPrivacy")}
                </ThemedText>
                <ThemedText className="mx-2 text-primary-icon dark:text-primary-icon">
                  {getPrivacyLabel(defaultPrivacyMode)}
                </ThemedText>
                <ChevronRight
                  size={16}
                  className="text-gray-400 dark:text-gray-500"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Language Selection Bottom Sheet */}
        <BottomSheet
          ref={languageSheetRef}
          height={300}
          onClose={() => languageSheetRef.current?.close()}
        >
          <View className="p-6">
            <ThemedText
              type="defaultSemiBold"
              className="text-xl mb-6 text-center text-white"
            >
              {t("settings.language.title")}
            </ThemedText>
            {languages.map((lang, index) => (
              <TouchableOpacity
                key={lang.value}
                className={`flex-row items-center py-4 rounded-lg px-2 hover:bg-gray-50 ${
                  index < languages.length - 1 ? "border-b border-gray-200" : ""
                }`}
                onPress={() => changeLanguage(lang.value)}
              >
                <ThemedText
                  className={`flex-1 text-base text-white ${
                    i18n.language === lang.value
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                >
                  {lang.label}
                </ThemedText>
                {i18n.language === lang.value && (
                  <View className="w-3 h-3 bg-primary rounded-full" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheet>

        {/* Appearance Mode Bottom Sheet */}
        <BottomSheet
          ref={appearanceSheetRef}
          height={350}
          onClose={() => appearanceSheetRef.current?.close()}
        >
          <View className="p-6 bg-background">
            <ThemedText
              type="defaultSemiBold"
              className="text-xl mb-6 text-center text-primary-text"
            >
              {t("settings.appearance.theme")}
            </ThemedText>
            {appearanceModes.map((mode, index) => (
              <TouchableOpacity
                key={mode.value}
                className={`flex-row items-center py-4 rounded-lg px-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                  index < appearanceModes.length - 1
                    ? "border-b border-gray-200 dark:border-gray-700"
                    : ""
                }`}
                onPress={() => {
                  setAppearanceMode(mode.value);
                  appearanceSheetRef.current?.close();
                }}
              >
                <mode.icon
                  size={20}
                  className="text-primary-icon dark:text-primary-icon"
                />
                <ThemedText
                  className={`ml-4 flex-1 text-base text-primary-text ${
                    appearanceMode === mode.value
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                >
                  {mode.label}
                </ThemedText>
                {appearanceMode === mode.value && (
                  <View className="w-3 h-3 bg-primary rounded-full" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheet>

        {/* Privacy Mode Bottom Sheet */}
        <BottomSheet
          ref={privacySheetRef}
          height={350}
          onClose={() => privacySheetRef.current?.close()}
        >
          <View className="p-6 bg-white dark:bg-gray-900">
            <ThemedText
              type="defaultSemiBold"
              className="text-xl mb-6 text-center"
            >
              {t("settings.privacy.defaultPrivacy")}
            </ThemedText>
            {privacyModes.map((privacy, index) => (
              <TouchableOpacity
                key={privacy.value}
                className={`flex-row items-center py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg px-2 ${
                  index < privacyModes.length - 1
                    ? "border-b border-gray-100 dark:border-gray-800"
                    : ""
                }`}
                onPress={() => {
                  setDefaultPrivacyMode(privacy.value);
                  privacySheetRef.current?.close();
                }}
              >
                <privacy.icon
                  size={20}
                  className="text-gray-600 dark:text-gray-400"
                />
                <ThemedText
                  className={`ml-4 flex-1 text-base ${
                    defaultPrivacyMode === privacy.value
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                >
                  {privacy.label}
                </ThemedText>
                {defaultPrivacyMode === privacy.value && (
                  <View className="w-3 h-3 bg-primary rounded-full" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheet>
      </SafeAreaView>
    </ThemedView>
  );
}
