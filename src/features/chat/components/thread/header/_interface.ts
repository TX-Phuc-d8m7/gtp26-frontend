/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
export interface HeaderProps {
  chatHistoryOpen: boolean;
  onToggleChatHistory: () => void;
  onNewThread: () => void;
  chatStarted: boolean;
  isLargeScreen: boolean;
}
