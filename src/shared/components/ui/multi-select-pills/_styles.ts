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
        backgroundColor: "color-mix(in srgb, var(--primary) 14%, transparent)",
        borderColor: "color-mix(in srgb, var(--primary) 34%, transparent)",
        color: "var(--primary)",
      },
      danger: {
        backgroundColor: "rgb(239 68 68 / 0.12)",
        borderColor: "rgb(239 68 68 / 0.26)",
        color: "#ef4444",
      },
      success: {
        backgroundColor:
          "color-mix(in srgb, var(--food-herb) 16%, transparent)",
        borderColor: "color-mix(in srgb, var(--food-herb) 34%, transparent)",
        color: "var(--food-herb)",
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
        : "color-mix(in srgb, var(--card) 74%, transparent)",
      borderColor: isSelected ? selectedConfig.borderColor : "var(--border)",
      color: isSelected ? selectedConfig.color : "var(--muted-foreground)",
      boxShadow: isSelected ? "0 8px 18px rgb(75 36 16 / 0.08)" : "none",
      "&:hover": {
        backgroundColor: isSelected
          ? selectedConfig.backgroundColor
          : "var(--secondary)",
        transform: "translateY(-1px)",
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
