/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { FormEvent } from "react";

import type { ChatThread } from "@/features/chat/_interface";

export type { ChatThread };

export type ThreadListProps = {
  threads: ChatThread[];
  threadId: string | null;
  editingId: string | null;
  draftTitle: string;
  setDraftTitle: (value: string) => void;
  isRenameControlEvent: (target: EventTarget | null) => boolean;
  startRename: (thread: ChatThread) => void;
  cancelRename: () => void;
  handleRename: (event: FormEvent, threadId: string) => Promise<void>;
  handleDelete: (threadId: string) => Promise<void>;
  onThreadSelect: (threadId: string) => void;
};
