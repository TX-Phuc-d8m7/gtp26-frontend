/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";

export interface RecipeFeedbackValue {
  rating: number;
  comment: string;
  tried: boolean;
}

export interface RecipeFeedbackDialogProps {
  open: boolean;
  recipeName: string;
  onClose: () => void;
  onSubmit: (feedback: RecipeFeedbackValue) => void;
  isLoading?: boolean;
  sx?: SxProps<Theme>;
}
