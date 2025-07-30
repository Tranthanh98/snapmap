import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";

export default function SignupScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ThemedView className="flex-1 px-6 justify-center">
        <View className="mb-8">
          <ThemedText type="title" className="text-center mb-2">
            Create Account
          </ThemedText>
          <ThemedText className="text-center text-gray-500 dark:text-gray-400">
            Join PlaceSnap and start sharing moments
          </ThemedText>
        </View>

        <View className="space-y-4 mb-6">
          <View>
            <ThemedText className="mb-2 font-medium">Full Name</ThemedText>
            <TextInput
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-black dark:text-white"
              placeholder="Enter your full name"
              placeholderTextColor="#999"
            />
          </View>

          <View>
            <ThemedText className="mb-2 font-medium">Email</ThemedText>
            <TextInput
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-black dark:text-white"
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <ThemedText className="mb-2 font-medium">Password</ThemedText>
            <TextInput
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-black dark:text-white"
              placeholder="Create a password"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity className="bg-primary rounded-lg py-4 mb-4">
          <ThemedText className="text-center font-semibold text-black">
            Create Account
          </ThemedText>
        </TouchableOpacity>

        <View className="flex-row justify-center space-x-2">
          <ThemedText className="text-gray-500 dark:text-gray-400">
            Already have an account?
          </ThemedText>
          <TouchableOpacity>
            <ThemedText className="text-primary font-medium">
              Sign In
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}
