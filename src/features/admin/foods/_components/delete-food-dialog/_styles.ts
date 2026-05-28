/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

import type { Theme } from "@mui/material/styles";

const deleteDark = {
  border: "rgba(255, 247, 237, 0.12)",
  text: "#FFF7ED",
  muted: "rgba(255, 247, 237, 0.62)",
} as const;

export const paperStyles = (theme: Theme) => ({
  borderRadius: 5,
  border: "1px solid rgba(248, 113, 113, 0.28)",
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,241,242,0.86))",
  boxShadow: "0 28px 80px rgba(127, 29, 29, 0.18)",
  color: "#1C1917",
  ".dark &": {
    borderColor: "rgba(248, 113, 113, 0.22)",
    background:
      "linear-gradient(145deg, rgba(28,25,23,0.98), rgba(69,10,10,0.52))",
    boxShadow: "0 32px 90px rgba(0,0,0,0.6)",
    color: deleteDark.text,
  },
});

export const titleStyles = (theme: Theme) => ({
  color: "#7F1D1D",
  fontSize: 24,
  fontWeight: 950,
  ".dark &": {
    color: "#FCA5A5",
  },
});

export const contentStyles = (theme: Theme) => ({
  color: "#44403C",
  fontSize: 15,
  fontWeight: 700,
  lineHeight: 1.65,
  ".dark &": {
    color: deleteDark.muted,
  },
});

export const foodNameStyles = (theme: Theme) => ({
  display: "inline-flex",
  borderRadius: 999,
  border: "1px solid rgba(248, 113, 113, 0.24)",
  backgroundColor: "rgba(254, 226, 226, 0.72)",
  color: "#991B1B",
  fontWeight: 950,
  px: 1,
  py: 0.25,
  ".dark &": {
    borderColor: "rgba(248, 113, 113, 0.2)",
    backgroundColor: "rgba(127, 29, 29, 0.24)",
    color: "#FCA5A5",
  },
});

export const actionsStyles = (theme: Theme) => ({
  gap: 1,
  px: 3,
  pb: 2.5,
});

export const cancelButtonStyles = (theme: Theme) => ({
  borderColor: "rgba(214, 211, 209, 0.9)",
  color: "#44403C",
  ".dark &": {
    borderColor: deleteDark.border,
    color: deleteDark.text,
  },
});

export const dangerButtonStyles = (theme: Theme) => ({
  borderColor: "rgba(220, 38, 38, 0.4)",
  backgroundColor: "#DC2626",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#B91C1C",
  },
  ".dark &": {
    borderColor: "rgba(248, 113, 113, 0.32)",
    backgroundColor: "rgba(220, 38, 38, 0.86)",
  },
});

export const styles = {
  actionsStyles,
  cancelButtonStyles,
  contentStyles,
  dangerButtonStyles,
  foodNameStyles,
  paperStyles,
  titleStyles,
} as const;
