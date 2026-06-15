/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

import { colors } from "@/theme/colors";
import { effects } from "@/theme/effects";
import { fontWeights } from "@/theme/resources";
import { pxToRem } from "@/shared/utils";
import type {
  DifficultyLevel,
  FoodCardActionType,
  NutritionTone,
} from "./_interface";

const dark = {
  background: "#09090b",
  surface: "#18181b",
  surfaceSoft: "#27272a",
  border: "rgba(251, 146, 60, 0.24)",
  text: "#fafafa",
  muted: "#a1a1aa",
  orange: "#fb923c",
  scoreStart: "#22C55E",
  scoreMid: "#84CC16",
  scoreEnd: "#A3E635",
} as const;

export const difficultyConfig: Record<
  DifficultyLevel,
  { label: string; color: string; bg: string }
> = {
  easy: { label: "Dễ", color: "#166534", bg: "#F0FDF4" },
  medium: {
    label: "Trung bình",
    color: "#C2410C",
    bg: "#FFF7ED",
  },
  hard: { label: "Khó", color: "#B91C1C", bg: "#FEF2F2" },
};

const tagColors: Record<string, { bg: string; color: string }> = {
  vegetarian: { bg: "#F0FDF4", color: "#166534" },
  "low-carb": { bg: "#FFF7ED", color: "#C2410C" },
  quick: { bg: "#EFF6FF", color: "#2563EB" },
  "high-protein": { bg: "#FFFBEB", color: "#92400E" },
  healthy: { bg: "#F0FDF4", color: "#15803D" },
};

const nutritionChipTone: Record<
  NutritionTone,
  {
    lightBorder: string;
    lightBg: string;
    lightColor: string;
    darkBorder: string;
    darkBg: string;
    darkColor: string;
  }
> = {
  protein: {
    lightBorder: "#FCD34D",
    lightBg: "#FFFBEB",
    lightColor: "#92400E",
    darkBorder: "rgba(251, 191, 36, 0.28)",
    darkBg: "rgba(251, 191, 36, 0.12)",
    darkColor: "#FDE68A",
  },
  carbs: {
    lightBorder: "#CBD5E1",
    lightBg: "#F8FAFC",
    lightColor: "#475569",
    darkBorder: "rgba(148, 163, 184, 0.24)",
    darkBg: "rgba(148, 163, 184, 0.1)",
    darkColor: "#CBD5E1",
  },
  fat: {
    lightBorder: "#FDA4AF",
    lightBg: "#FFF1F2",
    lightColor: "#BE123C",
    darkBorder: "rgba(251, 113, 133, 0.24)",
    darkBg: "rgba(251, 113, 133, 0.1)",
    darkColor: "#FDA4AF",
  },
};

export const getRootSx = (): SxProps<Theme> => ({
  position: "relative",
  isolation: "isolate",
  mb: 2,
  overflow: "hidden",
  borderRadius: pxToRem(24),
  border: "1px solid #D1D5DB",
  background: "#FFFFFF",
  boxShadow: "0 10px 24px rgba(15, 23, 42, 0.07)",
  transition:
    "border-color 180ms ease, box-shadow 180ms ease, background 180ms ease",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: -1,
    pointerEvents: "none",
    display: "none",
  },
  "&:hover": {
    borderColor: "#CBD5E1",
    boxShadow: "0 14px 32px rgba(15, 23, 42, 0.09)",
  },
  ".dark &": {
    borderColor: dark.border,
    background:
      "linear-gradient(135deg, rgba(24,24,27,0.5), rgba(9,9,11,0.28))",
    boxShadow:
      "0 24px 70px rgba(0,0,0,0.42), inset 0 1px 0 rgba(250,250,250,0.08), inset 0 -1px 0 rgba(251,146,60,0.08)",
    backdropFilter: "blur(34px) saturate(1.35)",
    WebkitBackdropFilter: "blur(34px) saturate(1.35)",
    "&::before": {
      display: "block",
      background:
        "radial-gradient(circle at 12% 4%, rgba(250,250,250,0.12), transparent 28%), radial-gradient(circle at 86% 10%, rgba(251,146,60,0.18), transparent 34%), linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))",
    },
    "&:hover": {
      borderColor: "rgba(251, 146, 60, 0.42)",
      background:
        "linear-gradient(135deg, rgba(39,39,42,0.58), rgba(24,24,27,0.36))",
      boxShadow:
        "0 28px 82px rgba(0,0,0,0.52), inset 0 1px 0 rgba(250,250,250,0.1), inset 0 -1px 0 rgba(251,146,60,0.12)",
    },
  },
});

