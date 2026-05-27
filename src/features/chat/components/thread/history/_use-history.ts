/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { type FormEvent, useEffect, useState } from "react";
import { parseAsBoolean, useQueryState } from "nuqs";

import type { ChatThread } from "@/features/chat/_interface";
import { useThreads } from "@/features/chat/providers/thread-provider";
import { useMediaQuery } from "@/shared/hooks/use-media-query";

export function formatUpdatedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));
  if (diffMinutes < 1) return "vừa xong";
  if (diffMinutes < 60) return `${diffMinutes} phút`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} giờ`;

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

export function useHistory() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [chatHistoryOpen, setChatHistoryOpen] = useQueryState(
    "chatHistoryOpen",
    parseAsBoolean.withDefault(false),
  );
  const [threadId, setThreadId] = useQueryState("threadId");
  const { threads, threadsLoading, refreshThreads, renameThread, deleteThread } =
    useThreads();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    refreshThreads().catch(console.error);
  }, [refreshThreads]);

  const startRename = (thread: ChatThread) => {
    setEditingId(thread.id);
    setDraftTitle(thread.title);
  };

  const cancelRename = () => {
    setEditingId(null);
    setDraftTitle("");
  };

  const handleRename = async (event: FormEvent, targetThreadId: string) => {
    event.preventDefault();
    await renameThread(targetThreadId, draftTitle);
    setEditingId(null);
    setDraftTitle("");
  };

  const handleDelete = async (targetThreadId: string) => {
    const confirmed = window.confirm("Xóa cuộc trò chuyện này?");
    if (!confirmed) return;
    await deleteThread(targetThreadId);
    if (targetThreadId === threadId) {
      void setThreadId(null);
    }
  };

  /** Desktop: switch thread without closing sidebar. */
  const handleThreadClick = (id: string) => {
    if (id !== threadId) void setThreadId(id);
  };

  /** Mobile: switch thread AND close the sheet. */
  const handleMobileThreadClick = (id: string) => {
    if (id !== threadId) void setThreadId(id);
    void setChatHistoryOpen(false);
  };

  const handleToggleHistory = () => void setChatHistoryOpen((p) => !p);

  const handleSheetOpenChange = (open: boolean) => {
    if (isLargeScreen) return;
    void setChatHistoryOpen(open);
  };

  const isRenameControlEvent = (target: EventTarget | null): boolean =>
    target instanceof HTMLElement &&
    !!target.closest("form, input, textarea, button");

  return {
    threads,
    threadsLoading,
    threadId,
    chatHistoryOpen,
    isLargeScreen,
    editingId,
    draftTitle,
    setDraftTitle,
    isRenameControlEvent,
    startRename,
    cancelRename,
    handleRename,
    handleDelete,
    handleThreadClick,
    handleMobileThreadClick,
    handleToggleHistory,
    handleSheetOpenChange,
  };
}
