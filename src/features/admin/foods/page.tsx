/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useState } from "react";
import {
  CircularProgress,
  Divider,
  Menu,
  MenuItem,
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
  CheckCircle2,
  DatabaseZap,
  LayoutGrid,
  MoreHorizontal,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";

import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Image } from "@/shared/components/ui/image/index";
import { Typography } from "@/shared/components/ui/typography/index";

import { AdminShell } from "../_components/admin-shell";
import { styles as adminStyles } from "../_styles";
import { DeleteFoodDialog } from "./_components/delete-food-dialog";
import { FoodDetailDrawer } from "./_components/food-detail-drawer";
import { FoodFormDialog } from "./_components/food-form-dialog";
import type { AdminFoodResult, EmbeddingFilter } from ".";
import { styles, useAdminFoods } from ".";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=300";

const FILTER_LABELS: Record<EmbeddingFilter, string> = {
  all: "Tất cả",
  ready: "Sẵn sàng",
  missing: "Thiếu",
};

function FoodTableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton variant="rounded" animation="wave" width="100%" height={64} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" animation="wave" width={120} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rounded" animation="wave" width={56} height={22} sx={{ borderRadius: 999 }} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" animation="wave" width={80} />
          </TableCell>
          <TableCell align="right">
            <Skeleton
              variant="rounded"
              animation="wave"
              width={72}
              height={32}
              sx={{ ml: "auto", borderRadius: "10px" }}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default function AdminFoods() {
  const {
    actionFoodId,
    actionMessage,
    closeDeleteDialog,
    closeDetailDrawer,
    closeFormDialog,
    confirmDeleteFood,
    error,
    foodStats,
    handleRebuildEmbedding,
    handleRebuildKeys,
    isDeleting,
    isDetailLoading,
    isLoading,
    isSubmitting,
    loadFoods,
    openCreateDialog,
    openDeleteDialog,
    openDetailDrawer,
    openEditDialog,
    setEmbeddingFilter,
    setFormField,
    setPage,
    setRowsPerPage,
    setSearchTerm,
    state,
    submitFoodForm,
  } = useAdminFoods();

  // Overflow menu state — UI-only, stays in component
  const [overflowAnchorEl, setOverflowAnchorEl] =
    useState<HTMLElement | null>(null);
  const [overflowFood, setOverflowFood] = useState<AdminFoodResult | null>(
    null,
  );

  const openOverflow = (food: AdminFoodResult, el: HTMLElement) => {
    setOverflowFood(food);
    setOverflowAnchorEl(el);
  };

  const closeOverflow = () => {
    setOverflowAnchorEl(null);
    setOverflowFood(null);
  };

  return (
    <Box sx={adminStyles.pageStyles}>
      <AdminShell
        activePath="/admin/foods"
        title="Kho món ăn"
        subtitle="Quản lý dữ liệu món, kiểm tra trạng thái embedding và chạy lại các tác vụ index khi dữ liệu thay đổi."
        actions={
          <Box sx={styles.headerActionStyles}>
            <Button
              type="button"
              variant="brand"
              sx={styles.createButtonStyles}
              onClick={openCreateDialog}
            >
              <Plus size={16} />
              Thêm món
            </Button>
            <Button
              type="button"
              variant="ghost"
              sx={adminStyles.actionButtonStyles}
              onClick={() => void loadFoods()}
            >
              <RefreshCw size={16} />
              Làm mới
            </Button>
          </Box>
        }
      >
        <Box sx={adminStyles.contentGridStyles}>
          {/* ── Stats mini-bar ─────────────────────────────── */}
          {foodStats && (
            <Box sx={styles.statsBarStyles}>
              <Box sx={styles.statsBadgeStyles("total")}>
                <LayoutGrid size={13} />
                {foodStats.total.toLocaleString("vi-VN")} tổng
              </Box>
              <Box sx={styles.statsBadgeStyles("ready")}>
                <CheckCircle2 size={13} />
                {foodStats.ready.toLocaleString("vi-VN")} sẵn sàng
              </Box>
              <Box sx={styles.statsBadgeStyles("missing")}>
                <Sparkles size={13} />
                {foodStats.missing.toLocaleString("vi-VN")} thiếu embedding
              </Box>
            </Box>
          )}

          {/* ── Toolbar ────────────────────────────────────── */}
          <Box sx={styles.toolbarStyles}>
            <TextField
              fullWidth
              size="small"
              label="Tìm món ăn"
              value={state.searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Mì Quảng, bánh xèo, cá..."
              sx={styles.fieldStyles}
              slotProps={{ input: { startAdornment: <Search size={16} /> } }}
            />

            <Box sx={styles.filterPillGroupStyles}>
              {(["all", "ready", "missing"] as EmbeddingFilter[]).map((f) => (
                <Box
                  key={f}
                  component="button"
                  onClick={() => setEmbeddingFilter(f)}
                  sx={styles.filterPillStyles(state.embeddingFilter === f)}
                >
                  {FILTER_LABELS[f]}
                </Box>
              ))}
            </Box>
          </Box>

          {/* ── Messages ───────────────────────────────────── */}
          {actionMessage && (
            <Typography as="p" sx={styles.messageStyles}>
              {actionMessage}
            </Typography>
          )}
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
                    <TableCell>Món ăn</TableCell>
                    <TableCell>Phân loại</TableCell>
                    <TableCell sx={{ width: 130 }}>Gợi ý quán</TableCell>
                    <TableCell>Embedding</TableCell>
                    <TableCell align="right" sx={{ width: 80 }}>
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <FoodTableSkeleton />
                  ) : state.foods.length > 0 ? (
                    state.foods.map((food) => {
                      const isActionLoading = actionFoodId === food.id;
                      const allTags = [
                        ...food.taste_profile,
                        ...food.meal_context,
                      ];
                      const visibleTags = allTags.slice(0, 3);
                      const hiddenCount = allTags.length - visibleTags.length;

                      return (
                        <TableRow
                          hover
                          key={food.id}
                          onClick={() => void openDetailDrawer(food)}
                          sx={styles.clickableRowStyles}
                        >
                          {/* Món ăn */}
                          <TableCell>
                            <Box sx={styles.foodCellStyles}>
                              <Image
                                src={food.img_url ?? FALLBACK_IMAGE}
                                alt={food.name}
                                sx={styles.imageStyles}
                              />
                              <Box sx={{ minWidth: 0 }}>
                                <Typography as="p" sx={styles.nameStyles}>
                                  {food.name}
                                </Typography>
                                <Typography
                                  as="p"
                                  sx={styles.descriptionStyles}
                                >
                                  {food.description}
                                </Typography>
                                {food.core_ingredients.length > 0 && (
                                  <Box sx={[styles.chipWrapStyles, { mt: 0.75 }]}>
                                    {food.core_ingredients
                                      .slice(0, 2)
                                      .map((item) => (
                                        <Box
                                          key={item}
                                          component="span"
                                          sx={styles.ingredientChipStyles}
                                        >
                                          {item}
                                        </Box>
                                      ))}
                                    {food.core_ingredients.length > 2 && (
                                      <Box
                                        component="span"
                                        sx={styles.ingredientChipStyles}
                                      >
                                        +{food.core_ingredients.length - 2}
                                      </Box>
                                    )}
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          </TableCell>

                          {/* Phân loại */}
                          <TableCell>
                            <Box sx={styles.chipWrapStyles}>
                              {visibleTags.map((item) => (
                                <Box
                                  key={item}
                                  component="span"
                                  sx={styles.contextChipStyles}
                                >
                                  {item}
                                </Box>
                              ))}
                              {hiddenCount > 0 && (
                                <Box
                                  component="span"
                                  sx={styles.contextChipStyles}
                                >
                                  +{hiddenCount}
                                </Box>
                              )}
                            </Box>
                          </TableCell>

                          {/* Gợi ý quán */}
                          <TableCell>
                            <Box
                              component="span"
                              sx={styles.diningContextChipStyles(food.dining_context)}
                            >
                              {food.dining_context === "restaurant"
                                ? "Quán"
                                : food.dining_context === "home_cooked"
                                  ? "Nhà"
                                  : "Cả hai"}
                            </Box>
                          </TableCell>

                          {/* Embedding */}
                          <TableCell>
                            <Box
                              component="span"
                              sx={styles.statusChipStyles(food.has_embedding)}
                            >
                              {isActionLoading ? (
                                <CircularProgress
                                  size={10}
                                  sx={{ color: "inherit" }}
                                />
                              ) : food.has_embedding ? (
                                "Sẵn sàng"
                              ) : (
                                "Thiếu"
                              )}
                            </Box>
                          </TableCell>

                          {/* Actions — stopPropagation để không trigger row click */}
                          <TableCell
                            align="right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Box sx={[styles.actionStackStyles, { justifyContent: "flex-end" }]}>
                              <Button
                                type="button"
                                variant="ghost"
                                sx={styles.iconActionButtonStyles}
                                onClick={() => openEditDialog(food)}
                                title="Chỉnh sửa"
                              >
                                <Pencil size={14} />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                sx={styles.iconActionButtonStyles}
                                onClick={(e) =>
                                  openOverflow(food, e.currentTarget)
                                }
                                title="Thêm thao tác"
                              >
                                <MoreHorizontal size={14} />
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Box sx={styles.emptyStateStyles}>
                          <UtensilsCrossed size={42} strokeWidth={1.5} />
                          <Typography as="p" sx={styles.emptyStateTitleStyles}>
                            Không tìm thấy món nào
                          </Typography>
                          <Typography
                            as="p"
                            sx={styles.emptyStateSubtitleStyles}
                          >
                            Thử từ khóa khác hoặc bỏ bộ lọc hiện tại
                          </Typography>
                          <Box sx={styles.emptyStateActionsStyles}>
                            <Button
                              type="button"
                              variant="ghost"
                              sx={adminStyles.actionButtonStyles}
                              onClick={() => {
                                setSearchTerm("");
                                setEmbeddingFilter("all");
                              }}
                            >
                              Xóa bộ lọc
                            </Button>
                            <Button
                              type="button"
                              variant="brand"
                              sx={styles.createButtonStyles}
                              onClick={openCreateDialog}
                            >
                              <Plus size={15} />
                              Thêm món mới
                            </Button>
                          </Box>
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

      {/* ── Overflow menu ──────────────────────────────────── */}
      <Menu
        anchorEl={overflowAnchorEl}
        open={Boolean(overflowAnchorEl)}
        onClose={closeOverflow}
        slotProps={{ paper: { sx: styles.overflowMenuPaperStyles } }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            if (!overflowFood) return;
            closeOverflow();
            void handleRebuildKeys(overflowFood);
          }}
        >
          <DatabaseZap size={14} />
          Rebuild keys
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (!overflowFood) return;
            closeOverflow();
            void handleRebuildEmbedding(overflowFood);
          }}
        >
          <Sparkles size={14} />
          Rebuild embedding
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            if (!overflowFood) return;
            closeOverflow();
            openDeleteDialog(overflowFood);
          }}
          sx={styles.overflowMenuItemDangerStyles}
        >
          <Trash2 size={14} />
          Xóa món
        </MenuItem>
      </Menu>

      {/* ── Dialogs / Drawers ──────────────────────────────── */}
      <FoodFormDialog
        errors={state.formErrors}
        formData={state.formData}
        isSubmitting={isSubmitting}
        mode={state.formMode}
        open={state.isFormOpen}
        onChange={setFormField}
        onClose={closeFormDialog}
        onSubmit={() => void submitFoodForm()}
      />

      <DeleteFoodDialog
        food={state.deleteTarget}
        isDeleting={isDeleting}
        open={state.isDeleteOpen}
        onClose={closeDeleteDialog}
        onConfirm={() => void confirmDeleteFood()}
      />

      <FoodDetailDrawer
        actionFoodId={actionFoodId}
        food={state.detailFood}
        isLoading={isDetailLoading}
        open={state.isDetailOpen}
        onClose={closeDetailDrawer}
        onDelete={openDeleteDialog}
        onEdit={openEditDialog}
        onRebuildEmbedding={(food) => void handleRebuildEmbedding(food)}
        onRebuildKeys={(food) => void handleRebuildKeys(food)}
      />
    </Box>
  );
}
