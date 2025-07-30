import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LocationDisplay } from "./LocationDisplay";

export const LocationProviderDemo: React.FC = () => {
  const [provider, setProvider] = useState<"google" | "mapbox">("google");

  return (
    <View className="p-4">
      {/* Provider Switcher */}
      <View className="flex-row justify-center mb-4 bg-black/20 rounded-full p-1">
        <TouchableOpacity
          className={`px-4 py-2 rounded-full ${
            provider === "google" ? "bg-primary" : "bg-transparent"
          }`}
          onPress={() => setProvider("google")}
        >
          <Text
            className={`text-sm ${
              provider === "google" ? "text-black font-bold" : "text-white"
            }`}
          >
            Google Maps
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`px-4 py-2 rounded-full ${
            provider === "mapbox" ? "bg-primary" : "bg-transparent"
          }`}
          onPress={() => setProvider("mapbox")}
        >
          <Text
            className={`text-sm ${
              provider === "mapbox" ? "text-black font-bold" : "text-white"
            }`}
          >
            Mapbox
          </Text>
        </TouchableOpacity>
      </View>

      {/* Location Display */}
      <LocationDisplay
        provider={provider}
        onLocationPress={() => {
          console.log(`Location pressed using ${provider} provider`);
        }}
      />

      <Text className="text-white/60 text-xs text-center mt-2">
        Current provider: {provider === "google" ? "Google Maps" : "Mapbox"}
      </Text>
    </View>
  );
};