export const contentRootSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  p: 0,
  '&:last-child': { 
    paddingBottom: 0 // Tương đương 16px, hoặc set về 0 tùy ý bạn
  }
};

export const imageWrapSx: SxProps<Theme> = {
  position: "relative",
  width: "100%",
  height: { xs: 176, sm: 192, md: 208 },
  minHeight: { xs: 168, sm: 190, md: 210 },
  flexShrink: 0,
  borderBottom: "1px solid rgba(15, 23, 42, 0.1)",
  background:
    "linear-gradient(135deg, rgba(255,237,213,0.72), rgba(255,247,237,0.42))",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.08) 42%, rgba(0,0,0,0.62) 100%)",
  },
  ".dark &": {
    borderBottomColor: "rgba(251, 146, 60, 0.16)",
    background:
      "linear-gradient(135deg, rgba(39,39,42,0.76), rgba(9,9,11,0.52))",
  },
};

export const imageSx: SxProps<Theme> = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const rankBadgeSx: SxProps<Theme> = {
  position: "absolute",
  top: 12,
  left: 12,
  zIndex: 10,
  display: "flex",
  width: 40,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  backgroundColor: "#FFFFFF",
  color: colors.base.brand[600],
  fontSize: pxToRem(18),
  fontWeight: fontWeights.extrabold,
  boxShadow:
    "0 10px 28px rgba(234,88,12,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
  ".dark &": {
    border: "1px solid rgba(251, 146, 60, 0.26)",
    backgroundColor: "rgba(9,9,11,0.58)",
    color: "#FDBA74",
    boxShadow:
      "inset 0 1px 0 rgba(250,250,250,0.08), 0 14px 32px rgba(0,0,0,0.36)",
  },
};

export const heroOverlaySx: SxProps<Theme> = {
  position: "absolute",
  right: 12,
  bottom: 12,
  left: 12,
  zIndex: 10,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: 1.5,
};

export const heroTextWrapSx: SxProps<Theme> = {
  minWidth: 0,
};

export const heroEyebrowSx: SxProps<Theme> = {
  color: "rgba(255, 255, 255, 0.72)",
  fontSize: pxToRem(12),
  fontWeight: fontWeights.bold,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

export const heroTitleSx: SxProps<Theme> = {
  overflow: "hidden",
  color: "#fff",
  fontSize: pxToRem(18),
  fontWeight: fontWeights.extrabold,
  textOverflow: "ellipsis",
  textShadow: "0 1px 16px rgba(0,0,0,0.32)",
  whiteSpace: "nowrap",
};

export const heroScoreSx: SxProps<Theme> = {
  flexShrink: 0,
  border: "1px solid rgba(255, 255, 255, 0.44)",
  borderRadius: "999px",
  backgroundColor: "#FFFFFF",
  px: 1.5,
  py: 0.75,
  color: colors.base.brand[600],
  fontSize: pxToRem(14),
  fontWeight: fontWeights.extrabold,
  boxShadow:
    "0 12px 30px rgba(15,23,42,0.16), inset 0 1px 0 rgba(255,255,255,0.9)",
  ".dark &": {
    borderColor: "rgba(251, 146, 60, 0.26)",
    backgroundColor: "rgba(9,9,11,0.58)",
    color: "#FDBA74",
    boxShadow:
      "inset 0 1px 0 rgba(250,250,250,0.08), 0 14px 32px rgba(0,0,0,0.36)",
  },
};

export const bodySx: SxProps<Theme> = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  p: { xs: 2, sm: 3 },
  background: "#FFFFFF",
  ".dark &": {
    background:
      "radial-gradient(circle at 100% 0%, rgba(251,146,60,0.1), transparent 30%), linear-gradient(135deg, rgba(24,24,27,0.5), rgba(9,9,11,0.2))",
  },
};

