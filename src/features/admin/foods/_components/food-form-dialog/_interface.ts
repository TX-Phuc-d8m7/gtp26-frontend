/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

import type {
  AdminFoodChipFormField,
  AdminFoodFormErrors,
  AdminFoodFormField,
  AdminFoodFormMode,
  AdminFoodFormState,
  RawIngredientRow,
} from "../../_interface";

export interface FoodFormDialogProps {
  errors: AdminFoodFormErrors;
  formData: AdminFoodFormState;
  isSubmitting: boolean;
  mode: AdminFoodFormMode;
  open: boolean;
  /** Tăng mỗi lần submit fail validation — dùng để trigger auto-switch tab */
  submitAttemptCount: number;
  onChange: (
    field: AdminFoodFormField | "autoEmbed",
    value: string | boolean | string[] | RawIngredientRow[],
  ) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export interface FoodFormTextFieldConfig {
  kind?: "text";
  field: AdminFoodFormField;
  helperText: string;
  label: string;
  multiline?: boolean;
  placeholder?: string;
  rows?: number;
  /** Span cả 2 cột trong layout 2-column */
  wide?: boolean;
}

export interface FoodFormChipFieldConfig {
  kind: "chips";
  field: AdminFoodChipFormField;
  label: string;
  options: readonly string[];
}

export type FoodFormFieldConfig = FoodFormTextFieldConfig | FoodFormChipFieldConfig;

export interface FoodFormSection {
  title: string;
  fields: FoodFormFieldConfig[];
}
