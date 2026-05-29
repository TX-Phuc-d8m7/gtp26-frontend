/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

import type { AdminFoodResult } from "../../_interface";

export interface DeleteFoodDialogProps {
  food: AdminFoodResult | null;
  isDeleting: boolean;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
