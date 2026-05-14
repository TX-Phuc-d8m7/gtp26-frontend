/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { FormEvent, useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  Check,
  MessageSquareText,
  PanelRightClose,
  PanelRightOpen,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";

import type { ChatThread } from "@/features/chat/_interface";
import { useThreads } from "@/features/chat/providers/thread-provider";
import { Button } from "@/shared/components/ui/button/index";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet/index";
import { Skeleton } from "@/shared/components/ui/skeleton/index";
import { Typography } from "@/shared/components/ui/typography/index";
import { useMediaQuery } from "@/shared/hooks/use-media-query";

import { styles } from "../../../_styles";

function formatUpdatedAt(value: string) {
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

function ThreadHistoryEmpty() {
  return (
    <Box sx={styles.historyEmptyStyles}>
      <MessageSquareText className="size-5" />
      <Typography as="span" sx={{ fontWeight: 700 }}>
        Chưa có cuộc trò chuyện
      </Typography>
      <Typography as="span" sx={{ fontSize: "0.76rem", lineHeight: 1.5 }}>
        Gửi câu hỏi đầu tiên để bắt đầu lưu lịch sử gợi ý món ăn.
      </Typography>
    </Box>
  );
}

function ThreadList({
  threads,
  onThreadClick,
}: {
  threads: ChatThread[];
  onThreadClick?: (threadId: string) => void;
}) {
  const [threadId, setThreadId] = useQueryState("threadId");
  const { renameThread, deleteThread } = useThreads();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  if (!threads.length) {
    return <ThreadHistoryEmpty />;
  }

  const startRename = (thread: ChatThread) => {
    setEditingId(thread.id);
    setDraftTitle(thread.title);
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
      setThreadId(null);
    }
  };

  const isRenameControlEvent = (target: EventTarget | null) =>
    target instanceof HTMLElement &&
    !!target.closest("form, input, textarea, button");

  return (
    <Box sx={styles.historyListStyles}>
      {threads.map((thread) => {
        const isActive = thread.id === threadId;
        const isEditing = editingId === thread.id;

        return (
          <Box key={thread.id} className="history-item" sx={{ width: "100%" }}>
            <Box
              role="button"
              tabIndex={0}
              sx={styles.historyItemButtonStyles(isActive)}
              onClick={(event) => {
                event.preventDefault();
                if (isEditing) return;
                onThreadClick?.(thread.id);
                if (isActive) return;
                setThreadId(thread.id);
              }}
              onKeyDown={(event) => {
                if (isRenameControlEvent(event.target)) return;
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                if (isEditing) return;
                onThreadClick?.(thread.id);
                if (isActive) return;
                setThreadId(thread.id);
              }}
            >
              {isEditing ? (
                <Box
                  component="form"
                  onSubmit={(event) => handleRename(event, thread.id)}
                  sx={{ display: "flex", width: "100%", gap: 0.6 }}
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => event.stopPropagation()}
                >
                  <Box
                    component="input"
                    value={draftTitle}
                    onChange={(event) => setDraftTitle(event.target.value)}
                    autoFocus
                    sx={styles.historyRenameInputStyles}
                    aria-label="Tên cuộc trò chuyện"
                  />
                  <Box
                    component="button"
                    type="submit"
                    sx={styles.historyActionButtonStyles}
                    aria-label="Lưu tên cuộc trò chuyện"
                  >
                    <Check className="size-4" />
                  </Box>
                  <Box
                    component="button"
                    type="button"
                    sx={styles.historyActionButtonStyles}
                    onClick={() => setEditingId(null)}
                    aria-label="Hủy đổi tên"
                  >
                    <X className="size-4" />
                  </Box>
                </Box>
              ) : (
                <>
                  <Box sx={styles.historyItemContentStyles}>
                    <Typography
                      as="span"
                      sx={styles.historyItemTitleStyles(isActive)}
                    >
                      {thread.title}
                    </Typography>
                    <Typography as="span" sx={styles.historyItemPreviewStyles}>
                      {thread.lastMessagePreview || "Chưa có tin nhắn"}
                    </Typography>
                  </Box>
                  <Typography as="span" sx={styles.historyItemTimeStyles}>
                    {formatUpdatedAt(thread.updatedAt)}
                  </Typography>
                  <Box
                    sx={styles.historyItemActionsStyles}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Box
                      component="button"
                      type="button"
                      sx={styles.historyActionButtonStyles}
                      onClick={() => startRename(thread)}
                      aria-label="Đổi tên cuộc trò chuyện"
                    >
                      <Pencil className="size-3.5" />
                    </Box>
                    <Box
                      component="button"
                      type="button"
                      sx={styles.historyActionButtonStyles}
                      onClick={() => handleDelete(thread.id)}
                      aria-label="Xóa cuộc trò chuyện"
                    >
                      <Trash2 className="size-3.5" />
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

function ThreadHistoryLoading() {
  return (
    <Box sx={styles.historyListStyles}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={`skeleton-${i}`} className="w-full h-14 rounded-2xl" />
      ))}
    </Box>
  );
}

export default function ThreadHistory() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [chatHistoryOpen, setChatHistoryOpen] = useQueryState(
    "chatHistoryOpen",
    parseAsBoolean.withDefault(false),
  );

  const { threads, threadsLoading, refreshThreads } = useThreads();

  useEffect(() => {
    if (typeof window === "undefined") return;
    refreshThreads().catch(console.error);
  }, [refreshThreads]);

  return (
    <>
      <Box sx={{ display: { xs: "none", lg: "flex" } }}>
        <Box sx={styles.historyShellStyles}>
          <Box sx={styles.historyHeaderStyles}>
            <Box sx={styles.historyTitleStyles}>
              <Typography
                as="span"
                sx={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  fontWeight: 800,
                }}
              >
                Bếp trò chuyện
              </Typography>
              <Typography
                as="span"
                sx={{ color: "var(--muted-foreground)", fontSize: "0.76rem" }}
              >
                Các lần hỏi món gần đây
              </Typography>
            </Box>
            <Button
              variant="ghost"
              size="icon"
              sx={styles.headerIconButtonStyles}
              onClick={() => setChatHistoryOpen((p) => !p)}
              aria-label="Thu gọn lịch sử"
            >
              {chatHistoryOpen ? (
                <PanelRightOpen className="size-5" />
              ) : (
                <PanelRightClose className="size-5" />
              )}
            </Button>
          </Box>
          {threadsLoading ? (
            <ThreadHistoryLoading />
          ) : (
            <ThreadList threads={threads} />
          )}
        </Box>
      </Box>
      <div className="lg:hidden">
        <Sheet
          open={!!chatHistoryOpen && !isLargeScreen}
          onOpenChange={(open) => {
            if (isLargeScreen) return;
            setChatHistoryOpen(open);
          }}
        >
          <SheetContent side="left" className="lg:hidden flex">
            <SheetHeader>
              <SheetTitle>Bếp trò chuyện</SheetTitle>
            </SheetHeader>
            {threadsLoading ? (
              <ThreadHistoryLoading />
            ) : (
              <ThreadList
                threads={threads}
                onThreadClick={() => setChatHistoryOpen(false)}
              />
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
