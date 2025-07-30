import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";

export default function ResetPasswordScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ThemedView className="flex-1 px-6 justify-center">
        <View className="mb-8">
          <ThemedText type="title" className="text-center mb-2">
            Reset Password
          </ThemedText>
          <ThemedText className="text-center text-gray-500 dark:text-gray-400">
            Enter your email to receive a password reset link
          </ThemedText>
        </View>

        <View className="mb-6">
          <ThemedText className="mb-2 font-medium">Email</ThemedText>
          <TextInput
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-black dark:text-white"
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity className="bg-primary rounded-lg py-4 mb-4">
          <ThemedText className="text-center font-semibold text-black">
            Send Reset Link
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity>
          <ThemedText className="text-center text-primary">
            Back to Sign In
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}
