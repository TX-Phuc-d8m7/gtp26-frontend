/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
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

function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
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
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [threadSearchQuery, setThreadSearchQuery] = useState("");

  const filteredThreads = useMemo(() => {
    const query = normalizeSearchText(threadSearchQuery);
    if (!query) return threads;

    return threads.filter((thread) =>
      normalizeSearchText(thread.title).includes(query),
    );
  }, [threadSearchQuery, threads]);

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
    if (!draftTitle.trim()) {
      cancelRename();
      return;
    }
    await renameThread(targetThreadId, draftTitle.trim());
    setEditingId(null);
    setDraftTitle("");
  };

  /** Mở dialog xác nhận trước khi xóa. */
  const handleDeleteRequest = (targetThreadId: string) => {
    setDeleteConfirmId(targetThreadId);
  };

  /** Người dùng xác nhận → thực hiện xóa. */
  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    const id = deleteConfirmId;
    setDeleteConfirmId(null);
    await deleteThread(id);
    if (id === threadId) {
      void setThreadId(null);
    }
  };

  /** Người dùng huỷ → đóng dialog. */
  const handleDeleteCancel = () => {
    setDeleteConfirmId(null);
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

  /** Bắt đầu cuộc trò chuyện mới — xoá threadId và đóng sheet trên mobile. */
  const handleNewThread = () => {
    void setThreadId(null);
    if (!isLargeScreen) void setChatHistoryOpen(false);
  };

  const isRenameControlEvent = (target: EventTarget | null): boolean =>
    target instanceof HTMLElement &&
    !!target.closest("form, input, textarea, button");

  return {
    threads: filteredThreads,
    totalThreads: threads.length,
    threadsLoading,
    threadId,
    chatHistoryOpen,
    isLargeScreen,
    editingId,
    draftTitle,
    deleteConfirmId,
    threadSearchQuery,
    setThreadSearchQuery,
    isSearchingThreads: Boolean(threadSearchQuery.trim()),
    setDraftTitle,
    isRenameControlEvent,
    startRename,
    cancelRename,
    handleRename,
    handleDelete: handleDeleteRequest,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleThreadClick,
    handleMobileThreadClick,
    handleNewThread,
    handleToggleHistory,
    handleSheetOpenChange,
  };
}
