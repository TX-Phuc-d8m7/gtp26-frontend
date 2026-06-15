/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";

export interface MultiSelectPillOption {
  label: string;
  value: string;
}

export interface MultiSelectPillsProps {
  options: Array<string | MultiSelectPillOption>;
  value: string[];
  onChange: (value: string[]) => void;
  variant?: "default" | "danger" | "success";
  sx?: SxProps<Theme>;
}
