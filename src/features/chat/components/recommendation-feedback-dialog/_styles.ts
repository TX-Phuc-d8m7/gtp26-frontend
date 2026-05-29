/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";

import { fontWeights } from "@/theme/resources";
import { pxToRem } from "@/shared/utils";

import type { FoodRecommendationFeedbackVerdict } from "../../_interface";

const verdictColors: Record<
  FoodRecommendationFeedbackVerdict,
  { bg: string; border: string; color: string; darkBg: string; darkColor: string }
> = {
  like: {
    bg: "rgba(240,253,244,0.82)",
    border: "rgba(22, 163, 74, 0.28)",
    color: "#15803D",
    darkBg: "rgba(63, 98, 18, 0.34)",
    darkColor: "#D9F99D",
  },
  neutral: {
    bg: "rgba(248,250,252,0.82)",
    border: "rgba(100, 116, 139, 0.24)",
    color: "#475569",
    darkBg: "rgba(63, 63, 70, 0.46)",
    darkColor: "#E7E5E4",
  },
  dislike: {
    bg: "rgba(255,241,242,0.82)",
    border: "rgba(225, 29, 72, 0.24)",
    color: "#BE123C",
    darkBg: "rgba(127, 29, 29, 0.3)",
    darkColor: "#FDA4AF",
  },
};

export const paperSx: SxProps<Theme> = {
  overflow: "hidden",
  border: "1px solid rgba(15, 23, 42, 0.14)",
  borderRadius: pxToRem(28),
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.84), rgba(255,247,237,0.7))",
  color: "#111827",
  boxShadow:
    "0 34px 90px rgba(15, 23, 42, 0.16), inset 0 1px 0 rgba(255,255,255,0.9)",
  backdropFilter: "blur(24px) saturate(1.18)",
  WebkitBackdropFilter: "blur(24px) saturate(1.18)",
  ".dark &": {
    borderColor: "rgba(250, 250, 250, 0.12)",
    background:
      "linear-gradient(135deg, rgba(28,25,23,0.94), rgba(12,10,9,0.9))",
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
  pb: 0.75,
  color: "#111827",
  fontSize: pxToRem(17),
  fontWeight: fontWeights.extrabold,
  ".dark &": {
    color: "#fafafa",
  },
};

export const subtitleSx: SxProps<Theme> = {
  px: 3,
  color: "rgba(15, 23, 42, 0.62)",
  fontSize: pxToRem(13),
  lineHeight: 1.55,
  ".dark &": {
    color: "rgba(250,250,250,0.62)",
  },
};

export const contentSx: SxProps<Theme> = {
  px: 3,
  py: 2.5,
};

export const stackSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 2.4,
};

export const fieldLabelSx: SxProps<Theme> = {
  mb: 1,
  color: "rgba(15, 23, 42, 0.62)",
  fontSize: pxToRem(12),
  fontWeight: fontWeights.extrabold,
  ".dark &": {
    color: "#a1a1aa",
  },
};

export const verdictGridSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
  gap: 1,
};

export const getVerdictButtonSx = (
  verdict: FoodRecommendationFeedbackVerdict,
  selected: boolean,
): SxProps<Theme> => {
  const config = verdictColors[verdict];
  return {
    alignItems: "flex-start",
    borderRadius: pxToRem(18),
    border: `1px solid ${selected ? config.border : "rgba(15, 23, 42, 0.12)"}`,
    background: selected ? config.bg : "rgba(255,255,255,0.54)",
    color: selected ? config.color : "#334155",
    p: 1.5,
    textAlign: "left",
    textTransform: "none",
    boxShadow: selected
      ? "0 14px 30px rgba(15, 23, 42, 0.08)"
      : "inset 0 1px 0 rgba(255,255,255,0.72)",
    "&:hover": {
      borderColor: config.border,
      background: config.bg,
      color: config.color,
    },
    ".dark &": {
      borderColor: selected ? config.border : "rgba(250,250,250,0.12)",
      background: selected ? config.darkBg : "rgba(24,24,27,0.7)",
      color: selected ? config.darkColor : "#d6d3d1",
      boxShadow: "inset 0 1px 0 rgba(250,250,250,0.05)",
      "&:hover": {
        borderColor: config.border,
        background: config.darkBg,
        color: config.darkColor,
      },
    },
  };
};

export const verdictTitleSx: SxProps<Theme> = {
  display: "block",
  fontSize: pxToRem(13.5),
  fontWeight: fontWeights.extrabold,
};

export const verdictDescriptionSx: SxProps<Theme> = {
  display: "block",
  mt: 0.4,
  fontSize: pxToRem(11.8),
  fontWeight: fontWeights.medium,
  opacity: 0.72,
};

export const reasonWrapSx: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  gap: 0.9,
};

export const getReasonChipSx = (selected: boolean): SxProps<Theme> => ({
  borderRadius: "999px",
  border: `1px solid ${selected ? "rgba(234, 88, 12, 0.32)" : "rgba(15, 23, 42, 0.12)"}`,
  backgroundColor: selected ? "rgba(255, 237, 213, 0.72)" : "rgba(255,255,255,0.52)",
  color: selected ? "#C2410C" : "#475569",
  fontWeight: fontWeights.bold,
  ".dark &": {
    borderColor: selected ? "rgba(251, 146, 60, 0.36)" : "rgba(250,250,250,0.12)",
    backgroundColor: selected ? "rgba(124, 45, 18, 0.34)" : "rgba(24,24,27,0.72)",
    color: selected ? "#FDBA74" : "#d6d3d1",
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
      borderColor: "rgba(250,250,250,0.12)",
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

export const triedRowSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1.5,
  borderRadius: pxToRem(18),
  border: "1px solid rgba(15, 23, 42, 0.1)",
  backgroundColor: "rgba(255,255,255,0.46)",
  px: 1.4,
  py: 1,
  ".dark &": {
    borderColor: "rgba(250,250,250,0.1)",
    backgroundColor: "rgba(24,24,27,0.64)",
  },
};

export const actionsSx: SxProps<Theme> = {
  px: 3,
  py: 2.5,
  borderTop: "1px solid rgba(15, 23, 42, 0.08)",
  ".dark &": {
    borderTopColor: "rgba(250,250,250,0.1)",
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
  },
};

export const styles = {
  actionsSx,
  backdropSx,
  cancelButtonSx,
  contentSx,
  fieldLabelSx,
  getReasonChipSx,
  getVerdictButtonSx,
  paperSx,
  reasonWrapSx,
  stackSx,
  submitButtonSx,
  subtitleSx,
  textFieldSx,
  titleSx,
  triedRowSx,
  verdictDescriptionSx,
  verdictGridSx,
  verdictTitleSx,
} as const;
