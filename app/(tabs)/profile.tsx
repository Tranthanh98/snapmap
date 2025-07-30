import { ThemedText } from "@/components/ThemedText";
import BottomSheet from "@/components/ui/BottomSheet";
import TextInputUI from "@/components/ui/TextInputUI";
import { router } from "expo-router";
import {
  ChevronRight,
  Edit3,
  LogOut,
  Settings,
  Share,
  User,
  Users,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { t } = useTranslation();
  const editProfileSheetRef = useRef<any>(null);

  // Profile data state
  const [profileData, setProfileData] = useState({
    name: "Your Name",
    username: "@username",
    email: "your.email@example.com",
  });

  const [editingData, setEditingData] = useState({
    name: "",
    username: "",
    email: "",
  });

  const openEditProfile = () => {
    setEditingData({
      name: profileData.name,
      username: profileData.username.replace("@", ""),
      email: profileData.email,
    });
    editProfileSheetRef.current?.open();
  };

  const handleShareProfile = () => {
    console.log("Share profile functionality");
    // TODO: Implement share functionality
  };

  const saveProfileChanges = () => {
    setProfileData({
      name: editingData.name,
      username: `@${editingData.username.replace("@", "")}`,
      email: editingData.email,
    });
    editProfileSheetRef.current?.close();
  };

  return (
    <SafeAreaView className="flex-1 bg-background ">
      {/* Header */}
      <View className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <ThemedText type="title" className="text-center text-primary-text">
          {t("profile.title")}
        </ThemedText>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Info */}
        <View className="items-center py-8">
          <View className="w-24 h-24 rounded-full items-center justify-center mb-4 border-2 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600">
            <User
              size={48}
              className="text-primary-icon dark:text-primary-icon"
            />
          </View>
          <ThemedText
            type="title"
            className="mb-2 text-primary-text dark:text-primary-text"
          >
            {profileData.name}
          </ThemedText>
          <ThemedText className="mb-4 text-primary-icon dark:text-primary-icon">
            {profileData.username}
          </ThemedText>

          {/* Action Buttons */}
          <View className="flex-row space-x-3">
            <TouchableOpacity
              className="bg-primary px-6 py-2 rounded-full flex-row items-center shadow-sm"
              onPress={openEditProfile}
            >
              <Edit3 size={16} className="text-black" />
              <ThemedText className="ml-2 font-semibold text-black">
                Edit Profile
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-6 py-2 rounded-full flex-row items-center shadow-sm bg-gray-100 dark:bg-gray-700"
              onPress={handleShareProfile}
            >
              <Share
                size={16}
                className="text-primary-icon dark:text-primary-icon"
              />
              <ThemedText className="ml-2 font-semibold text-primary-icon dark:text-primary-icon">
                Share
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around py-6 border-b border-gray-200 dark:border-gray-700">
          <View className="items-center">
            <ThemedText
              type="defaultSemiBold"
              className="text-lg text-primary-text dark:text-primary-text"
            >
              0
            </ThemedText>
            <ThemedText className="text-sm text-primary-icon dark:text-primary-icon">
              {t("profile.stats.checkins")}
            </ThemedText>
          </View>
          <View className="items-center">
            <ThemedText
              type="defaultSemiBold"
              className="text-lg text-primary-text dark:text-primary-text"
            >
              0
            </ThemedText>
            <ThemedText className="text-sm text-primary-icon dark:text-primary-icon">
              {t("profile.stats.friends")}
            </ThemedText>
          </View>
          <View className="items-center">
            <ThemedText
              type="defaultSemiBold"
              className="text-lg text-primary-text dark:text-primary-text"
            >
              0
            </ThemedText>
            <ThemedText className="text-sm text-primary-icon dark:text-primary-icon">
              {t("profile.stats.places")}
            </ThemedText>
          </View>
        </View>

        {/* Settings Menu */}
        <View className="px-4 py-4">
          {/* Friends */}
          <TouchableOpacity className="flex-row items-center py-4 border-b rounded-lg border-gray-200 dark:border-gray-700">
            <Users
              size={20}
              className="text-primary-icon dark:text-primary-icon"
            />
            <ThemedText className="ml-4 flex-1 text-primary-text dark:text-primary-text">
              {t("profile.menu.friends")}
            </ThemedText>
            <ChevronRight
              size={16}
              className="text-gray-400 dark:text-gray-500"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-4 border-b rounded-lg border-gray-200 dark:border-gray-700"
            onPress={() => router.push("/settings" as any)}
          >
            <Settings
              size={20}
              className="text-primary-icon dark:text-primary-icon"
            />
            <ThemedText className="ml-4 flex-1 text-primary-text dark:text-primary-text">
              {t("profile.menu.settings")}
            </ThemedText>
            <ChevronRight
              size={16}
              className="text-gray-400 dark:text-gray-500"
            />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center py-4 rounded-lg">
            <LogOut size={20} className="text-red-500" />
            <ThemedText className="ml-4 flex-1 text-red-500">
              {t("profile.menu.signOut")}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Bottom Sheet */}
      <BottomSheet
        ref={editProfileSheetRef}
        onClose={() => console.log("Edit profile sheet closed")}
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="p-6 bg-background dark:bg-background">
            <ThemedText
              type="defaultSemiBold"
              className="text-xl mb-6 text-center"
            >
              Edit Profile
            </ThemedText>

            {/* Name Field */}
            <View className="mb-4">
              <ThemedText className="text-sm font-medium mb-2 text-primary-icon dark:text-primary-icon">
                Name
              </ThemedText>
              <TextInputUI
                value={editingData.name}
                onChangeText={(text) =>
                  setEditingData((prev) => ({ ...prev, name: text }))
                }
                placeholder="Enter your name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Username Field */}
            <View className="mb-4">
              <ThemedText className="text-sm font-medium mb-2 text-primary-icon dark:text-primary-icon">
                Username
              </ThemedText>
              <View className="flex-row items-center px-4 py-3 rounded-full border bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-primary">
                <ThemedText className="mr-1 text-gray-500 dark:text-gray-400">
                  @
                </ThemedText>
                <TextInput
                  className="flex-1 text-gray-900 "
                  value={editingData.username}
                  onChangeText={(text) =>
                    setEditingData((prev) => ({
                      ...prev,
                      username: text.replace("@", ""),
                    }))
                  }
                  placeholder="username"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Email Field */}
            <View className="mb-6">
              <ThemedText className="text-sm font-medium mb-2 text-primary-icon dark:text-primary-icon">
                Email
              </ThemedText>
              <TextInputUI
                value={editingData.email}
                onChangeText={(text) =>
                  setEditingData((prev) => ({ ...prev, email: text }))
                }
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Action Buttons */}
            <View className="flex-row space-x-3 pb-6">
              <TouchableOpacity
                className="flex-1 py-3 rounded-lg shadow-sm bg-gray-200 dark:bg-gray-700"
                onPress={() => editProfileSheetRef.current?.close()}
              >
                <ThemedText className="text-center font-semibold">
                  Cancel
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-primary py-3 rounded-lg shadow-sm hover:bg-yellow-500"
                onPress={saveProfileChanges}
              >
                <ThemedText className="text-center font-semibold text-black">
                  Save Changes
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
}
