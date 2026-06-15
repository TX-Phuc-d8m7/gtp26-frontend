/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
} from "@mui/material";
import {
  AlertTriangle,
  CalendarDays,
  KeyRound,
  LockKeyhole,
  LockKeyholeOpen,
  ShieldCheck,
  ShieldMinus,
  User,
  X,
} from "lucide-react";

import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Typography } from "@/shared/components/ui/typography/index";

import type { AdminUserResult } from "../../_interface";
import { styles as usersStyles } from "../../_styles";
import { UserDetailDrawerProps, styles } from ".";

function getInitials(user: AdminUserResult) {
  if (user.full_name?.trim()) {
    return user.full_name
      .trim()
      .split(" ")
      .slice(-2)
      .map((w) => w[0].toUpperCase())
      .join("");
  }
  return user.email[0].toUpperCase();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function UserDetailDrawer({
  actionUserId,
  user,
  open,
  onClose,
  onLock,
  onUnlock,
  onChangeRole,
}: UserDetailDrawerProps) {
  const isActioning = user ? actionUserId === user.id : false;
  const [pendingRoleChange, setPendingRoleChange] = useState<"admin" | "user" | null>(null);

  const handleConfirmRoleChange = () => {
    if (!user || !pendingRoleChange) return;
    onChangeRole(user, pendingRoleChange);
    setPendingRoleChange(null);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: styles.drawerPaperStyles } }}
    >
      {user ? (
        <Box sx={styles.drawerContentStyles}>
          {/* Header */}
          <Box sx={styles.drawerHeaderStyles}>
            <Box>
              <Typography as="p" sx={styles.drawerEyebrowStyles}>
                Chi tiết tài khoản
              </Typography>
              <Typography as="h2" sx={styles.drawerTitleStyles}>
                {user.full_name || "Chưa đặt tên"}
              </Typography>
            </Box>
            <Button
              type="button"
              variant="ghost"
              sx={styles.closeButtonStyles}
              onClick={onClose}
            >
              <X size={16} />
            </Button>
          </Box>

          {/* Profile card */}
          <Box sx={styles.profileCardStyles}>
            <Box sx={styles.avatarLargeStyles(user.role === "admin")}>
              {getInitials(user)}
            </Box>
            <Typography as="p" sx={styles.profileEmailStyles}>
              {user.email}
            </Typography>
            <Box sx={styles.badgeRowStyles}>
              <Box
                component="span"
                sx={usersStyles.roleBadgeStyles(user.role)}
              >
                {user.role === "admin" ? (
                  <ShieldCheck size={11} />
                ) : (
                  <User size={11} />
                )}
                {user.role === "admin" ? "Admin" : "User"}
              </Box>
              <Box
                component="span"
                sx={usersStyles.statusBadgeStyles(user.is_active)}
              >
                {user.is_active ? (
                  <LockKeyholeOpen size={11} />
                ) : (
                  <LockKeyhole size={11} />
                )}
                {user.is_active ? "Hoạt động" : "Đã khóa"}
              </Box>
            </Box>
          </Box>

          {/* Meta */}
          <Box sx={styles.metaGridStyles}>
            <Box sx={styles.metaCardStyles}>
              <Typography as="p" sx={styles.metaLabelStyles}>
                ID
              </Typography>
              <Typography
                as="p"
                sx={{ ...styles.metaValueStyles, fontSize: 11, wordBreak: "break-all" }}
              >
                {user.id}
              </Typography>
            </Box>
            <Box sx={styles.metaCardStyles}>
              <Typography as="p" sx={styles.metaLabelStyles}>
                <CalendarDays size={10} style={{ display: "inline", marginRight: 3 }} />
                Ngày tạo
              </Typography>
              <Typography as="p" sx={styles.metaValueStyles}>
                {formatDate(user.created_at)}
              </Typography>
            </Box>
          </Box>

          <Divider sx={styles.dividerStyles} />

          {/* Actions */}
          <Box>
            <Typography as="p" sx={styles.sectionLabelStyles}>
              Thao tác
            </Typography>
            <Box sx={styles.actionStackStyles}>
              {/* Role toggle */}
              {user.role === "user" ? (
                <Button
                  type="button"
                  variant="ghost"
                  sx={styles.actionButtonStyles}
                  disabled={isActioning}
                  onClick={() => setPendingRoleChange("admin")}
                >
                  {isActioning ? (
                    <CircularProgress size={14} sx={{ color: "inherit" }} />
                  ) : (
                    <ShieldCheck size={15} />
                  )}
                  Thăng quyền lên Admin
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  sx={styles.actionButtonStyles}
                  disabled={isActioning}
                  onClick={() => setPendingRoleChange("user")}
                >
                  {isActioning ? (
                    <CircularProgress size={14} sx={{ color: "inherit" }} />
                  ) : (
                    <ShieldMinus size={15} />
                  )}
                  Hạ quyền về User
                </Button>
              )}

              {/* Lock / Unlock */}
              {user.is_active ? (
                <Button
                  type="button"
                  variant="ghost"
                  sx={styles.dangerButtonStyles}
                  disabled={isActioning}
                  onClick={() => onLock(user)}
                >
                  {isActioning ? (
                    <CircularProgress size={14} sx={{ color: "inherit" }} />
                  ) : (
                    <LockKeyhole size={15} />
                  )}
                  Khóa tài khoản
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  sx={styles.actionButtonStyles}
                  disabled={isActioning}
                  onClick={() => onUnlock(user)}
                >
                  {isActioning ? (
                    <CircularProgress size={14} sx={{ color: "inherit" }} />
                  ) : (
                    <KeyRound size={15} />
                  )}
                  Mở khóa tài khoản
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      ) : null}

      {/* ── Confirm role change dialog ─────────────────────── */}
      <Dialog
        open={Boolean(pendingRoleChange)}
        onClose={() => setPendingRoleChange(null)}
        maxWidth="xs"
        fullWidth
        slotProps={{ paper: { sx: styles.confirmDialogPaperStyles } }}
      >
        <DialogTitle sx={styles.confirmDialogTitleStyles}>
          <Box component={AlertTriangle} sx={{ width: 18, height: 18, color: "var(--warning, #f59e0b)", flexShrink: 0 }} />
          {pendingRoleChange === "admin" ? "Thăng quyền Admin?" : "Hạ quyền về User?"}
        </DialogTitle>
        <DialogContent>
          <Typography as="p" sx={styles.confirmDialogBodyStyles}>
            {pendingRoleChange === "admin" ? (
              <>
                Tài khoản{" "}
                <Box component="span" sx={styles.confirmEmailStyles}>{user?.email}</Box>{" "}
                sẽ có toàn quyền truy cập Admin Console.
              </>
            ) : (
              <>
                Tài khoản{" "}
                <Box component="span" sx={styles.confirmEmailStyles}>{user?.email}</Box>{" "}
                sẽ mất quyền Admin và chỉ còn quyền User thông thường.
              </>
            )}
          </Typography>
        </DialogContent>
        <DialogActions sx={styles.confirmDialogActionsStyles}>
          <Button
            type="button"
            variant="ghost"
            sx={styles.confirmCancelButtonStyles}
            onClick={() => setPendingRoleChange(null)}
          >
            Hủy
          </Button>
          <Button
            type="button"
            variant={pendingRoleChange === "admin" ? "brand" : "destructive"}
            sx={styles.confirmActionButtonStyles}
            onClick={handleConfirmRoleChange}
          >
            {pendingRoleChange === "admin" ? (
              <><ShieldCheck size={14} /> Xác nhận thăng quyền</>
            ) : (
              <><ShieldMinus size={14} /> Xác nhận hạ quyền</>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
}
