/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
export interface MultiSelectPillsProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  variant?: "default" | "danger" | "success";
}
