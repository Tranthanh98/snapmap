import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import {
  CircleFadingPlus,
  CircleUserRound,
  MapPinPlus,
} from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fab300",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            height: 68,
            paddingBottom: 5,
          },
          default: {
            paddingTop: 5,
            backgroundColor: "#151718",
          },
        }),
      }}
    >
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => <MapPinPlus size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Snap",
          tabBarIcon: ({ color }) => (
            <CircleFadingPlus size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <CircleUserRound size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
