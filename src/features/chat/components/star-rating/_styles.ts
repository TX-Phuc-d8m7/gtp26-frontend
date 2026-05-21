/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";

import { fontWeights } from "@/theme/resources";
import { pxToRem } from "@/shared/utils";

export const rootSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

export const labelSx: SxProps<Theme> = {
  color: "rgba(15, 23, 42, 0.62)",
  fontSize: pxToRem(11.84),
  fontWeight: fontWeights.extrabold,
  letterSpacing: "0.02em",
  ".dark &": {
    color: "#a1a1aa",
  },
};

export const rowSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 0.75,
};

export const getStarButtonSx = (
  rating: number,
  displayRating: number,
  readonly: boolean,
): SxProps<Theme> => {
  const isActive = rating <= displayRating;

  return {
    display: "grid",
    width: 34,
    height: 34,
    placeItems: "center",
    border: "1px solid rgba(15, 23, 42, 0.1)",
    borderRadius: "12px",
    background: isActive
      ? "rgba(255, 251, 235, 0.82)"
      : "rgba(255,255,255,0.42)",
    color: isActive ? "#F59E0B" : "rgba(15, 23, 42, 0.28)",
    boxShadow: isActive
      ? "0 12px 26px rgba(245, 158, 11, 0.14), inset 0 1px 0 rgba(255,255,255,0.84)"
      : "inset 0 1px 0 rgba(255,255,255,0.64)",
    cursor: readonly ? "default" : "pointer",
    transition:
      "transform 180ms ease, color 180ms ease, border-color 180ms ease, background 180ms ease",
    "&:hover": readonly
      ? undefined
      : {
          transform: "translateY(-1px) scale(1.04)",
          borderColor: "rgba(245, 158, 11, 0.34)",
          color: "#EA580C",
        },
    "&:focus-visible": {
      outline: "2px solid rgba(234, 88, 12, 0.52)",
      outlineOffset: 2,
    },
    ".dark &": {
      borderColor: isActive ? "rgba(251, 146, 60, 0.28)" : "#27272a",
      background: isActive ? "rgba(249, 115, 22, 0.14)" : "rgba(24,24,27,0.72)",
      color: isActive ? "#FB923C" : "#71717a",
      boxShadow: isActive
        ? "inset 0 1px 0 rgba(250,250,250,0.08)"
        : "inset 0 1px 0 rgba(250,250,250,0.04)",
      "&:hover": readonly
        ? undefined
        : {
            transform: "translateY(-1px) scale(1.04)",
            borderColor: "rgba(251, 146, 60, 0.42)",
            color: "#FDBA74",
          },
    },
  };
};

export const countSx: SxProps<Theme> = {
  ml: 1,
  color: "rgba(15, 23, 42, 0.52)",
  fontSize: pxToRem(12),
  fontWeight: fontWeights.bold,
  ".dark &": {
    color: "#a1a1aa",
  },
};

export const styles = {
  rootSx,
  labelSx,
  rowSx,
  getStarButtonSx,
  countSx,
} as const;
