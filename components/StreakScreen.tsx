import { ChevronUp } from "lucide-react-native";
import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { CheckinItem, StreakDisplay } from "./StreakDisplay";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.8; // Cover 80% of screen when open
const CLOSE_THRESHOLD = SCREEN_HEIGHT * 0.25;

interface StreakScreenProps {
  currentStreak: number;
  checkins: CheckinItem[];
  onCheckinPress: (checkin: CheckinItem) => void;
}

export function StreakScreen({
  currentStreak,
  checkins,
  onCheckinPress,
}: StreakScreenProps) {
  const [viewMode, setViewMode] = React.useState<"timeline" | "calendar">(
    "timeline"
  );

  const translateY = useSharedValue(SCREEN_HEIGHT);
  const context = useSharedValue({ y: 0 });

  const openSheet = () => {
    "worklet";
    translateY.value = withSpring(SCREEN_HEIGHT - SHEET_HEIGHT, {
      damping: 50,
      stiffness: 300,
    });
  };

  const closeSheet = () => {
    "worklet";
    translateY.value = withTiming(SCREEN_HEIGHT, {
      duration: 300,
    });
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      const newY = context.value.y + event.translationY;
      // Prevent dragging above the fully opened position
      translateY.value = Math.max(newY, SCREEN_HEIGHT - SHEET_HEIGHT);
    })
    .onEnd((event) => {
      const shouldClose =
        translateY.value > SCREEN_HEIGHT - SHEET_HEIGHT + CLOSE_THRESHOLD ||
        event.velocityY > 500;

      if (shouldClose) {
        runOnJS(closeSheet)();
      } else {
        runOnJS(openSheet)();
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => {
    const isVisible = translateY.value < SCREEN_HEIGHT;
    return {
      opacity: isVisible
        ? withTiming(0.5, { duration: 300 })
        : withTiming(0, { duration: 300 }),
      pointerEvents: isVisible ? ("auto" as const) : ("none" as const),
    };
  });

  return (
    <>
      {/* Backdrop */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
            zIndex: 10,
          },
          backdropStyle,
        ]}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={closeSheet}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Bottom Sheet */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: SHEET_HEIGHT,
              backgroundColor: "white",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              zIndex: 11,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: -3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
            },
            animatedStyle,
          ]}
          className="bg-background dark:bg-gray-900"
        >
          {/* Handle */}
          <View className="items-center py-3">
            <View className="w-12 h-1 bg-gray-400 dark:bg-gray-600 rounded-full" />
          </View>

          {/* Content */}
          <View className="flex-1 px-4">
            <StreakDisplay
              currentStreak={currentStreak}
              checkins={checkins}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onCheckinPress={onCheckinPress}
            />
          </View>
        </Animated.View>
      </GestureDetector>

      {/* Swipe Up Indicator */}
      <SwipeUpIndicator onSwipeUp={openSheet} />
    </>
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

  const handlePress = () => {
    console.log("SwipeUpIndicator pressed - opening sheet");
    onSwipeUp();
  };

  return (
    <View className="absolute bottom-10 left-0 right-0 items-center justify-center pointer-events-none">
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        className="items-center justify-center pointer-events-auto"
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
    </View>
  );
}
