import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { MapPin, RefreshCw } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface LocationDisplayProps {
  onLocationPress: () => void;
  onLocationUpdate?: (data: {
    address: string;
    coordinates: { latitude: number; longitude: number } | null;
  }) => void;
  provider?: "google" | "mapbox";
}

export const LocationDisplay: React.FC<LocationDisplayProps> = ({
  onLocationPress,
  onLocationUpdate,
  provider = "google",
}) => {
  const { t } = useTranslation();
  const { address, coordinates, loading, error, refreshLocation } =
    useCurrentLocation({
      provider,
    });

  // Notify parent component when location data changes
  React.useEffect(() => {
    if (onLocationUpdate && (address || coordinates)) {
      onLocationUpdate({ address, coordinates });
    }
  }, [address, coordinates, onLocationUpdate]);

  const handlePress = () => {
    if (onLocationPress) {
      onLocationPress();
    }
  };

  const handleRefresh = () => {
    refreshLocation();
  };

  if (error) {
    return (
      <View className="flex-row items-center justify-center bg-red-500/20 px-4 py-2 mx-4 rounded-full">
        <MapPin size={16} color="#EF4444" />
        <Text className="text-red-400 text-sm ml-2 flex-1">{error}</Text>
        <TouchableOpacity onPress={handleRefresh} className="ml-2">
          <RefreshCw size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      className="flex-row items-center justify-center bg-white/10 px-4 py-2 mx-4 rounded-full"
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {loading ? (
        <>
          <ActivityIndicator size="small" color="white" />
          <Text className="text-white text-sm ml-2">
            {t("snap.location.gettingLocation")}
          </Text>
        </>
      ) : (
        <>
          <MapPin size={16} color="white" />
          <Text
            className="text-white text-sm ml-2 flex-1 text-center"
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {address || t("snap.location.unknownLocation")}
          </Text>
          <TouchableOpacity onPress={handleRefresh} className="ml-2">
            <RefreshCw size={16} color="white" />
          </TouchableOpacity>
        </>
      )}
    </TouchableOpacity>
  );
};
