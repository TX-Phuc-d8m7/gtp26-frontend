/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

import type { MultiSelectPillsProps } from ".";

export const rootStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
  marginTop: 1,
});

export const optionButtonStyles =
  (
    variant: NonNullable<MultiSelectPillsProps["variant"]>,
    isSelected: boolean,
  ) =>
  (theme: Theme) => {
    const selectedConfig = {
      default: {
        backgroundColor: "rgba(255, 107, 0, 0.12)",
        borderColor: "rgba(255, 107, 0, 0.28)",
        color: "#D9480F",
        darkBackgroundColor: "rgba(249, 115, 22, 0.14)",
        darkBorderColor: "rgba(251, 146, 60, 0.28)",
        darkColor: "#FB923C",
      },
      danger: {
        backgroundColor: "rgb(239 68 68 / 0.12)",
        borderColor: "rgb(239 68 68 / 0.26)",
        color: "#ef4444",
        darkBackgroundColor: "rgba(239, 68, 68, 0.14)",
        darkBorderColor: "rgba(252, 165, 165, 0.28)",
        darkColor: "#FCA5A5",
      },
      success: {
        backgroundColor: "rgba(47, 143, 70, 0.12)",
        borderColor: "rgba(47, 143, 70, 0.28)",
        color: "#1D5F31",
        darkBackgroundColor: "rgba(47, 143, 70, 0.16)",
        darkBorderColor: "rgba(124, 197, 132, 0.28)",
        darkColor: "#7CC584",
      },
    }[variant];

    return {
      minHeight: "auto",
      padding: "0.4rem 0.75rem",
      borderRadius: "999px",
      border: "1px solid",
      fontSize: 14,
      fontWeight: 700,
      gap: 0.55,
      backgroundColor: isSelected
        ? selectedConfig.backgroundColor
        : "rgba(255, 255, 255, 0.58)",
      borderColor: isSelected
        ? selectedConfig.borderColor
        : "rgba(15, 23, 42, 0.14)",
      color: isSelected ? selectedConfig.color : "var(--muted-foreground)",
      boxShadow: isSelected
        ? "inset 0 1px 0 rgba(255, 255, 255, 0.72)"
        : "none",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      "&:hover": {
        backgroundColor: isSelected
          ? selectedConfig.backgroundColor
          : "rgba(255, 255, 255, 0.78)",
        transform: "translateY(-1px)",
      },
      ".dark &": {
        backgroundColor: isSelected
          ? selectedConfig.darkBackgroundColor
          : "rgba(28, 25, 23, 0.72)",
        borderColor: isSelected
          ? selectedConfig.darkBorderColor
          : "rgba(255, 247, 237, 0.12)",
        color: isSelected
          ? selectedConfig.darkColor
          : "rgba(255, 247, 237, 0.6)",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: isSelected
            ? selectedConfig.darkBackgroundColor
            : "rgba(255, 247, 237, 0.08)",
          color: isSelected
            ? selectedConfig.darkColor
            : "rgba(255, 247, 237, 0.9)",
        },
      },
    };
  };

export const optionIconStyles = (theme: Theme) => ({
  width: 14,
  height: 14,
});

export const styles = {
  rootStyles,
  optionButtonStyles,
  optionIconStyles,
} as const;
