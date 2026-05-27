/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
export interface CodeHeaderProps {
  language?: string;
  code: string;
}

export interface MarkdownTextProps {
  children: string;
}

export interface UseCopyToClipboardOptions {
  copiedDuration?: number;
}
