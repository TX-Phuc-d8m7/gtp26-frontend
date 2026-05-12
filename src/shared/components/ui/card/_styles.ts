/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

import { effects } from "@/theme/effects";

export const cardStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: 3,
  paddingBlock: 3,
  border: "1px solid var(--border)",
  borderRadius: effects.borderRadius.lg,
  backgroundColor: "color-mix(in srgb, var(--card) 92%, transparent)",
  color: "var(--card-foreground)",
  boxShadow: effects.shadows.md,
});

export const cardHeaderStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: 0.75,
  paddingInline: 3,
});

export const cardTitleStyles = (theme: Theme) => ({
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  lineHeight: 1.1,
});

export const cardDescriptionStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  fontSize: 14,
});

export const cardContentStyles = (theme: Theme) => ({
  paddingInline: 3,
});

export const cardFooterStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  paddingInline: 3,
});

export const styles = {
  cardStyles,
  cardHeaderStyles,
  cardTitleStyles,
  cardDescriptionStyles,
  cardContentStyles,
  cardFooterStyles,
} as const;