export const fallbackHeaderSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 2,
  mb: 1.5,
};

export const fallbackEyebrowSx: SxProps<Theme> = {
  mb: 0.5,
  color: "var(--muted-foreground)",
  fontSize: pxToRem(12),
  fontWeight: fontWeights.bold,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

export const fallbackTitleSx: SxProps<Theme> = {
  color: "var(--foreground)",
  fontSize: pxToRem(20),
  fontWeight: fontWeights.extrabold,
  lineHeight: 1.24,
  ".dark &": {
    color: dark.text,
  },
};

export const scoreTrackSx: SxProps<Theme> = {
  width: "100%",
  height: 8,
  mb: 2,
  overflow: "hidden",
  borderRadius: "999px",
  backgroundColor: "rgba(226, 232, 240, 0.82)",
  ".dark &": {
    backgroundColor: "rgba(63,63,70,0.48)",
    boxShadow: "inset 0 1px 0 rgba(250,250,250,0.06)",
  },
};

export const getScoreFillSx = (score: number): SxProps<Theme> => ({
  width: `${score}%`,
  height: "100%",
  background: `linear-gradient(90deg, ${colors.base.brand[500]} 0%, ${colors.base.brand[600]} 100%)`,
  transition: "width 500ms ease",
  ".dark &": {
    background: `linear-gradient(90deg, ${dark.scoreStart} 0%, ${dark.scoreMid} 55%, ${dark.scoreEnd} 100%)`,
    boxShadow: "0 0 18px rgba(132, 204, 22, 0.22)",
  },
});

export const descriptionSx: SxProps<Theme> = {
  mb: 2,
  display: "-webkit-box",
  overflow: "hidden",
  color: "var(--muted-foreground)",
  fontSize: pxToRem(14),
  lineHeight: 1.62,
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  ".dark &": {
    color: dark.muted,
  },
};

export const metadataGridSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: {
    xs: "repeat(2, minmax(0, 1fr))",
    md: "repeat(4, minmax(0, 1fr))",
  },
  gap: 1.5,
  mb: 2,
};

export const metaItemSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1,
};

export const getMetaIconSx = (
  tone: "time" | "serving" | "calorie",
): SxProps<Theme> => {
  const colorsByTone = {
    time: { light: "#D97706", dark: "#FBBF24" },
    serving: { light: "#16A34A", dark: "#86EFAC" },
    calorie: { light: "#E11D48", dark: "#FDA4AF" },
  }[tone];

  return {
    width: 16,
    height: 16,
    color: colorsByTone.light,
    ".dark &": {
      color: colorsByTone.dark,
    },
  };
};

export const metaTextSx: SxProps<Theme> = {
  color: "var(--foreground)",
  fontSize: pxToRem(12),
  fontWeight: fontWeights.medium,
  ".dark &": {
    color: "#e4e4e7",
  },
};

export const getDifficultyPillSx = (
  difficulty: DifficultyLevel,
): SxProps<Theme> => {
  const config = difficultyConfig[difficulty];

  return {
    display: "flex",
    alignItems: "center",
    gap: 1,
    borderRadius: effects.borderRadius.md,
    backgroundColor: config.bg,
    px: 1,
    py: 0.5,
    color: config.color,
    ".dark &": {
      border: "1px solid rgba(251, 191, 36, 0.22)",
      backgroundColor: "rgba(251, 191, 36, 0.1)",
      color: "#FDE68A",
    },
    "& svg, & span": {
      color: "inherit",
    },
  };
};

