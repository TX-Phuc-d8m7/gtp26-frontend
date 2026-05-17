/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";

export interface StarRatingProps {
  onRate: (rating: number) => void;
  readonly?: boolean;
  currentRating?: number;
  showLabel?: boolean;
  sx?: SxProps<Theme>;
}
