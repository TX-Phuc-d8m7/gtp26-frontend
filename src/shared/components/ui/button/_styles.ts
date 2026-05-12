/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";

import type { ButtonSize, ButtonVariant } from ".";
import { effects } from "@/theme/effects";
import { fontWeights } from "@/theme/resources";

const getButtonSizeSx = (size: ButtonSize | null | undefined) => {
  switch (size) {
    case "sm":
      return {
        minHeight: 32,
        paddingInline: 1.5,
        fontSize: 13,
        gap: 0.75,
      };
    case "lg":
      return {
        minHeight: 44,
        paddingInline: 3,
        fontSize: 15,
        gap: 1,
      };
    case "icon":
      return {
        minHeight: 36,
        width: 36,
        padding: 0,
      };
    default:
      return {
        minHeight: 36,
        paddingInline: 2,
        fontSize: 14,
        gap: 1,
      };
  }
};

const getButtonVariantSx = (variant: ButtonVariant | null | undefined) => {
  switch (variant) {
    case "destructive":
      return {
        backgroundColor: "#ef4444",
        color: "#fff",
        borderColor: "#ef4444",
        boxShadow: "0 10px 24px rgb(239 68 68 / 0.18)",
        "&:hover": {
          backgroundColor: "#dc2626",
          borderColor: "#dc2626",
        },
      };
    case "outline":
      return {
        backgroundColor: "color-mix(in srgb, var(--card) 72%, transparent)",
        color: "var(--foreground)",
        borderColor: "var(--input)",
        "&:hover": {
          backgroundColor: "var(--accent)",
          color: "var(--accent-foreground)",
          borderColor: "color-mix(in srgb, var(--primary) 42%, var(--input))",
        },
      };
    case "secondary":
      return {
        backgroundColor: "var(--secondary)",
        color: "var(--secondary-foreground)",
        borderColor: "var(--secondary)",
        "&:hover": {
          backgroundColor:
            "color-mix(in srgb, var(--secondary) 82%, var(--primary))",
        },
      };
    case "ghost":
      return {
        backgroundColor: "transparent",
        color: "var(--foreground)",
        borderColor: "transparent",
        "&:hover": {
          backgroundColor: "var(--accent)",
          color: "var(--accent-foreground)",
        },
      };
    case "link":
      return {
        minHeight: "auto",
        padding: 0,
        backgroundColor: "transparent",
        color: "var(--primary)",
        borderColor: "transparent",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "transparent",
          textDecoration: "underline",
          textUnderlineOffset: "0.25rem",
        },
      };
    case "brand":
      return {
        background:
          "linear-gradient(135deg, var(--food-herb) 0%, color-mix(in srgb, var(--food-herb) 70%, var(--primary)) 100%)",
        color: "#fff",
        borderColor: "transparent",
        boxShadow: "0 14px 30px rgb(47 143 70 / 0.22)",
        "&:hover": {
          filter: "brightness(1.04)",
        },
      };
    default:
      return {
        background:
          "linear-gradient(135deg, var(--primary) 0%, var(--food-chilli) 100%)",
        color: "var(--primary-foreground)",
        borderColor: "transparent",
        boxShadow: "0 14px 30px rgb(249 115 22 / 0.22)",
        "&:hover": {
          filter: "brightness(1.04)",
        },
      };
  }
};

export const getButtonSx = (
  variant?: ButtonVariant | null,
  size?: ButtonSize | null,
  hasClassName?: boolean,
): SxProps<Theme> => ({
  appearance: "none",
  border: "1px solid",
  borderRadius: effects.borderRadius.md,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
  fontWeight: fontWeights.medium,
  lineHeight: 1,
  textDecoration: "none",
  transition:
    "background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease, filter 160ms ease",
  outline: "none",
  "&:focus-visible": {
    boxShadow: effects.shadows.focus,
  },
  "&:disabled, &[aria-disabled='true']": {
    cursor: "not-allowed",
    opacity: 0.5,
    pointerEvents: "none",
    transform: "none",
  },
  "& svg": {
    flexShrink: 0,
    width: 16,
    height: 16,
  },
  ...(hasClassName ? {} : getButtonSizeSx(size)),
  ...getButtonVariantSx(variant),
});

export const styles = {
  getButtonSx,
} as const;
