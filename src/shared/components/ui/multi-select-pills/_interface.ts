/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";

export interface MultiSelectPillsProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  variant?: "default" | "danger" | "success";
  sx?: SxProps<Theme>;
}
