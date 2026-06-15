/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  Check,
  MessageSquareText,
  PanelRightClose,
  PanelRightOpen,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button/index";
import { Input } from "@/shared/components/ui/input/index";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet/index";
import { Skeleton } from "@/shared/components/ui/skeleton/index";
import { Typography } from "@/shared/components/ui/typography/index";

import { formatUpdatedAt, styles, useHistory } from ".";
import type { ThreadListProps } from ".";

function ThreadHistoryEmpty() {
  return (
    <Box sx={styles.historyEmptyStyles}>
      <MessageSquareText size={20} />
      <Typography as="span" sx={{ fontWeight: 700 }}>
        Chưa có cuộc trò chuyện
      </Typography>
      <Typography as="span" sx={{ fontSize: "0.76rem", lineHeight: 1.5 }}>
        Gửi câu hỏi đầu tiên để bắt đầu lưu lịch sử gợi ý món ăn.
      </Typography>
    </Box>
  );
}

function ThreadHistoryLoading() {
  return (
    <Box sx={styles.historyListStyles}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton
          key={`skeleton-${i}`}
          sx={{ width: "100%", height: 56, borderRadius: 4 }}
        />
      ))}
    </Box>
  );
}

function ThreadList({
  threads,
  threadId,
  editingId,
  draftTitle,
  setDraftTitle,
  isRenameControlEvent,
  startRename,
  cancelRename,
  handleRename,
  handleDelete,
  onThreadSelect,
}: ThreadListProps) {
  if (!threads.length) {
    return <ThreadHistoryEmpty />;
  }

  return (
    <Box sx={styles.historyListStyles}>
      {threads.map((thread) => {
        const isActive = thread.id === threadId;
        const isEditing = editingId === thread.id;

        return (
          <Box key={thread.id} sx={{ width: "100%" }}>
            <Box
              role="button"
              tabIndex={0}
              sx={styles.historyItemButtonStyles(isActive)}
              onClick={(event) => {
                event.preventDefault();
                if (isEditing) return;
                onThreadSelect(thread.id);
              }}
              onKeyDown={(event) => {
                if (isRenameControlEvent(event.target)) return;
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                if (isEditing) return;
                onThreadSelect(thread.id);
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
                  <Input
                    value={draftTitle}
                    onChange={(event) => setDraftTitle(event.target.value)}
                    autoFocus
                    sx={styles.historyRenameInputStyles}
                    aria-label="Tên cuộc trò chuyện"
                  />
                  <Box
                    component="button"
                    type="submit"
                    sx={styles.historyActionButtonStyles("confirm")}
                    aria-label="Lưu tên cuộc trò chuyện"
                  >
                    <Check size={16} />
                  </Box>
                  <Box
                    component="button"
                    type="button"
                    onClick={cancelRename}
                    sx={styles.historyActionButtonStyles("cancel")}
                    aria-label="Hủy đổi tên"
                  >
                    <X size={16} />
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
                    data-history-actions
                    sx={styles.historyItemActionsStyles}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Box
                      component="button"
                      type="button"
                      onClick={() => startRename(thread)}
                      sx={styles.historyActionButtonStyles("edit")}
                      aria-label="Đổi tên cuộc trò chuyện"
                    >
                      <Pencil size={14} />
                    </Box>
                    <Box
                      component="button"
                      type="button"
                      onClick={() => handleDelete(thread.id)}
                      sx={styles.historyActionButtonStyles("delete")}
                      aria-label="Xóa cuộc trò chuyện"
                    >
                      <Trash2 size={14} />
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

export default function ThreadHistory() {
  const {
    threads,
    threadsLoading,
    threadId,
    chatHistoryOpen,
    isLargeScreen,
    editingId,
    draftTitle,
    deleteConfirmId,
    setDraftTitle,
    isRenameControlEvent,
    startRename,
    cancelRename,
    handleRename,
    handleDelete,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleThreadClick,
    handleMobileThreadClick,
    handleNewThread,
    handleToggleHistory,
    handleSheetOpenChange,
  } = useHistory();

  const sharedListProps: Omit<ThreadListProps, "onThreadSelect"> = {
    threads,
    threadId,
    editingId,
    draftTitle,
    setDraftTitle,
    isRenameControlEvent,
    startRename,
    cancelRename,
    handleRename,
    handleDelete,
  };

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
              onClick={handleToggleHistory}
              aria-label="Thu gọn lịch sử"
            >
              {chatHistoryOpen ? (
                <PanelRightOpen size={20} />
              ) : (
                <PanelRightClose size={20} />
              )}
            </Button>
          </Box>

          {/* New Chat button */}
          <Box
            component="button"
            type="button"
            onClick={handleNewThread}
            sx={styles.historyNewChatButtonStyles}
            aria-label="Tạo cuộc trò chuyện mới"
          >
            <Plus size={16} />
            Đoạn chat mới
          </Box>

          {threadsLoading ? (
            <ThreadHistoryLoading />
          ) : (
            <ThreadList {...sharedListProps} onThreadSelect={handleThreadClick} />
          )}
        </Box>
      </Box>

      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        <Sheet
          open={!!chatHistoryOpen && !isLargeScreen}
          onOpenChange={handleSheetOpenChange}
        >
          <SheetContent
            side="left"
            sx={{ display: { xs: "flex", lg: "none" } }}
          >
            <SheetHeader>
              <SheetTitle>Bếp trò chuyện</SheetTitle>
            </SheetHeader>

            {/* New Chat button */}
            <Box
              component="button"
              type="button"
              onClick={handleNewThread}
              sx={styles.historyNewChatButtonStyles}
              aria-label="Tạo cuộc trò chuyện mới"
            >
              <Plus size={16} />
              Đoạn chat mới
            </Box>

            {threadsLoading ? (
              <ThreadHistoryLoading />
            ) : (
              <ThreadList
                {...sharedListProps}
                onThreadSelect={handleMobileThreadClick}
              />
            )}
          </SheetContent>
        </Sheet>
      </Box>

      {/* ── Confirmation dialog ── */}
      <Dialog
        open={deleteConfirmId !== null}
        onClose={handleDeleteCancel}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              px: 1,
              py: 0.5,
              minWidth: 300,
              background: "var(--card)",
              color: "var(--card-foreground)",
              border: "1px solid var(--border)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1rem", pb: 1 }}>
          Xóa cuộc trò chuyện?
        </DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <Typography
            as="p"
            sx={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}
          >
            Hành động này không thể hoàn tác. Cuộc trò chuyện sẽ bị xóa vĩnh viễn.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2, gap: 1 }}>
          <Box
            component="button"
            type="button"
            onClick={handleDeleteCancel}
            sx={{
              px: 3,
              py: 0.75,
              borderRadius: 2,
              fontSize: "0.875rem",
              fontWeight: 500,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--foreground)",
              cursor: "pointer",
              "&:hover": { background: "var(--accent)" },
            }}
          >
            Huỷ
          </Box>
          <Box
            component="button"
            type="button"
            onClick={() => void handleDeleteConfirm()}
            sx={{
              px: 3,
              py: 0.75,
              borderRadius: 2,
              fontSize: "0.875rem",
              fontWeight: 600,
              border: "none",
              background: "var(--destructive)",
              color: "var(--destructive-foreground)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              "&:hover": { filter: "brightness(0.9)" },
            }}
          >
            <Trash2 size={14} />
            Xóa
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
