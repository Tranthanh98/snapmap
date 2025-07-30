// app/(tabs)/map.tsx
// this file is Snap screen in the bottom tab navigation
// it is used to display the map with check-in photos
// and allow users to take new check-ins
// SnapScreen is the main camera screen of the app
// it is a screen with camera and privacy mode controls on the header
// central is camera view with camera controls
// bottom is album, check-in button, switch camera mode button

import {
  CameraViewComponent,
  CameraViewRef,
} from "@/components/CameraViewComponent";
import { CaptureButton } from "@/components/CaptureButton";
import { LocationDisplay } from "@/components/LocationDisplay";
import { PhotoDescriptionInput } from "@/components/PhotoDescriptionInput";
import { PhotoDisplayComponent } from "@/components/PhotoDisplayComponent";
import { CheckinItem } from "@/components/StreakDisplay";
import { StreakScreen } from "@/components/StreakScreen";
import { ThemedView } from "@/components/ThemedView";
import { KeyboardAwareWrapper } from "@/components/ui/KeyboardAwareWrapper";
import PopoverUI from "@/components/ui/PopoverUI";
import { useSettings } from "@/contexts/SettingsContext";
import { CheckinData, uploadCheckin } from "@/lib/checkinService";
import { useFocusEffect } from "@react-navigation/native";
import {
  Globe,
  Images,
  Instagram,
  Lock,
  MessageCircle,
  SwitchCamera,
} from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  AppState,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SnapScreen() {
  const { t } = useTranslation();
  const cameraRef = React.useRef<CameraViewRef>(null);
  const { defaultCameraFacing, defaultPrivacyMode } = useSettings();

  // Location state
  const [locationData, setLocationData] = React.useState<{
    address: string;
    coordinates: { latitude: number; longitude: number } | null;
  }>({
    address: "",
    coordinates: null,
  });

  const [openPrivacy, setOpenPrivacy] = React.useState(false);
  const [selectedPrivacy, setSelectedPrivacy] = React.useState<
    "friends" | "public" | "private"
  >(defaultPrivacyMode);
  const [capturedPhoto, setCapturedPhoto] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState("");
  const [isUploading, setIsUploading] = React.useState(false);
  const [isCameraActive, setIsCameraActive] = React.useState(true);

  // Camera state
  const [cameraFacing, setCameraFacing] = React.useState<"front" | "back">(
    defaultCameraFacing
  );

  const [currentStreak] = React.useState(7); // Mock data
  const [checkins] = React.useState<CheckinItem[]>([
    // Mock data - replace with real data from your backend
    {
      id: "1",
      date: new Date("2024-01-15T10:30:00"),
      photoUri: "https://picsum.photos/400/400?random=1",
      location: "Central Park, New York",
      description: "Beautiful morning walk in the park",
    },
    {
      id: "2",
      date: new Date("2024-01-14T15:20:00"),
      photoUri: "https://picsum.photos/400/400?random=2",
      location: "Brooklyn Bridge, New York",
      description: "Amazing view from the bridge",
    },
    // Add more mock data as needed
  ]);

  // Handle tab focus/unfocus to control camera
  useFocusEffect(
    React.useCallback(() => {
      // Tab is focused - activate camera with small delay
      const timer = setTimeout(() => {
        setIsCameraActive(true);
      }, 100);

      return () => {
        // Tab is unfocused - immediately deactivate camera
        clearTimeout(timer);
        setIsCameraActive(false);
      };
    }, [])
  );

  // Handle app state changes (background/foreground)
  React.useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        setIsCameraActive(false);
      } else if (nextAppState === "active") {
        setIsCameraActive(true);
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      setIsCameraActive(false);
      subscription?.remove();
    };
  }, []);

  const handlePhotoTaken = (uri: string) => {
    setCapturedPhoto(uri);
    // Pause camera when photo is captured to save resources
    setIsCameraActive(false);
  };

  const handleUpload = async () => {
    if (!capturedPhoto || !locationData.coordinates) return;

    try {
      setIsUploading(true);

      const checkinData: CheckinData = {
        photoUri: capturedPhoto,
        description: description,
        location: {
          latitude: locationData.coordinates.latitude,
          longitude: locationData.coordinates.longitude,
          address: locationData.address,
        },
        privacy: selectedPrivacy,
      };

      console.log("Uploading checkin:", checkinData);
      const result = await uploadCheckin(checkinData);

      if (result.success) {
        // Reset form after successful upload
        setCapturedPhoto(null);
        setDescription("");
        setSelectedPrivacy("friends");
        // Reactivate camera after successful upload
        setIsCameraActive(true);

        console.log("Checkin uploaded successfully!", result.checkinId);
      } else {
        console.error("Upload failed:", result.error);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelPhoto = () => {
    setCapturedPhoto(null);
    setDescription("");
    // Reactivate camera when photo is cancelled
    setIsCameraActive(true);
  };

  const handleCapturePress = async () => {
    if (capturedPhoto) {
      // If photo is captured, this should trigger send
      // But since we have a separate send button in PhotoDescriptionInput,
      // we might not need this case
      return;
    }

    // Trigger camera capture
    if (cameraRef.current) {
      await cameraRef.current.takePicture();
    }
  };

  const handleCameraSwitch = () => {
    const newFacing = cameraFacing === "back" ? "front" : "back";
    setCameraFacing(newFacing);
  };

  const handleCheckinPress = (checkin: CheckinItem) => {
    console.log("Pressed checkin:", checkin);
    // TODO: Navigate to checkin detail view or show full-screen photo
  };

  const privacyModes = [
    { label: t("snap.privacyModes.friends"), value: "friends", icon: Lock },
    { label: t("snap.privacyModes.public"), value: "public", icon: Globe },
    { label: t("snap.privacyModes.private"), value: "private", icon: Lock },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ThemedView className="flex-1 bg-background">
        {/* Header with privacy and camera controls */}
        <View className="flex-row justify-between items-center px-4 bg-background">
          <PopoverUI
            open={openPrivacy}
            onClose={() => setOpenPrivacy(false)}
            placement="bottom"
            offset={{ x: 80, y: 0 }}
            trigger={
              <TouchableOpacity
                className="flex-row items-center bg-white/20 px-3 py-2 rounded-full"
                onPress={() => setOpenPrivacy(true)}
              >
                <Lock size={16} color="white" />
              </TouchableOpacity>
            }
          >
            {privacyModes.map((mode) => (
              <TouchableOpacity
                key={mode.value}
                className="flex-row items-center px-4 py-2 border-b border-white/20 last:border-b-0"
                onPress={() => {
                  console.log("Selected privacy mode:", mode.value);
                  setSelectedPrivacy(
                    mode.value as "friends" | "public" | "private"
                  );
                  setOpenPrivacy(false);
                }}
              >
                <mode.icon size={16} color="white" />
                <Text className="text-white text-sm ml-2">{mode.label}</Text>
              </TouchableOpacity>
            ))}
          </PopoverUI>

          <TouchableOpacity className="bg-white/20 p-2 rounded-full">
            <MessageCircle size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Camera view placeholder */}
        <KeyboardAwareWrapper>
          {/* Location display */}
          <View className="w-full my-4">
            <LocationDisplay
              provider="mapbox"
              onLocationPress={() => {
                console.log(
                  "Location pressed - could open map or location details"
                );
              }}
              onLocationUpdate={setLocationData}
            />
          </View>

          {/* Camera/Photo display area */}
          <View className="w-full">
            {capturedPhoto ? (
              <PhotoDisplayComponent
                photoUri={capturedPhoto}
                onCancel={handleCancelPhoto}
              />
            ) : isCameraActive ? (
              <CameraViewComponent
                ref={cameraRef}
                onPhotoTaken={handlePhotoTaken}
                isActive={!capturedPhoto && isCameraActive}
                facing={cameraFacing}
                onChangeFacing={setCameraFacing}
              />
            ) : (
              <View className="w-full aspect-square bg-gray-800 rounded-2xl items-center justify-center">
                <View className="items-center">
                  <View className="w-16 h-16 bg-gray-600 rounded-full items-center justify-center">
                    <Instagram size={32} color="#9CA3AF" />
                  </View>
                  <Text className="text-gray-400 text-center text-lg font-medium">
                    Camera Paused
                  </Text>
                  <Text className="text-gray-500 text-center text-sm mt-2 px-4">
                    Camera is paused to save battery. Return to this tab to
                    reactivate.
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Photo description input area - reserve space to prevent layout shift */}
          <View className="w-full m-4 px-4">
            {capturedPhoto ? (
              <PhotoDescriptionInput
                description={description}
                onDescriptionChange={setDescription}
                isLoading={isUploading}
              />
            ) : (
              <View className="h-[48px]" />
            )}
          </View>

          {/* Camera controls */}
          <View className="flex-row justify-around items-center px-4 bg-background w-full">
            {/* Photo gallery */}
            <TouchableOpacity className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
              <Images size={24} color="white" />
            </TouchableOpacity>
            {/* Capture button - only show send mode if we don't have photo description UI */}
            <CaptureButton
              mode={capturedPhoto ? "send" : "capture"}
              onPress={capturedPhoto ? handleUpload : handleCapturePress}
              disabled={isUploading || !!capturedPhoto}
              isLoading={isUploading}
            />
            {/* Switch camera */}
            <TouchableOpacity
              className="w-12 h-12 bg-white/20 rounded-full items-center justify-center"
              onPress={handleCameraSwitch}
            >
              <SwitchCamera size={24} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAwareWrapper>

        {/* Streak Screen - includes swipe up indicator and bottom sheet */}
        <StreakScreen
          currentStreak={currentStreak}
          checkins={checkins}
          onCheckinPress={handleCheckinPress}
        />
      </ThemedView>
    </SafeAreaView>
  );
}
