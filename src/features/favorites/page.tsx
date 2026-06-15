/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowLeft,
  ExternalLink,
  Heart,
  HeartOff,
  NotebookPen,
  Pencil,
  RefreshCw,
  Search,
  Star,
  SortAsc,
  SortDesc,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";

import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Image } from "@/shared/components/ui/image/index";
import { Typography } from "@/shared/components/ui/typography/index";

import { styles } from "./_styles";
import { useFavorites } from "./_use-favorites";
import type { FavoriteFoodItem } from "./_interface";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=900";

const SORT_OPTIONS = [
  { value: "created_at", label: "Mới thêm nhất" },
  { value: "name", label: "Tên món" },
  { value: "rating", label: "Đánh giá" },
] as const;

// ─── Star display ────────────────────────────────────────────────────────────

function StarDisplay({ rating }: { rating: number | null }) {
  if (!rating) return null;
  return (
    <Box sx={styles.starsStyles}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < rating ? "#FA914C" : "none"}
          color={i < rating ? "#FA914C" : "#A8A29E"}
        />
      ))}
    </Box>
  );
}

// ─── Star picker ─────────────────────────────────────────────────────────────

function StarPicker({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number | null) => void;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1;
        const filled = value != null && star <= value;
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(value === star ? null : star)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}
          >
            <Star
              size={24}
              fill={filled ? "#FA914C" : "none"}
              color={filled ? "#FA914C" : "#A8A29E"}
            />
          </button>
        );
      })}
      {value != null && (
        <Typography
          as="span"
          sx={{ fontSize: "0.75rem", color: "var(--muted-foreground)", ml: "0.25rem" }}
        >
          {value}/5
        </Typography>
      )}
    </Box>
  );
}

// ─── Skeleton loading ─────────────────────────────────────────────────────────

function FavoritesSkeleton() {
  return (
    <Box sx={styles.gridStyles}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Box key={i} sx={styles.skeletonCardStyles}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ aspectRatio: "16/9", borderRadius: "12px", mb: 1.5 }}
          />
          <Box sx={{ px: 0.5, display: "flex", flexDirection: "column", gap: 1 }}>
            <Skeleton variant="text" animation="wave" width="72%" height={18} />
            <Skeleton variant="text" animation="wave" width="44%" height={14} />
            <Box sx={{ display: "flex", gap: 0.75, mt: 0.5 }}>
              <Skeleton variant="rounded" animation="wave" height={22} width={60} sx={{ borderRadius: "999px" }} />
              <Skeleton variant="rounded" animation="wave" height={22} width={48} sx={{ borderRadius: "999px" }} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

// ─── Food card ───────────────────────────────────────────────────────────────

function FavoriteCard({
  item,
  isActioning,
  onEdit,
  onRemove,
  onViewDetail,
}: {
  item: FavoriteFoodItem;
  isActioning: boolean;
  onEdit: (item: FavoriteFoodItem) => void;
  onRemove: (item: FavoriteFoodItem) => void;
  onViewDetail: (item: FavoriteFoodItem) => void;
}) {
  const { food } = item;
  const tags = [...food.taste_profile, ...food.soft_tags].slice(0, 3);

  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={() => onViewDetail(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onViewDetail(item);
        }
      }}
      sx={[styles.cardStyles, { cursor: "pointer" }]}
    >
      <Image
        src={food.img_url ?? FALLBACK_IMAGE}
        alt={food.name}
        sx={styles.cardImageStyles}
        onError={(e) => {
          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
        }}
      />

      <Box sx={styles.cardBodyStyles}>
        <Typography as="p" sx={styles.cardNameStyles}>
          {food.name}
        </Typography>

        {food.meal_context.length > 0 && (
          <Typography as="p" sx={styles.cardMealContextStyles}>
            {food.meal_context.join(" · ")}
          </Typography>
        )}
        {tags.length > 0 && (
          <Box sx={styles.cardTagsStyles}>
            {tags.map((tag) => (
              <Box component="span" key={tag} sx={styles.cardTagStyles}>
                {tag}
              </Box>
            ))}
          </Box>
        )}

        <Box sx={styles.cardFooterStyles}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0 }}>
            <StarDisplay rating={item.rating} />
            {item.notes && (
              <Typography as="span" sx={styles.notesStyles} title={item.notes}>
                {item.notes}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: "0.25rem", flexShrink: 0 }}>
            <Button
              type="button"
              variant="ghost"
              sx={styles.cardActionButtonStyles}
              title="Chỉnh sửa ghi chú"
              disabled={isActioning}
              onClick={(e) => { e.stopPropagation(); onEdit(item); }}
            >
              <Pencil size={13} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              sx={styles.cardRemoveButtonStyles}
              title="Xoá khỏi yêu thích"
              disabled={isActioning}
              onClick={(e) => { e.stopPropagation(); void onRemove(item); }}
            >
              <Trash2 size={13} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Detail drawer ───────────────────────────────────────────────────────────

