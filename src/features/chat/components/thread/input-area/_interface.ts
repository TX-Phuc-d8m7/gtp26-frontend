/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { FormEvent, KeyboardEvent } from "react";

export interface ComposerAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
}

export interface InputAreaProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onUseHealthProfileChange: (checked: boolean) => void;
  useHealthProfile: boolean;
  isLoading: boolean;
  onCancel?: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  attachments: ComposerAttachment[];
  onAttachmentsChange: (attachments: ComposerAttachment[]) => void;
  onPromptSelect?: (prompt: string) => void;
}
