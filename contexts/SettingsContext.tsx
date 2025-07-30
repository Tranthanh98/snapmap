import i18n from "@/lib/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

export type AppearanceMode = "light" | "dark" | "system";
export type CameraFacing = "front" | "back";
export type PrivacyMode = "friends" | "public" | "private";

interface SettingsContextType {
  // Appearance
  appearanceMode: AppearanceMode;
  setAppearanceMode: (mode: AppearanceMode) => void;

  // Camera Settings
  defaultCameraFacing: CameraFacing;
  setDefaultCameraFacing: (facing: CameraFacing) => void;

  // Privacy Settings
  defaultPrivacyMode: PrivacyMode;
  setDefaultPrivacyMode: (privacy: PrivacyMode) => void;

  // Language (already handled by i18n but we can store preference)
  preferredLanguage: string;
  setPreferredLanguage: (language: string) => void;

  // Computed values
  isDarkMode: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

const STORAGE_KEYS = {
  APPEARANCE_MODE: "@placeSnaps_appearanceMode",
  CAMERA_FACING: "@placeSnaps_cameraFacing",
  PRIVACY_MODE: "@placeSnaps_privacyMode",
  LANGUAGE: "@placeSnaps_language",
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const { setColorScheme } = useColorScheme();

  const [appearanceMode, setAppearanceMode] =
    useState<AppearanceMode>("system");
  const [defaultCameraFacing, setDefaultCameraFacing] =
    useState<CameraFacing>("back");
  const [defaultPrivacyMode, setDefaultPrivacyMode] =
    useState<PrivacyMode>("friends");
  const [preferredLanguage, setPreferredLanguage] = useState<string>("en");

  // Computed dark mode based on appearance setting
  const isDarkMode =
    appearanceMode === "system"
      ? systemColorScheme === "dark"
      : appearanceMode === "dark";

  // Listen for system color scheme changes when in system mode
  useEffect(() => {
    if (appearanceMode === "system") {
      setColorScheme(systemColorScheme === "dark" ? "dark" : "light");
    } else {
      setColorScheme(appearanceMode);
    }
  }, [appearanceMode, systemColorScheme]);

  // Load settings from storage on app start
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [savedAppearance, savedCamera, savedPrivacy, savedLanguage] =
          await Promise.all([
            AsyncStorage.getItem(STORAGE_KEYS.APPEARANCE_MODE),
            AsyncStorage.getItem(STORAGE_KEYS.CAMERA_FACING),
            AsyncStorage.getItem(STORAGE_KEYS.PRIVACY_MODE),
            AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE),
          ]);

        if (savedAppearance) {
          const mode = savedAppearance as AppearanceMode;
          setAppearanceMode(mode);
          // Update NativeWind's color scheme when loading from storage
          if (mode === "system") {
            setColorScheme("system");
          } else {
            setColorScheme(mode);
          }
        }
        if (savedCamera) setDefaultCameraFacing(savedCamera as CameraFacing);
        if (savedPrivacy) setDefaultPrivacyMode(savedPrivacy as PrivacyMode);
        if (savedLanguage) {
          setPreferredLanguage(savedLanguage);
          // Apply saved language to i18n
          await i18n.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    loadSettings();
  }, [setColorScheme]);

  const handleSetAppearanceMode = async (mode: AppearanceMode) => {
    setAppearanceMode(mode);

    // Update NativeWind's color scheme
    if (mode === "system") {
      setColorScheme("system");
    } else {
      setColorScheme(mode);
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEYS.APPEARANCE_MODE, mode);
    } catch (error) {
      console.error("Error saving appearance mode:", error);
    }
  };

  const handleSetDefaultCameraFacing = async (facing: CameraFacing) => {
    setDefaultCameraFacing(facing);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CAMERA_FACING, facing);
    } catch (error) {
      console.error("Error saving camera facing:", error);
    }
  };

  const handleSetDefaultPrivacyMode = async (privacy: PrivacyMode) => {
    setDefaultPrivacyMode(privacy);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PRIVACY_MODE, privacy);
    } catch (error) {
      console.error("Error saving privacy mode:", error);
    }
  };

  const handleSetPreferredLanguage = async (language: string) => {
    setPreferredLanguage(language);
    // Change i18n language immediately
    await i18n.changeLanguage(language);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

  const value: SettingsContextType = {
    appearanceMode,
    setAppearanceMode: handleSetAppearanceMode,
    defaultCameraFacing,
    setDefaultCameraFacing: handleSetDefaultCameraFacing,
    defaultPrivacyMode,
    setDefaultPrivacyMode: handleSetDefaultPrivacyMode,
    preferredLanguage,
    setPreferredLanguage: handleSetPreferredLanguage,
    isDarkMode,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
