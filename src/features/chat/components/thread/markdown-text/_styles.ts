/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";

export const codeHeaderStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  backgroundColor: "#18181b",
  px: 2,
  py: 1,
  color: "#fff",
  fontSize: 14,
  fontWeight: 700,
};

export const codeLanguageStyles: SxProps<Theme> = {
  textTransform: "lowercase",
  "& > span": { fontSize: 12 },
};

export const inlineCodeStyles: SxProps<Theme> = {
  borderRadius: 1,
  fontWeight: 700,
};

export const styles = {
  codeHeaderStyles,
  codeLanguageStyles,
  inlineCodeStyles,
} as const;
