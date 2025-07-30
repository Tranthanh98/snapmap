import { ChevronUp } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { CheckinItem, StreakDisplay } from "./StreakDisplay";
import BottomSheet from "./ui/BottomSheet";

interface StreakBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  currentStreak: number;
  checkins: CheckinItem[];
  onCheckinPress: (checkin: CheckinItem) => void;
}

export function StreakBottomSheet({
  isVisible,
  onClose,
  currentStreak,
  checkins,
  onCheckinPress,
}: StreakBottomSheetProps) {
  const [viewMode, setViewMode] = React.useState<"timeline" | "calendar">(
    "timeline"
  );
  const bottomSheetRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.open();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <BottomSheet ref={bottomSheetRef} onClose={onClose} height={600}>
      <View className="flex-1">
        {/* Handle indicator */}
        <View className="items-center py-2">
          <View className="w-10 h-1 bg-gray-600 rounded-full" />
        </View>

        <StreakDisplay
          currentStreak={currentStreak}
          checkins={checkins}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onCheckinPress={onCheckinPress}
        />
      </View>
    </BottomSheet>
  );
}

interface SwipeUpIndicatorProps {
  onSwipeUp: () => void;
}

export function SwipeUpIndicator({ onSwipeUp }: SwipeUpIndicatorProps) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0.6);

  // Animated bounce effect
  React.useEffect(() => {
    const animate = () => {
      translateY.value = withSpring(-8, { duration: 800 }, () => {
        translateY.value = withSpring(0, { duration: 800 });
      });
    };

    const interval = setInterval(animate, 2000);
    return () => clearInterval(interval);
  }, [translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <TouchableOpacity
      onPress={onSwipeUp}
      activeOpacity={0.8}
      className="items-center justify-center"
    >
      <Animated.View style={animatedStyle}>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            padding: 8,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChevronUp size={20} color="white" />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
