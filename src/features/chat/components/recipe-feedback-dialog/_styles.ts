/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";

import { fontWeights } from "@/theme/resources";
import { pxToRem } from "@/shared/utils";

export const paperSx: SxProps<Theme> = {
  overflow: "hidden",
  border: "1px solid rgba(15, 23, 42, 0.14)",
  borderRadius: pxToRem(28),
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.78), rgba(255,247,237,0.66))",
  color: "#111827",
  boxShadow:
    "0 34px 90px rgba(15, 23, 42, 0.16), inset 0 1px 0 rgba(255,255,255,0.9)",
  backdropFilter: "blur(24px) saturate(1.18)",
  WebkitBackdropFilter: "blur(24px) saturate(1.18)",
  ".dark &": {
    borderColor: "#27272a",
    background:
      "linear-gradient(135deg, rgba(24,24,27,0.92), rgba(9,9,11,0.86))",
    color: "#fafafa",
    boxShadow:
      "0 34px 90px rgba(0,0,0,0.62), inset 0 1px 0 rgba(250,250,250,0.06)",
  },
};

export const backdropSx: SxProps<Theme> = {
  backgroundColor: "rgba(15, 23, 42, 0.28)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  ".dark &": {
    backgroundColor: "rgba(9, 9, 11, 0.68)",
  },
};

export const titleSx: SxProps<Theme> = {
  px: 3,
  pt: 2.75,
  pb: 1.5,
  color: "#111827",
  fontSize: pxToRem(16.8),
  fontWeight: fontWeights.extrabold,
  ".dark &": {
    color: "#fafafa",
  },
};

export const contentSx: SxProps<Theme> = {
  px: 3,
  py: 2.5,
};

export const stackSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export const fieldLabelSx: SxProps<Theme> = {
  mb: 1,
  color: "rgba(15, 23, 42, 0.62)",
  fontSize: pxToRem(11.84),
  fontWeight: fontWeights.extrabold,
  letterSpacing: "0.02em",
  ".dark &": {
    color: "#a1a1aa",
  },
};

export const triedRowSx: SxProps<Theme> = {
  display: "flex",
  gap: 1,
};

export const getTriedButtonSx = (isSelected: boolean): SxProps<Theme> => ({
  borderRadius: "999px",
  borderColor: isSelected ? "transparent" : "rgba(15, 23, 42, 0.16)",
  background: isSelected
    ? "linear-gradient(135deg, #EA580C, #F97316)"
    : "rgba(255,255,255,0.46)",
  color: isSelected ? "#fff" : "#334155",
  boxShadow: isSelected
    ? "0 12px 28px rgba(234, 88, 12, 0.22)"
    : "inset 0 1px 0 rgba(255,255,255,0.72)",
  textTransform: "none",
  fontWeight: fontWeights.bold,
  "&:hover": {
    borderColor: "rgba(234, 88, 12, 0.34)",
    background: isSelected
      ? "linear-gradient(135deg, #C2410C, #EA580C)"
      : "rgba(255,237,213,0.72)",
  },
  ".dark &": {
    borderColor: isSelected ? "transparent" : "rgba(251, 146, 60, 0.22)",
    background: isSelected
      ? "linear-gradient(135deg, #fb923c, #f97316)"
      : "rgba(24,24,27,0.72)",
    color: isSelected ? "#fafafa" : "#a1a1aa",
    boxShadow: isSelected ? "none" : "inset 0 1px 0 rgba(250,250,250,0.05)",
    "&:hover": {
      borderColor: "rgba(251, 146, 60, 0.42)",
      background: isSelected
        ? "linear-gradient(135deg, #f97316, #fb923c)"
        : "rgba(39,39,42,0.86)",
    },
  },
});

export const textFieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: pxToRem(18),
    backgroundColor: "rgba(255,255,255,0.52)",
    color: "#111827",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    "& fieldset": {
      borderColor: "rgba(15, 23, 42, 0.14)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(234, 88, 12, 0.38)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#EA580C",
      boxShadow: "0 0 0 3px rgba(234, 88, 12, 0.12)",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(15, 23, 42, 0.42)",
    opacity: 1,
  },
  ".dark & .MuiOutlinedInput-root": {
    backgroundColor: "rgba(24,24,27,0.72)",
    color: "#fafafa",
    "& fieldset": {
      borderColor: "#27272a",
    },
    "&:hover fieldset": {
      borderColor: "rgba(251, 146, 60, 0.46)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fb923c",
      boxShadow: "0 0 0 3px rgba(251, 146, 60, 0.14)",
    },
  },
  ".dark & .MuiInputBase-input::placeholder": {
    color: "#a1a1aa",
  },
};

export const actionsSx: SxProps<Theme> = {
  px: 3,
  py: 2.5,
  borderTop: "1px solid rgba(15, 23, 42, 0.08)",
  ".dark &": {
    borderTopColor: "#27272a",
  },
};

export const cancelButtonSx: SxProps<Theme> = {
  borderRadius: "999px",
  color: "#475569",
  textTransform: "none",
  fontWeight: fontWeights.bold,
  "&:hover": {
    backgroundColor: "rgba(15, 23, 42, 0.06)",
  },
  ".dark &": {
    color: "#a1a1aa",
    "&:hover": {
      backgroundColor: "rgba(251, 146, 60, 0.12)",
      color: "#fafafa",
    },
  },
};

export const submitButtonSx: SxProps<Theme> = {
  borderRadius: "999px",
  px: 2.25,
  background: "linear-gradient(135deg, #EA580C, #F97316)",
  color: "#fff",
  boxShadow: "0 16px 34px rgba(234, 88, 12, 0.24)",
  textTransform: "none",
  fontWeight: fontWeights.extrabold,
  "&:hover": {
    background: "linear-gradient(135deg, #C2410C, #EA580C)",
    boxShadow: "0 18px 40px rgba(234, 88, 12, 0.28)",
  },
  "&.Mui-disabled": {
    background: "rgba(148, 163, 184, 0.42)",
    color: "rgba(255,255,255,0.72)",
    boxShadow: "none",
  },
  ".dark &": {
    background: "linear-gradient(135deg, #fb923c, #f97316)",
    boxShadow: "none",
    "&:hover": {
      background: "linear-gradient(135deg, #f97316, #fb923c)",
    },
    "&.Mui-disabled": {
      background: "rgba(63, 63, 70, 0.72)",
      color: "rgba(250, 250, 250, 0.46)",
    },
  },
};

export const styles = {
  paperSx,
  backdropSx,
  titleSx,
  contentSx,
  stackSx,
  fieldLabelSx,
  triedRowSx,
  getTriedButtonSx,
  textFieldSx,
  actionsSx,
  cancelButtonSx,
  submitButtonSx,
} as const;