export const difficultyTextSx: SxProps<Theme> = {
  fontSize: pxToRem(12),
  fontWeight: fontWeights.semibold,
};

export const nutritionWrapSx: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1.5,
  mb: 2,
};

export const getNutritionChipSx = (tone: NutritionTone): SxProps<Theme> => {
  const config = nutritionChipTone[tone];

  return {
    borderColor: config.lightBorder,
    backgroundColor: config.lightBg,
    color: config.lightColor,
    fontWeight: fontWeights.bold,
    "& .MuiChip-label": {
      color: config.lightColor,
    },
    "& .MuiChip-icon": {
      color: config.lightColor,
    },
    ".dark &": {
      borderColor: config.darkBorder,
      backgroundColor: config.darkBg,
      color: config.darkColor,
      boxShadow: "inset 0 1px 0 rgba(250,250,250,0.05)",
    },
    ".dark & .MuiChip-label": {
      color: config.darkColor,
    },
    ".dark & .MuiChip-icon": {
      color: config.darkColor,
    },
  };
};

export const tagWrapSx: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
  mb: 2,
};

export const getTagChipSx = (tag: string): SxProps<Theme> => {
  const config = tagColors[tag] || {
    bg: "#F3F4F6",
    color: "#4B5563",
  };

  return {
    borderRadius: "999px",
    backgroundColor: config.bg,
    px: 1.5,
    py: 0.5,
    color: config.color,
    fontSize: pxToRem(12),
    fontWeight: fontWeights.medium,
    ".dark &": {
      backgroundColor: alpha(config.color, 0.16),
      color: "#d4d4d8",
    },
  };
};

export const reasonCardSx: SxProps<Theme> = {
  mb: 2,
  border: "1px solid #BAE6FD",
  borderRadius: effects.borderRadius.md,
  background: "#F0F9FF",
  p: 2,
  boxShadow: "0 6px 16px rgba(14, 165, 233, 0.06)",
  ".dark &": {
    borderColor: "rgba(56, 189, 248, 0.24)",
    background:
      "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(24,24,27,0.36))",
    boxShadow:
      "inset 0 1px 0 rgba(250,250,250,0.07), 0 14px 34px rgba(0,0,0,0.22)",
    backdropFilter: "blur(20px) saturate(1.24)",
    WebkitBackdropFilter: "blur(20px) saturate(1.24)",
  },
};

export const reasonInnerSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-start",
  gap: 1,
};

export const reasonIconSx: SxProps<Theme> = {
  mt: 0.05,
  flexShrink: 0,
  color: "#0284C7",
  ".dark &": {
    color: "#7DD3FC",
  },
};

export const reasonTitleSx: SxProps<Theme> = {
  mb: 1,
  color: "#075985",
  fontSize: pxToRem(14),
  fontWeight: fontWeights.semibold,
  ".dark &": {
    color: "#BAE6FD",
  },
};

export const reasonTextSx: SxProps<Theme> = {
  color: "#334155",
  fontSize: pxToRem(12),
  lineHeight: 1.6,
  ".dark &": {
    color: "#CBD5E1",
  },
};

export const actionsGridSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(auto-fit, minmax(150px, 1fr))",
  },
  gap: 1,
  mt: 1,
};

const actionBaseHoverSx = {
  background: "#F9FAFB",
  boxShadow: "0 8px 18px rgba(15, 23, 42, 0.07)",
};

