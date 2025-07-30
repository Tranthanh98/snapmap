import { Calendar, Image, MapPin } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

export interface CheckinItem {
  id: string;
  date: Date;
  photoUri: string;
  location: string;
  description?: string;
}

interface StreakDisplayProps {
  currentStreak: number;
  checkins: CheckinItem[];
  viewMode: "timeline" | "calendar";
  onViewModeChange: (mode: "timeline" | "calendar") => void;
  onCheckinPress: (checkin: CheckinItem) => void;
}

export function StreakDisplay({
  currentStreak,
  checkins,
  viewMode,
  onViewModeChange,
  onCheckinPress,
}: StreakDisplayProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderTimelineView = () => (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {checkins.map((checkin, index) => (
        <TouchableOpacity
          key={checkin.id}
          className="flex-row items-start mb-4 px-4"
          onPress={() => onCheckinPress(checkin)}
        >
          {/* Timeline dot */}
          <View className="items-center mr-3 mt-1">
            <View className="w-3 h-3 bg-primary rounded-full" />
            {index < checkins.length - 1 && (
              <View className="w-0.5 h-16 bg-gray-600 mt-2" />
            )}
          </View>

          {/* Content */}
          <View className="flex-1">
            <View className="bg-gray-800 rounded-lg p-3">
              <View className="flex-row items-center mb-2">
                <Image size={16} color="#fab300" />
                <ThemedText className="text-sm font-medium ml-2">
                  {formatDate(checkin.date)}
                </ThemedText>
                <ThemedText className="text-xs text-gray-400 ml-auto">
                  {formatTime(checkin.date)}
                </ThemedText>
              </View>

              <View className="flex-row items-center mb-2">
                <MapPin size={14} color="#9CA3AF" />
                <ThemedText className="text-xs text-gray-400 ml-1 flex-1">
                  {checkin.location}
                </ThemedText>
              </View>

              {checkin.description && (
                <ThemedText className="text-sm text-gray-300">
                  {checkin.description}
                </ThemedText>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderCalendarView = () => (
    <View className="flex-1 px-4">
      <ThemedText className="text-center text-gray-400 text-sm">
        Calendar view coming soon...
      </ThemedText>
      {/* TODO: Implement calendar grid view */}
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 py-4 border-b border-gray-700">
        {/* Streak counter */}
        <View className="items-center mb-4">
          <ThemedText className="text-3xl font-bold text-primary">
            {currentStreak}
          </ThemedText>
          <ThemedText className="text-sm text-gray-400">
            Day{currentStreak !== 1 ? "s" : ""} Streak
          </ThemedText>
        </View>

        {/* View mode toggle */}
        <View className="flex-row bg-gray-800 rounded-lg p-1">
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-2 rounded-md ${
              viewMode === "timeline" ? "bg-primary" : ""
            }`}
            onPress={() => onViewModeChange("timeline")}
          >
            <Image
              size={16}
              color={viewMode === "timeline" ? "#000" : "#9CA3AF"}
            />
            <Text
              className={`ml-2 text-sm font-medium ${
                viewMode === "timeline" ? "text-black" : "text-primary-text"
              }`}
            >
              Timeline
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-2 rounded-md ${
              viewMode === "calendar" ? "bg-primary" : ""
            }`}
            onPress={() => onViewModeChange("calendar")}
          >
            <Calendar
              size={16}
              color={viewMode === "calendar" ? "#000" : "#9CA3AF"}
            />
            <Text
              className={`ml-2 text-sm font-medium ${
                viewMode === "calendar" ? "text-black" : "text-primary-text"
              }`}
            >
              Calendar
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">
        {viewMode === "timeline" ? renderTimelineView() : renderCalendarView()}
      </View>
    </View>
  );
}