function FavoriteDetailDrawer({
  item,
  isActioning,
  onClose,
  onEdit,
  onRemove,
}: {
  item: FavoriteFoodItem | null;
  isActioning: boolean;
  onClose: () => void;
  onEdit: (item: FavoriteFoodItem) => void;
  onRemove: (item: FavoriteFoodItem) => Promise<void>;
}) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const food = item?.food;
  const tasteTags = [
    ...(food?.taste_profile ?? []),
    ...(food?.occasion_context ?? []),
  ];

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "right"}
      open={Boolean(item)}
      onClose={onClose}
      slotProps={{ paper: { sx: styles.drawerPaperStyles(isMobile) } }}
    >
      {food && item && (
        <>
          {/* ── Hero image ── */}
          <Box sx={styles.drawerHeroStyles}>
            <img
              src={food.img_url ?? FALLBACK_IMAGE}
              alt={food.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
            />
            <Box sx={styles.drawerHeroOverlayStyles} />
            <IconButton
              aria-label="Đóng"
              size="small"
              onClick={onClose}
              sx={styles.drawerCloseButtonStyles}
            >
              <X size={16} />
            </IconButton>
            <Box sx={styles.drawerTitleWrapStyles}>
              <Typography as="p" sx={styles.drawerNameStyles}>
                {food.name}
              </Typography>
              {food.meal_context.length > 0 && (
                <Typography as="p" sx={styles.drawerSubtitleStyles}>
                  {food.meal_context.join(" · ")}
                </Typography>
              )}
            </Box>
          </Box>

          {/* ── Scrollable content ── */}
          <Box sx={styles.drawerContentStyles}>

            {/* User rating */}
            {item.rating != null && (
              <Box sx={styles.drawerSectionStyles}>
                <Typography as="p" sx={styles.drawerSectionLabelStyles}>
                  Mức độ yêu thích
                </Typography>
                <Box sx={styles.drawerRatingRowStyles}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < item.rating! ? "#FA914C" : "none"}
                      color={i < item.rating! ? "#FA914C" : "#A8A29E"}
                    />
                  ))}
                  <Typography as="span" sx={styles.drawerRatingLabelStyles}>
                    {item.rating}/5
                  </Typography>
                </Box>
              </Box>
            )}

            {/* User notes */}
            {item.notes && (
              <Box sx={styles.drawerSectionStyles}>
                <Typography as="p" sx={styles.drawerSectionLabelStyles}>
                  Ghi chú cá nhân
                </Typography>
                <Typography as="p" sx={[styles.drawerBodyTextStyles, { fontStyle: "italic" }]}>
                  {item.notes}
                </Typography>
              </Box>
            )}

            {/* Description */}
            {food.description && (
              <Box sx={styles.drawerSectionStyles}>
                <Typography as="p" sx={styles.drawerSectionLabelStyles}>
                  Mô tả
                </Typography>
                <Typography as="p" sx={styles.drawerBodyTextStyles}>
                  {food.description}
                </Typography>
              </Box>
            )}

            {/* Taste & occasion tags */}
            {tasteTags.length > 0 && (
              <Box sx={styles.drawerSectionStyles}>
                <Typography as="p" sx={styles.drawerSectionLabelStyles}>
                  Khẩu vị & dịp ăn
                </Typography>
                <Box sx={styles.drawerTagsWrapStyles}>
                  {tasteTags.map((tag) => (
                    <Box component="span" key={tag} sx={styles.cardTagStyles}>
                      {tag}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Core ingredients */}
            {food.core_ingredients.length > 0 && (
              <Box sx={styles.drawerSectionStyles}>
                <Typography as="p" sx={styles.drawerSectionLabelStyles}>
                  Nguyên liệu chính
                </Typography>
                <Box sx={styles.drawerTagsWrapStyles}>
                  {food.core_ingredients.map((ing) => (
                    <Box component="span" key={ing} sx={styles.cardTagStyles}>
                      {ing}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Soft tags */}
            {food.soft_tags.length > 0 && (
              <Box sx={styles.drawerSectionStyles}>
                <Typography as="p" sx={styles.drawerSectionLabelStyles}>
                  Đặc điểm
                </Typography>
                <Box sx={styles.drawerTagsWrapStyles}>
                  {food.soft_tags.map((tag) => (
                    <Box component="span" key={tag} sx={styles.cardTagStyles}>
                      {tag}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Raw ingredients */}
            {food.raw_ingredients.length > 0 && (
              <Box sx={styles.drawerSectionStyles}>
                <Typography as="p" sx={styles.drawerSectionLabelStyles}>
                  Định lượng nguyên liệu
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  {food.raw_ingredients.map((line, idx) => (
                    <Typography key={idx} as="p" sx={[styles.drawerBodyTextStyles, { fontSize: "0.82rem" }]}>
                      • {line}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}

            {/* Cooking steps */}
            {food.raw_instructions && (
              <Box sx={styles.drawerSectionStyles}>
                <Typography as="p" sx={styles.drawerSectionLabelStyles}>
                  Hướng dẫn nấu
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                  {food.raw_instructions
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((step, idx) => (
                      <Box key={idx} sx={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
                        <Box
                          component="span"
                          sx={{
                            flexShrink: 0,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            fontSize: 11,
                            fontWeight: 800,
                            mt: "1px",
                            background: "linear-gradient(135deg, #FF8A1F 0%, #D9480F 100%)",
                            color: "#fff",
                          }}
                        >
                          {idx + 1}
                        </Box>
                        <Typography as="p" sx={[styles.drawerBodyTextStyles, { flex: 1 }]}>
                          {step}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Box>
            )}
          </Box>

          {/* ── Sticky action footer ── */}
          <Box sx={styles.drawerActionsStyles}>
            <Box
              component="button"
              onClick={isActioning ? undefined : () => { onEdit(item); onClose(); }}
              sx={[
                styles.drawerEditButtonStyles,
                { opacity: isActioning ? 0.5 : 1, pointerEvents: isActioning ? "none" : "auto" },
              ]}
            >
              <NotebookPen size={15} />
              Chỉnh ghi chú
            </Box>
            <Box
              component="button"
              onClick={isActioning ? undefined : async () => { await onRemove(item); onClose(); }}
              sx={[
                styles.drawerRemoveButtonStyles,
                { opacity: isActioning ? 0.5 : 1, pointerEvents: isActioning ? "none" : "auto" },
              ]}
            >
              <HeartOff size={15} />
              Xoá yêu thích
            </Box>
          </Box>
        </>
      )}
    </Drawer>
  );
}

// ─── Edit dialog ─────────────────────────────────────────────────────────────

function EditDialog({
  editNotes,
  editRating,
  isActioning,
  item,
  onClose,
  onSave,
  onNotesChange,
  onRatingChange,
}: {
  editNotes: string;
  editRating: number | null;
  isActioning: boolean;
  item: FavoriteFoodItem | null;
  onClose: () => void;
  onSave: () => void;
  onNotesChange: (v: string) => void;
  onRatingChange: (v: number | null) => void;
}) {
  return (
    <Dialog
      open={Boolean(item)}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: styles.dialogPaperStyles } }}
    >
      <DialogTitle sx={styles.dialogTitleStyles}>
        <Box sx={styles.dialogIconStyles}>
          <NotebookPen size={17} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography as="p" sx={styles.dialogTitleTextStyles}>
            Ghi chú món yêu thích
          </Typography>
          {item && (
            <Typography as="p" sx={styles.dialogFoodNameStyles}>
              {item.food.name}
            </Typography>
          )}
        </Box>
      </DialogTitle>
      <DialogContent sx={styles.dialogBodyStyles}>
        <Box>
          <Typography as="p" sx={styles.dialogLabelStyles}>
            Mức độ yêu thích
          </Typography>
          <StarPicker value={editRating} onChange={onRatingChange} />
        </Box>
        <TextField
          label="Ghi chú cá nhân"
          multiline
          rows={3}
          fullWidth
          value={editNotes}
          onChange={(e) => onNotesChange(e.target.value.slice(0, 500))}
          placeholder="Ví dụ: Ăn trưa hợp, vị vừa miệng..."
          size="small"
          sx={styles.dialogTextFieldStyles}
          slotProps={{ htmlInput: { maxLength: 500 } }}
          helperText={`${editNotes.length}/500`}
        />
      </DialogContent>
      <DialogActions sx={styles.dialogActionsStyles}>
        <Button type="button" variant="ghost" onClick={onClose} sx={styles.cancelBtnStyles}>
          Huỷ
        </Button>
        <Button
          type="button"
          variant="default"
          disabled={isActioning}
          onClick={onSave}
          sx={styles.saveBtnStyles}
        >
          Lưu ghi chú
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function FavoritesPage() {
  const {
    actionId,
    closeDetail,
    closeEdit,
    detailItem,
    editNotes,
    editRating,
    handleRemove,
    handleSaveEdit,
    isLoading,
    loadFavorites,
    openDetail,
    openEdit,
    setEditNotes,
    setEditRating,
    setPage,
    setSearchTerm,
    setSortBy,
    state,
    toggleRatedOnly,
    toggleSortOrder,
  } = useFavorites();

  return (
    <Box sx={styles.pageShellStyles}>

      {/* ── Sticky pill header — matches profile controlHeaderStyles ── */}
      <Box sx={styles.controlHeaderStyles}>
        <Box sx={styles.controlHeaderInnerStyles}>

          {/* Back */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => history.back()}
            sx={styles.backButtonStyles}
          >
            <ArrowLeft size={20} />
          </Button>

          {/* Title + count */}
          <Box sx={styles.titleGroupStyles}>
            <Heart size={20} color="#FA914C" fill="rgba(250,145,76,0.22)" />
            <Typography as="h1" sx={styles.titleStyles}>
              Món yêu thích
            </Typography>
            {!isLoading && (
              <Box component="span" sx={styles.countBadgeStyles}>
                {state.total.toLocaleString("vi-VN")} món
              </Box>
            )}
          </Box>

          {/* Actions */}
          <Box sx={styles.headerActionsStyles}>
            <Button
              type="button"
              variant="ghost"
              sx={styles.iconButtonStyles}
              onClick={() => void loadFavorites()}
              aria-label="Làm mới"
            >
              <RefreshCw size={17} />
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ── Page body ── */}
      <Box sx={styles.containerStyles}>

        {/* ── Toolbar card ── */}
        <Box sx={styles.toolbarCardStyles}>
          <TextField
            size="small"
            value={state.searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên món..."
            sx={styles.searchFieldStyles}
            slotProps={{
              input: {
                startAdornment: (
                  <Search size={14} style={{ marginRight: 6, flexShrink: 0, color: "#D9480F" }} />
                ),
              },
            }}
          />

          <Select
            size="small"
            value={state.sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof state.sortBy)}
            sx={styles.sortSelectStyles}
          >
            {SORT_OPTIONS.map((o) => (
              <MenuItem key={o.value} value={o.value} sx={{ fontSize: 13, fontWeight: 700 }}>
                {o.label}
              </MenuItem>
            ))}
          </Select>

          <Button
            type="button"
            variant="ghost"
            sx={styles.sortOrderButtonStyles}
            title={state.sortOrder === "desc" ? "Giảm dần" : "Tăng dần"}
            onClick={toggleSortOrder}
          >
            {state.sortOrder === "desc" ? <SortDesc size={16} /> : <SortAsc size={16} />}
          </Button>

          <Box
            component="button"
            onClick={toggleRatedOnly}
            sx={styles.filterChipStyles(state.ratedOnly)}
          >
            <Star size={13} />
            Đã đánh giá
          </Box>
        </Box>

        {/* ── Content ── */}
        {isLoading ? (
          <FavoritesSkeleton />
        ) : state.items.length === 0 ? (
          <Box sx={styles.emptyStateStyles}>
            <Box sx={styles.emptyIconStyles}>
              <HeartOff size={26} />
            </Box>
            <Typography as="p" sx={styles.emptyTitleStyles}>
              {state.searchTerm || state.ratedOnly
                ? "Không tìm thấy món nào"
                : "Chưa có món yêu thích"}
            </Typography>
            <Typography as="p" sx={styles.emptySubtitleStyles}>
              {state.searchTerm || state.ratedOnly
                ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
                : "Mở trang tra cứu món ăn và nhấn ♥ để lưu món vào đây"}
            </Typography>
            {!(state.searchTerm || state.ratedOnly) && (
              <Box component={Link} href="/search" sx={styles.emptyLinkStyles}>
                <ExternalLink size={15} />
                Khám phá món ăn
              </Box>
            )}
          </Box>
        ) : (
          <>
            <Box sx={styles.gridStyles}>
              {state.items.map((item) => (
                <FavoriteCard
                  key={item.id}
                  item={item}
                  isActioning={actionId === item.food_id}
                  onEdit={openEdit}
                  onRemove={handleRemove}
                  onViewDetail={openDetail}
                />
              ))}
            </Box>

            {/* Pagination */}
            {state.total > state.rowsPerPage && (
              <Box sx={styles.paginationStyles}>
                <Button
                  type="button"
                  variant="ghost"
                  disabled={state.page === 0}
                  onClick={() => setPage(state.page - 1)}
                  sx={styles.paginationButtonStyles}
                >
                  ← Trước
                </Button>
                <Typography as="span" sx={styles.paginationCountStyles}>
                  {state.page + 1} / {Math.ceil(state.total / state.rowsPerPage)}
                </Typography>
                <Button
                  type="button"
                  variant="ghost"
                  disabled={(state.page + 1) * state.rowsPerPage >= state.total}
                  onClick={() => setPage(state.page + 1)}
                  sx={styles.paginationButtonStyles}
                >
                  Sau →
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>

      {/* ── Detail drawer ── */}
      <FavoriteDetailDrawer
        item={detailItem}
        isActioning={actionId === detailItem?.food_id}
        onClose={closeDetail}
        onEdit={(item) => { openEdit(item); }}
        onRemove={handleRemove}
      />

      {/* ── Edit dialog ── */}
      <EditDialog
        item={state.editingItem}
        editRating={editRating}
        editNotes={editNotes}
        isActioning={actionId === state.editingItem?.food_id}
        onClose={closeEdit}
        onSave={handleSaveEdit}
        onRatingChange={setEditRating}
        onNotesChange={setEditNotes}
      />

    </Box>
  );
}
