import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import React, { forwardRef } from "react";
import { Dimensions } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

interface BottomSheetProps {
  children: React.ReactNode;
  onClose?: () => void;
  height?: number;
}

const BottomSheet = forwardRef<any, BottomSheetProps>(
  ({ children, onClose, height }, ref) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const screenHeight = Dimensions.get("window").height;

    // Default to 90% of screen height if no height is provided
    const sheetHeight = height || Math.round(screenHeight * 0.9);

    return (
      <RBSheet
        ref={ref}
        onClose={onClose}
        useNativeDriver={true}
        draggable
        dragOnContent={true}
        closeOnPressMask={true}
        height={sheetHeight}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: isDark ? "#666" : "#ccc",
            width: 40,
            height: 4,
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: Colors.light.background,
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        {children}
      </RBSheet>
    );
  }
);

BottomSheet.displayName = "BottomSheet";

export default BottomSheet;
