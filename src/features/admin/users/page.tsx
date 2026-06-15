/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import {
  KeyRound,
  LockKeyhole,
  RefreshCw,
  Search,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Typography } from "@/shared/components/ui/typography/index";

import { AdminShell } from "../_components/admin-shell";
import { styles as adminStyles } from "../_styles";
import { UserDetailDrawer } from "./_components/user-detail-drawer";
import type { UserRoleFilter, UserStatusFilter } from ".";
import { styles, useAdminUsers } from ".";

const ROLE_FILTERS: { label: string; value: UserRoleFilter }[] = [
  { label: "Tất cả", value: "all" },
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" },
];

const STATUS_FILTERS: { label: string; value: UserStatusFilter }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Hoạt động", value: "active" },
  { label: "Đã khóa", value: "inactive" },
];

function getInitials(email: string, fullName: string | null) {
  if (fullName?.trim()) {
    return fullName
      .trim()
      .split(" ")
      .slice(-2)
      .map((w) => w[0].toUpperCase())
      .join("");
  }
  return email[0].toUpperCase();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function UserTableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Skeleton variant="circular" animation="wave" width={36} height={36} />
              <Box>
                <Skeleton variant="text" animation="wave" width={120} />
                <Skeleton variant="text" animation="wave" width={180} />
              </Box>
            </Box>
          </TableCell>
          <TableCell>
            <Skeleton variant="rounded" animation="wave" width={60} height={22} sx={{ borderRadius: 999 }} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rounded" animation="wave" width={72} height={22} sx={{ borderRadius: 999 }} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" animation="wave" width={80} />
          </TableCell>
          <TableCell align="right">
            <Skeleton variant="rounded" animation="wave" width={72} height={32} sx={{ ml: "auto", borderRadius: "10px" }} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default function AdminUsers() {
  const {
    actionUserId,
    closeDetailDrawer,
    error,
    handleChangeRole,
    handleLockUser,
    handleUnlockUser,
    isLoading,
    loadUsers,
    openDetailDrawer,
    setPage,
    setRoleFilter,
    setRowsPerPage,
    setSearchTerm,
    setStatusFilter,
    state,
  } = useAdminUsers();

  const totalActive = state.users.filter((u) => u.is_active).length;
  const totalAdmin = state.users.filter((u) => u.role === "admin").length;

  return (
    <Box sx={adminStyles.pageStyles}>
      <AdminShell
        activePath="/admin/users"
        title="Người dùng"
        subtitle="Quản lý tài khoản, phân quyền và trạng thái hoạt động của người dùng trong hệ thống."
        actions={
          <Box sx={styles.headerActionStyles}>
            <Button
              type="button"
              variant="ghost"
              sx={adminStyles.actionButtonStyles}
              onClick={() => void loadUsers()}
            >
              <RefreshCw size={16} />
              Làm mới
            </Button>
          </Box>
        }
      >
        <Box sx={adminStyles.contentGridStyles}>
          {/* ── Stats bar ──────────────────────────────────── */}
          <Box sx={styles.statsBarStyles}>
            <Box component="span" sx={styles.statsBadgeStyles("total")}>
              <Users size={13} />
              {state.total.toLocaleString("vi-VN")} tổng
            </Box>
            <Box component="span" sx={styles.statsBadgeStyles("active")}>
              <User size={13} />
              {totalActive.toLocaleString("vi-VN")} hoạt động
            </Box>
            <Box component="span" sx={styles.statsBadgeStyles("inactive")}>
              <LockKeyhole size={13} />
              {(state.users.length - totalActive).toLocaleString("vi-VN")} đã khóa
            </Box>
            <Box component="span" sx={styles.statsBadgeStyles("admin")}>
              <ShieldCheck size={13} />
              {totalAdmin.toLocaleString("vi-VN")} admin
            </Box>
          </Box>

          {/* ── Toolbar ────────────────────────────────────── */}
          <Box sx={styles.toolbarStyles}>
            <TextField
              size="small"
              label="Tìm theo email hoặc tên"
              value={state.searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="example@email.com"
              sx={styles.fieldStyles}
              slotProps={{ input: { startAdornment: <Search size={16} /> } }}
            />

            <Box sx={styles.filterBlockStyles}>
              <Typography as="span" sx={styles.filterLabelStyles}>
                Quyền
              </Typography>
              <Box sx={styles.filterGroupStyles}>
                {ROLE_FILTERS.map((f) => (
                  <Box
                    key={f.value}
                    component="button"
                    onClick={() => setRoleFilter(f.value)}
                    sx={styles.filterPillStyles(state.roleFilter === f.value)}
                  >
                    {f.label}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={styles.filterSeparatorStyles} />

            <Box sx={styles.filterBlockStyles}>
              <Typography as="span" sx={styles.filterLabelStyles}>
                Trạng thái
              </Typography>
              <Box sx={styles.filterGroupStyles}>
                {STATUS_FILTERS.map((f) => (
                  <Box
                    key={f.value}
                    component="button"
                    onClick={() => setStatusFilter(f.value)}
                    sx={styles.filterPillStyles(state.statusFilter === f.value)}
                  >
                    {f.label}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {error && (
            <Typography as="p" sx={styles.messageStyles}>
              {error}
            </Typography>
          )}

          {/* ── Table ──────────────────────────────────────── */}
          <Paper elevation={0} sx={styles.tablePanelStyles}>
            <TableContainer>
              <Table sx={styles.tableStyles}>
                <TableHead>
                  <TableRow>
                    <TableCell>Người dùng</TableCell>
                    <TableCell>Quyền</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell>Ngày tạo</TableCell>
                    <TableCell align="right" sx={{ width: 100 }}>
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <UserTableSkeleton />
                  ) : state.users.length > 0 ? (
                    state.users.map((user) => {
                      const isActioning = actionUserId === user.id;
                      return (
                        <TableRow
                          hover
                          key={user.id}
                          onClick={() => openDetailDrawer(user)}
                          sx={styles.clickableRowStyles}
                        >
                          {/* User cell */}
                          <TableCell>
                            <Box sx={styles.userCellStyles}>
                              <Box sx={styles.avatarStyles(user.role === "admin")}>
                                {getInitials(user.email, user.full_name)}
                              </Box>
                              <Box sx={{ minWidth: 0 }}>
                                <Typography as="p" sx={styles.userNameStyles}>
                                  {user.full_name || "—"}
                                </Typography>
                                <Typography as="p" sx={styles.userEmailStyles}>
                                  {user.email}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>

                          {/* Role */}
                          <TableCell>
                            <Box
                              component="span"
                              sx={styles.roleBadgeStyles(user.role)}
                            >
                              {user.role === "admin" ? (
                                <ShieldCheck size={11} />
                              ) : (
                                <User size={11} />
                              )}
                              {user.role === "admin" ? "Admin" : "User"}
                            </Box>
                          </TableCell>

                          {/* Status */}
                          <TableCell>
                            <Box
                              component="span"
                              sx={styles.statusBadgeStyles(user.is_active)}
                            >
                              {user.is_active ? "Hoạt động" : "Đã khóa"}
                            </Box>
                          </TableCell>

                          {/* Created at */}
                          <TableCell>
                            <Typography as="p" sx={styles.userEmailStyles}>
                              {formatDate(user.created_at)}
                            </Typography>
                          </TableCell>

                          {/* Actions */}
                          <TableCell
                            align="right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Box sx={styles.actionCellStyles}>
                              {user.is_active ? (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  sx={styles.iconActionButtonStyles}
                                  disabled={isActioning}
                                  title="Khóa tài khoản"
                                  onClick={() => void handleLockUser(user)}
                                >
                                  <LockKeyhole size={14} />
                                </Button>
                              ) : (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  sx={styles.iconActionButtonStyles}
                                  disabled={isActioning}
                                  title="Mở khóa tài khoản"
                                  onClick={() => void handleUnlockUser(user)}
                                >
                                  <KeyRound size={14} />
                                </Button>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Box sx={styles.emptyStateStyles}>
                          <Users size={42} strokeWidth={1.5} />
                          <Typography as="p" sx={styles.emptyStateTitleStyles}>
                            Không tìm thấy người dùng nào
                          </Typography>
                          <Typography as="p" sx={styles.emptyStateSubtitleStyles}>
                            Thử từ khóa khác hoặc bỏ bộ lọc hiện tại
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={state.total}
              page={state.page}
              rowsPerPage={state.rowsPerPage}
              rowsPerPageOptions={[10, 20, 50, 100]}
              onPageChange={(_, page) => setPage(page)}
              onRowsPerPageChange={(event) =>
                setRowsPerPage(Number(event.target.value))
              }
              labelRowsPerPage="Số dòng"
              sx={styles.paginationStyles}
            />
          </Paper>
        </Box>
      </AdminShell>

      <UserDetailDrawer
        actionUserId={actionUserId}
        user={state.detailUser}
        open={state.isDetailOpen}
        onClose={closeDetailDrawer}
        onLock={(user) => void handleLockUser(user)}
        onUnlock={(user) => void handleUnlockUser(user)}
        onChangeRole={(user, role) => void handleChangeRole(user, role)}
      />
    </Box>
  );
}
