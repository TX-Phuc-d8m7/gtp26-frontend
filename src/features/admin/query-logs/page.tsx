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
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Eye,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";

import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Typography } from "@/shared/components/ui/typography/index";

import { AdminShell } from "../_components/admin-shell";
import { styles as adminStyles } from "../_styles";
import { QueryLogDetailDrawer } from "./_components/query-log-detail-drawer";
import { styles, useAdminQueryLogs } from ".";

function formatRelativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "vừa xong";
  if (mins < 60) return `${mins} phút trước`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} giờ trước`;
  const days = Math.floor(hrs / 24);
  return `${days} ngày trước`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton variant="text" animation="wave" width="80%" />
            <Skeleton variant="text" animation="wave" width={100} sx={{ mt: 0.3 }} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" animation="wave" width={160} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rounded" animation="wave" width={80} height={22} sx={{ borderRadius: 999 }} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rounded" animation="wave" width={56} height={22} sx={{ borderRadius: 999 }} />
          </TableCell>
          <TableCell align="right">
            <Skeleton variant="rounded" animation="wave" width={64} height={32} sx={{ ml: "auto", borderRadius: "10px" }} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default function AdminQueryLogs() {
  const {
    clearFilters,
    closeDetailDrawer,
    error,
    handleDeleteLog,
    isDeletingId,
    isLoading,
    loadLogs,
    openDetailDrawer,
    setFromDate,
    setPage,
    setRowsPerPage,
    setSearchTerm,
    setToDate,
    state,
  } = useAdminQueryLogs();

  const totalWarnings = state.logs.filter((l) => l.warning_message).length;
  const todayLogs = state.logs.filter((l) => {
    const d = new Date(l.created_at);
    const now = new Date();
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <Box sx={adminStyles.pageStyles}>
      <AdminShell
        activePath="/admin/query-logs"
        title="Lịch sử truy vấn"
        subtitle="Xem lại các truy vấn người dùng, kết quả AI intent, pipeline thực thi và cảnh báo y tế."
        actions={
          <Box sx={styles.headerActionStyles()}>
            <Button
              type="button"
              variant="ghost"
              sx={adminStyles.actionButtonStyles}
              onClick={() => void loadLogs()}
            >
              <RefreshCw size={16} />
              Làm mới
            </Button>
          </Box>
        }
      >
        <Box sx={adminStyles.contentGridStyles}>
          {/* ── Stats bar ─────────────────────────────────── */}
          <Box sx={styles.statsBarStyles()}>
            <Box component="span" sx={styles.statsBadgeStyles("total")()}>
              <ClipboardList size={13} />
              {state.total.toLocaleString("vi-VN")} tổng
            </Box>
            <Box component="span" sx={styles.statsBadgeStyles("today")()}>
              <CheckCircle2 size={13} />
              {todayLogs.toLocaleString("vi-VN")} hôm nay
            </Box>
            <Box component="span" sx={styles.statsBadgeStyles("warning")()}>
              <AlertTriangle size={13} />
              {totalWarnings.toLocaleString("vi-VN")} có cảnh báo
            </Box>
          </Box>

          {/* ── Toolbar ───────────────────────────────────── */}
          <Box sx={styles.toolbarStyles()}>
            <TextField
              size="small"
              label="Tìm nội dung truy vấn"
              value={state.searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="bún bò, mì quảng..."
              sx={styles.searchFieldStyles()}
              slotProps={{ input: { startAdornment: <Search size={16} /> } }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <SlidersHorizontal size={14} style={{ opacity: 0.5 }} />
              <TextField
                size="small"
                type="date"
                label="Từ ngày"
                value={state.fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                sx={styles.dateFieldStyles()}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                size="small"
                type="date"
                label="Đến ngày"
                value={state.toDate}
                onChange={(e) => setToDate(e.target.value)}
                sx={styles.dateFieldStyles()}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>

            {(state.searchTerm || state.fromDate || state.toDate) && (
              <Button
                type="button"
                variant="ghost"
                sx={adminStyles.actionButtonStyles}
                onClick={clearFilters}
              >
                Xóa bộ lọc
              </Button>
            )}
          </Box>

          {error && (
            <Typography as="p" sx={styles.messageStyles()}>
              {error}
            </Typography>
          )}

          {/* ── Table ─────────────────────────────────────── */}
          <Paper elevation={0} sx={styles.tablePanelStyles()}>
            <TableContainer>
              <Table sx={styles.tableStyles()}>
                <TableHead>
                  <TableRow>
                    <TableCell>Câu truy vấn</TableCell>
                    <TableCell sx={{ width: 220 }}>Pipeline</TableCell>
                    <TableCell sx={{ width: 160 }}>Tags áp dụng</TableCell>
                    <TableCell sx={{ width: 100 }}>Cảnh báo</TableCell>
                    <TableCell align="right" sx={{ width: 90 }}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <TableSkeleton />
                  ) : state.logs.length > 0 ? (
                    state.logs.map((log) => {
                      const includeCount = log.user_include_tags.length;
                      const excludeCount = log.user_exclude_tags.length;
                      return (
                        <TableRow
                          hover
                          key={log.id}
                          onClick={() => openDetailDrawer(log)}
                          sx={styles.clickableRowStyles()}
                        >
                          {/* Query */}
                          <TableCell>
                            <Box sx={styles.queryCellStyles()}>
                              <Typography as="p" sx={styles.queryTextStyles()}>
                                {log.query}
                              </Typography>
                              <Typography as="p" sx={styles.queryMetaStyles()}>
                                {formatRelativeTime(log.created_at)} · {formatDate(log.created_at)}
                              </Typography>
                            </Box>
                          </TableCell>

                          {/* Pipeline */}
                          <TableCell>
                            <Box sx={styles.pipelineCellStyles()}>
                              <Typography as="span" sx={styles.pipelineNumStyles(false)()}>
                                {log.candidate_count}
                              </Typography>
                              <Typography as="span" sx={styles.pipelineArrowStyles()}>→</Typography>
                              <Typography as="span" sx={styles.pipelineNumStyles(false)()}>
                                {log.filtered_count}
                              </Typography>
                              <Typography as="span" sx={styles.pipelineArrowStyles()}>→</Typography>
                              <Typography as="span" sx={styles.pipelineNumStyles(false)()}>
                                {log.scored_count}
                              </Typography>
                              <Typography as="span" sx={styles.pipelineArrowStyles()}>→</Typography>
                              <Typography as="span" sx={styles.pipelineNumStyles(true)()}>
                                {log.returned_count}
                              </Typography>
                            </Box>
                          </TableCell>

                          {/* Tags */}
                          <TableCell>
                            <Box sx={styles.tagChipGroupStyles()}>
                              {includeCount > 0 && (
                                <Box component="span" sx={styles.tagChipStyles("include")()}>
                                  +{includeCount} tags
                                </Box>
                              )}
                              {excludeCount > 0 && (
                                <Box component="span" sx={styles.tagChipStyles("exclude")()}>
                                  −{excludeCount} tags
                                </Box>
                              )}
                              {includeCount === 0 && excludeCount === 0 && (
                                <Typography as="span" sx={styles.queryMetaStyles()}>—</Typography>
                              )}
                            </Box>
                          </TableCell>

                          {/* Warning */}
                          <TableCell>
                            <Box component="span" sx={styles.warningBadgeStyles(!!log.warning_message)()}>
                              {log.warning_message ? (
                                <><AlertTriangle size={10} /> Có</>
                              ) : (
                                <><CheckCircle2 size={10} /> Không</>
                              )}
                            </Box>
                          </TableCell>

                          {/* Actions */}
                          <TableCell
                            align="right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Box sx={styles.actionCellStyles()}>
                              <Button
                                type="button"
                                variant="ghost"
                                sx={styles.iconActionButtonStyles()}
                                title="Xem chi tiết"
                                onClick={() => openDetailDrawer(log)}
                              >
                                <Eye size={14} />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                sx={styles.dangerActionButtonStyles()}
                                title="Xóa log"
                                disabled={isDeletingId === log.id}
                                onClick={() => void handleDeleteLog(log)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Box sx={styles.emptyStateStyles()}>
                          <ClipboardList size={42} strokeWidth={1.5} />
                          <Typography as="p" sx={styles.emptyStateTitleStyles()}>
                            Không tìm thấy truy vấn nào
                          </Typography>
                          <Typography as="p" sx={styles.emptyStateSubtitleStyles()}>
                            Thử từ khóa khác hoặc thay đổi khoảng thời gian
                          </Typography>
                          {(state.searchTerm || state.fromDate || state.toDate) && (
                            <Button
                              type="button"
                              variant="ghost"
                              sx={adminStyles.actionButtonStyles}
                              onClick={clearFilters}
                            >
                              Xóa bộ lọc
                            </Button>
                          )}
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
              onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
              labelRowsPerPage="Số dòng"
              sx={styles.paginationStyles()}
            />
          </Paper>
        </Box>
      </AdminShell>

      <QueryLogDetailDrawer
        log={state.detailLog}
        open={state.isDetailOpen}
        isDeletingId={isDeletingId}
        onClose={closeDetailDrawer}
        onDelete={(log) => void handleDeleteLog(log)}
      />
    </Box>
  );
}
