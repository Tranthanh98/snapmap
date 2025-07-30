import { useSettings } from "@/contexts/SettingsContext";

export function useThemeStyles() {
  const { isDarkMode } = useSettings();

  return {
    isDarkMode,
    // Background colors
    bg: {
      primary: isDarkMode ? "bg-gray-900" : "bg-white",
      secondary: isDarkMode ? "bg-gray-800" : "bg-gray-50",
      tertiary: isDarkMode ? "bg-gray-700" : "bg-gray-100",
      elevated: isDarkMode ? "bg-gray-800" : "bg-white",
    },
    // Border colors
    border: {
      primary: isDarkMode ? "border-gray-700" : "border-gray-200",
      secondary: isDarkMode ? "border-gray-800" : "border-gray-100",
      subtle: isDarkMode ? "border-gray-600" : "border-gray-300",
    },
    // Text colors
    text: {
      primary: isDarkMode ? "text-white" : "text-gray-900",
      secondary: isDarkMode ? "text-gray-300" : "text-gray-600",
      tertiary: isDarkMode ? "text-gray-400" : "text-gray-500",
      muted: isDarkMode ? "text-gray-500" : "text-gray-400",
    },
    // Icon colors
    icon: {
      primary: isDarkMode ? "text-gray-300" : "text-gray-600",
      secondary: isDarkMode ? "text-gray-400" : "text-gray-500",
      muted: isDarkMode ? "text-gray-500" : "text-gray-400",
    },
    // Interactive states
    interactive: {
      hover: isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50",
      press: isDarkMode ? "active:bg-gray-700" : "active:bg-gray-100",
    },
    // Input styles
    input: {
      bg: isDarkMode ? "bg-gray-800" : "bg-gray-100",
      border: isDarkMode ? "border-gray-700" : "border-gray-200",
      text: isDarkMode ? "text-white" : "text-gray-900",
      placeholder: isDarkMode ? "#9CA3AF" : "#6B7280",
    },
  };
}
