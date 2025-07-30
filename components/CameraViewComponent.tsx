import { ThemedText } from "@/components/ThemedText";
import { FlipHorizontal2, Zap, ZapOff } from "lucide-react-native";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import {
  Camera,
  CameraPosition,
  PhotoFile,
  PhysicalCameraDeviceType,
  useCameraDevice,
  useCameraDevices,
  useCameraPermission,
} from "react-native-vision-camera";

interface CameraViewComponentProps {
  onPhotoTaken: (uri: string) => void;
  onChangeFacing: (facing: "front" | "back") => void;
  isActive: boolean;
  facing: "front" | "back";
}

const enum CameraLensType {
  Normal = "wide-angle-camera", // Main/default camera
  UltraWide = "ultra-wide-angle-camera", // Ultra-wide camera
  Telephoto = "telephoto-camera", // Telephoto camera
}

const enum FlashModes {
  Off = "off",
  On = "on",
  Auto = "auto",
}

export interface CameraViewRef {
  takePicture: () => Promise<void>;
}

export const CameraViewComponent = forwardRef<
  CameraViewRef,
  CameraViewComponentProps
>(({ onPhotoTaken, onChangeFacing, isActive, facing }, ref) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef<Camera>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isMirrorEnabled, setIsMirrorEnabled] = useState(true);
  const [flashMode, setFlashMode] = React.useState<FlashModes>(FlashModes.Off);
  const [currentLens, setCurrentLens] = React.useState<CameraLensType>(
    CameraLensType.Normal
  );

  // Get the camera device based on position and lens type
  const device = useCameraDevice(facing as CameraPosition, {
    physicalDevices: [currentLens as PhysicalCameraDeviceType],
  });

  // Get all available camera devices
  const devices = useCameraDevices();

  // Get available lens types from the devices
  const getAvailableLenses = useCallback(() => {
    // Try to get devices for the current facing direction
    const allDevices = Object.values(devices).flat();
    const facingDevices = allDevices.filter(
      (device) => device?.position === facing
    );

    if (!facingDevices || facingDevices.length === 0) {
      return [CameraLensType.Normal];
    }

    const availableLenses: CameraLensType[] = [];

    // Check for each lens type
    facingDevices.forEach((device: any) => {
      if (device.physicalDevices) {
        device.physicalDevices.forEach((physicalDevice: string) => {
          switch (physicalDevice) {
            case "wide-angle-camera":
              if (!availableLenses.includes(CameraLensType.Normal)) {
                availableLenses.push(CameraLensType.Normal);
              }
              break;
            case "ultra-wide-angle-camera":
              if (!availableLenses.includes(CameraLensType.UltraWide)) {
                availableLenses.push(CameraLensType.UltraWide);
              }
              break;
            case "telephoto-camera":
              if (!availableLenses.includes(CameraLensType.Telephoto)) {
                availableLenses.push(CameraLensType.Telephoto);
              }
              break;
          }
        });
      }
    });

    // Ensure we always have at least the normal lens
    if (availableLenses.length === 0) {
      availableLenses.push(CameraLensType.Normal);
    }

    return availableLenses;
  }, [devices, facing]);

  const availableLenses = getAvailableLenses();

  const handleFlashToggle = () => {
    const flashModes: FlashModes[] = [
      FlashModes.Off,
      FlashModes.On,
      FlashModes.Auto,
    ];
    const currentIndex = flashModes.indexOf(flashMode);
    const nextIndex = (currentIndex + 1) % flashModes.length;
    setFlashMode(flashModes[nextIndex]);
  };

  const getLensDisplayName = (lens: CameraLensType): string => {
    switch (lens) {
      case CameraLensType.UltraWide:
        return "0.5x";
      case CameraLensType.Telephoto:
        return "2x";
      case CameraLensType.Normal:
      default:
        return "1x";
    }
  };

  const handleLensToggle = () => {
    const currentIndex = availableLenses.indexOf(currentLens);
    const nextIndex = (currentIndex + 1) % availableLenses.length;
    setCurrentLens(availableLenses[nextIndex]);
  };

  // Handle camera facing changes
  useEffect(() => {
    console.log("CameraViewComponent: Camera facing changed to:", facing);
    setCurrentLens(CameraLensType.Normal);
  }, [facing]);

  // Cleanup effect to ensure camera is properly released
  useEffect(() => {
    return () => {
      // Component is unmounting, ensure camera resources are released
      if (cameraRef.current) {
        cameraRef.current = null;
      }
    };
  }, []);

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing || !device) return;

    try {
      setIsCapturing(true);
      const photo: PhotoFile = await cameraRef.current.takePhoto();

      if (photo?.path) {
        onPhotoTaken(`file://${photo.path}`);
      }
    } catch (error) {
      console.error("Error taking picture:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  useImperativeHandle(ref, () => ({
    takePicture,
  }));

  const handleDoubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(onChangeFacing)(facing === "back" ? "front" : "back");
    });

  if (hasPermission === null) {
    // Camera permissions are still loading
    return (
      <View className="bg-gray-800 items-center justify-center rounded-[24px] w-full aspect-square">
        <ThemedText className="text-white text-center text-lg">
          📸 Loading camera...
        </ThemedText>
      </View>
    );
  }

  if (hasPermission === false) {
    // Camera permissions are not granted yet
    return (
      <View className="bg-gray-800 items-center justify-center rounded-[24px] w-full aspect-square p-4">
        <ThemedText className="text-white text-center text-lg mb-4">
          📸 Camera permission required
        </ThemedText>
        <TouchableOpacity
          className="bg-primary px-6 py-3 rounded-full"
          onPress={requestPermission}
        >
          <Text className="text-black font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View className="bg-gray-800 items-center justify-center rounded-[24px] w-full aspect-square">
        <ThemedText className="text-white text-center text-lg">
          📸 Camera device not available
        </ThemedText>
      </View>
    );
  }

  if (!isActive) {
    return (
      <View className="bg-gray-800 items-center justify-center rounded-[24px] w-full aspect-square">
        <ThemedText className="text-white text-center text-lg">
          📸 Camera view disabled
        </ThemedText>
      </View>
    );
  }

  return (
    <View className="w-full aspect-square rounded-[24px] overflow-hidden">
      <GestureDetector gesture={handleDoubleTap}>
        <View
          style={{
            flex: 1,
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: "transparent",
          }}
        >
          <Camera
            ref={cameraRef}
            style={{
              flex: 1,
            }}
            device={device}
            isActive={isActive}
            photo={true}
            onInitialized={() => {
              console.log(
                "Camera is ready, facing:",
                facing,
                "lens:",
                currentLens
              );
            }}
          />
        </View>
      </GestureDetector>

      {/* Camera Control Overlays */}
      <TouchableOpacity
        className="absolute top-4 left-4 bg-black/50 p-2 rounded-full"
        onPress={handleFlashToggle}
      >
        {flashMode === "off" ? (
          <ZapOff size={20} color="white" />
        ) : flashMode === "auto" ? (
          <View className="flex-row items-center">
            <Zap size={20} color="white" />
            <Text className="text-white text-xs ml-1">Auto</Text>
          </View>
        ) : (
          <Zap size={20} color="white" />
        )}
      </TouchableOpacity>

      {/* Lens Toggle - only show if multiple lenses are available */}
      {availableLenses.length > 1 && (
        <TouchableOpacity
          className="absolute top-4 right-4 bg-black/50 px-3 py-2 rounded-full"
          onPress={handleLensToggle}
        >
          <Text className="text-white text-sm font-medium">
            {getLensDisplayName(currentLens)}
          </Text>
        </TouchableOpacity>
      )}

      {facing === "front" && (
        <TouchableOpacity
          className="absolute bottom-4 right-4 bg-black/50 p-2 rounded-full flex-row items-center"
          onPress={() => setIsMirrorEnabled((prev) => !prev)}
        >
          <FlipHorizontal2 size={20} color="white" />
          {isMirrorEnabled && (
            <Text className="text-white text-xs ml-1">Mirror</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
});

CameraViewComponent.displayName = "CameraViewComponent";
