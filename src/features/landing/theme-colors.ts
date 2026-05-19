/**
 * Landing Page Theme Colors
 * Designed for Health & Nutrition AI Assistant
 * Supporting both Dark and Light modes
 */

export const landingColors = {
  // Dark Theme
  dark: {
    // Primary Colors
    primary: "#10B981", // Emerald Green - Main brand color
    primaryLight: "#34D399", // Lighter emerald for hover
    primaryDark: "#059669", // Darker emerald for pressed

    // Secondary Colors
    secondary: "#F59E0B", // Amber - Warm accent
    secondaryLight: "#FBBF24", // Lighter amber
    secondaryDark: "#D97706", // Darker amber

    // Background Colors
    bg: {
      primary: "#0F1419", // Deep Navy - Main background
      secondary: "#1A202C", // Slightly lighter for cards
      tertiary: "#242D38", // Even lighter for nested elements
    },

    // Text Colors
    text: {
      primary: "#F0F4F8", // Light gray - Main text
      secondary: "#9CA3AF", // Medium gray - Secondary text
      muted: "#6B7280", // Darker gray - Muted text
      inverse: "#0F1419", // For text on light backgrounds
    },

    // Border Colors
    border: {
      primary: "rgba(240, 244, 248, 0.15)", // Light border
      secondary: "rgba(240, 244, 248, 0.08)", // Subtle border
    },

    // Semantic Colors
    success: "#10B981", // Same as primary
    warning: "#F59E0B", // Same as secondary
    error: "#EF4444", // Red for errors
    info: "#3B82F6", // Blue for info

    // Utility Colors
    divider: "rgba(240, 244, 248, 0.1)",
    overlay: "rgba(15, 20, 25, 0.7)",
    shadow: "rgba(0, 0, 0, 0.3)",
  },

  // Light Theme
  light: {
    // Primary Colors
    primary: "#10B981", // Same emerald green
    primaryLight: "#D1FAE5", // Very light emerald for backgrounds
    primaryDark: "#047857", // Darker emerald

    // Secondary Colors
    secondary: "#F59E0B", // Same amber
    secondaryLight: "#FEF3C7", // Very light amber for backgrounds
    secondaryDark: "#B45309", // Darker amber

    // Background Colors
    bg: {
      primary: "#FFFFFF", // White - Main background
      secondary: "#F9FAFB", // Very light gray - Cards
      tertiary: "#F3F4F6", // Slightly darker gray - Nested elements
    },

    // Text Colors
    text: {
      primary: "#0F1419", // Same dark navy as dark theme bg
      secondary: "#4B5563", // Medium gray
      muted: "#9CA3AF", // Light gray
      inverse: "#F0F4F8", // For text on dark backgrounds
    },

    // Border Colors
    border: {
      primary: "rgba(15, 20, 25, 0.15)", // Dark border
      secondary: "rgba(15, 20, 25, 0.08)", // Subtle border
    },

    // Semantic Colors
    success: "#10B981",
    warning: "#F59E0B",
    error: "#DC2626", // Darker red for light bg
    info: "#2563EB", // Darker blue for light bg

    // Utility Colors
    divider: "rgba(15, 20, 25, 0.1)",
    overlay: "rgba(255, 255, 255, 0.7)",
    shadow: "rgba(0, 0, 0, 0.1)",
  },
};

/**
 * Get colors based on theme mode
 */
export function getThemeColors(isDark: boolean) {
  return isDark ? landingColors.dark : landingColors.light;
}

/**
 * Color palettes for gradients and special effects
 */
export const gradients = {
  dark: {
    primary:
      "linear-gradient(135deg, #34D399 0%, #10B981 54%, #059669 100%)",
    secondary:
      "linear-gradient(135deg, #FBBF24 0%, #F59E0B 54%, #D97706 100%)",
    accent:
      "linear-gradient(135deg, #34D399 0%, #FBBF24 54%, #F59E0B 100%)",
  },
  light: {
    primary:
      "linear-gradient(135deg, #10B981 0%, #059669 54%, #047857 100%)",
    secondary:
      "linear-gradient(135deg, #F59E0B 0%, #D97706 54%, #B45309 100%)",
    accent:
      "linear-gradient(135deg, #059669 0%, #D97706 54%, #F59E0B 100%)",
  },
};