const actionBaseSx = {
  width: "100%",
  borderRadius: "999px",
  borderColor: "#D1D5DB",
  background: "#FFFFFF",
  boxShadow: "0 4px 10px rgba(15, 23, 42, 0.05)",
  textTransform: "none",
  fontWeight: fontWeights.extrabold,
  "&:hover": actionBaseHoverSx,
  ".dark &": {
    borderColor: "rgba(250, 250, 250, 0.22)",
    color: "#e7e5e4",
    background:
      "linear-gradient(135deg, rgba(250,250,250,0.08), rgba(39,39,42,0.28))",
    boxShadow:
      "inset 0 1px 0 rgba(250,250,250,0.06), 0 18px 46px rgba(0,0,0,0.32)",
    "&:hover": {
      borderColor: "rgba(250, 250, 250, 0.36)",
      background:
        "linear-gradient(135deg, rgba(250,250,250,0.12), rgba(63,63,70,0.38))",
      color: dark.text,
      boxShadow:
        "inset 0 1px 0 rgba(250,250,250,0.08), 0 20px 52px rgba(0,0,0,0.4)",
    },
  },
} satisfies SxProps<Theme>;

export const getActionButtonSx = (
  actionType: FoodCardActionType,
  isActive = false,
): SxProps<Theme> => {
  let lightConfig = {
    color: "#0F766E",
    hoverBorder: "rgba(20, 184, 166, 0.38)",
    hoverColor: "#0F766E",
  };

  if (actionType === "feedback") {
    lightConfig = {
      color: "#475569",
      hoverBorder: "rgba(99, 102, 241, 0.34)",
      hoverColor: "#4F46E5",
    };
  }

  if (actionType === "favorite") {
    lightConfig = {
      color: "#9F1239",
      hoverBorder: "rgba(244, 63, 94, 0.34)",
      hoverColor: "#BE123C",
    };
  }

  if (actionType === "detail") {
    lightConfig = {
      color: "#7C2D12",
      hoverBorder: "rgba(234, 88, 12, 0.36)",
      hoverColor: "#C2410C",
    };
  }

  const activeConfig =
    actionType === "favorite"
      ? {
          color: "#BE123C",
          borderColor: "#FDA4AF",
          background: "#FFF1F2",
          ".dark &": {
            borderColor: "rgba(251, 113, 133, 0.34)",
            background:
              "linear-gradient(135deg, rgba(76, 5, 25, 0.44), rgba(24,24,27,0.68))",
            color: "#FDA4AF",
          },
        }
      : {
          color: "#15803D",
          borderColor: "#86EFAC",
          background: "#F0FDF4",
          ".dark &": {
            borderColor: "rgba(163, 230, 53, 0.34)",
            background:
              "linear-gradient(135deg, rgba(63, 98, 18, 0.34), rgba(24,24,27,0.68))",
            color: "#D9F99D",
          },
        };

  return {
    ...actionBaseSx,
    color: isActive ? activeConfig.color : lightConfig.color,
    ...(isActive ? activeConfig : {}),
    "&:hover": {
      ...actionBaseHoverSx,
      borderColor: lightConfig.hoverBorder,
      color: lightConfig.hoverColor,
    },
  } as SxProps<Theme>;
};

export const styles = {
  difficultyConfig,
  getRootSx,
  contentRootSx,
  imageWrapSx,
  imageSx,
  rankBadgeSx,
  heroOverlaySx,
  heroTextWrapSx,
  heroEyebrowSx,
  heroTitleSx,
  heroScoreSx,
  bodySx,
  fallbackHeaderSx,
  fallbackEyebrowSx,
  fallbackTitleSx,
  scoreTrackSx,
  getScoreFillSx,
  descriptionSx,
  metadataGridSx,
  metaItemSx,
  getMetaIconSx,
  metaTextSx,
  getDifficultyPillSx,
  difficultyTextSx,
  nutritionWrapSx,
  getNutritionChipSx,
  tagWrapSx,
  getTagChipSx,
  reasonCardSx,
  reasonInnerSx,
  reasonIconSx,
  reasonTitleSx,
  reasonTextSx,
  actionsGridSx,
  getActionButtonSx,
} as const;
