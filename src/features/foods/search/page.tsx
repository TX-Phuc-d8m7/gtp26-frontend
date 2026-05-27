/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Collapse,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  AlertCircle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Clock3,
  Search,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Utensils,
  X,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { AppLoading } from "@/shared/components/ui/app-loading";

import type {
  ApiFilterOptions,
  ApiFoodCategory,
  ApiFoodDetail,
  FoodSearchUIProps,
  RankedFood,
  SearchSuggestion,
} from "./_interface";
import { styles } from "./_styles";
import { useFoodSearch } from "./_use-food-search";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=900";

const suggestionTypeLabels: Record<SearchSuggestion["type"], string> = {
  dish: "Món ăn",
  tag: "Thẻ gợi ý",
  ingredient: "Nguyên liệu",
};

const GROUP_ORDER: Array<keyof ApiFilterOptions> = [
  "meal_context",
  "occasion_context",
  "taste_profile",
  "dish_type",
  "diet_style",
  "nutrition",
  "texture",
];

const GROUP_LABELS: Record<keyof ApiFilterOptions, string> = {
  meal_context: "Bữa ăn",
  occasion_context: "Dịp ăn",
  taste_profile: "Khẩu vị",
  dish_type: "Cách chế biến",
  diet_style: "Phong cách ăn",
  nutrition: "Dinh dưỡng",
  texture: "Kết cấu / Nhiệt độ",
};

function FilterPanel({
  filterOptions,
  selectedTags,
  onToggleTag,
}: {
  filterOptions: ApiFilterOptions | null;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}) {
  if (!filterOptions) return null; // still loading options

  return (
    <Box sx={styles.filterPanelStyles}>
      {GROUP_ORDER.map((key, index) => {
        const options = filterOptions[key];
        return (
          <Box key={key}>
            {index > 0 && <Divider sx={{ my: 1.5, opacity: 0.5 }} />}
            <Box sx={styles.filterGroupStyles}>
              <Typography sx={styles.filterGroupLabelStyles}>
                {GROUP_LABELS[key]}
              </Typography>
              <Box sx={styles.filterOptionsGridStyles}>
                {options.map((option) => {
                  const isSelected = selectedTags.includes(option);
                  return (
                    <Box
                      key={option}
                      component="label"
                      sx={styles.filterOptionItemStyles(isSelected)}
                    >
                      <Checkbox
                        checked={isSelected}
                        onChange={() => onToggleTag(option)}
                        size="small"
                        sx={{
                          p: 0.5,
                          color: "inherit",
                          "&.Mui-checked": { color: "#ea580c" },
                        }}
                      />
                      <Typography sx={{ fontSize: 13, lineHeight: 1.4 }}>
                        {option}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default function FoodSearchUI(props: FoodSearchUIProps = {}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const shouldReduceMotion = useReducedMotion();
  const isEmbedded = Boolean(props.onClose);
  const shouldSkipMountMotion = Boolean(shouldReduceMotion || isEmbedded);
  const {
    query,
    selectedCategory,
    selectedTags,
    selectedFood,
    filterOptions,
    foodCategories,
    activeFilterCount,
    rankedFoods,
    suggestions,
    isSuggestionOpen,
    isLoading,
    isLoadingMore,
    isCategoryLoading,
    isDetailLoading,
    hasEverLoaded,
    error,
    total,
    hasMore,
    clearSearch,
    clearFilters,
    handleBack,
    handleLoadMore,
    selectSuggestion,
    setIsSuggestionOpen,
    setQuery,
    setSelectedFood,
    toggleCategory,
    toggleTag,
  } = useFoodSearch(props);

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // First visit: show AppLoading until the very first fetch resolves
  const showSystemLoading = isLoading && !hasEverLoaded;
  const hasActiveSearch =
    Boolean(query.trim()) ||
    selectedTags.length > 0 ||
    Boolean(selectedCategory);
  const suggestionGroups = (
    ["dish", "tag", "ingredient"] as SearchSuggestion["type"][]
  )
    .map((type) => ({
      type,
      items: suggestions.filter((suggestion) => suggestion.type === type),
    }))
    .filter((group) => group.items.length > 0);

  if (showSystemLoading) {
    return (
      <Box sx={styles.rootStyles(isEmbedded)}>
        <AppLoading
          title="Đang khám phá thực đơn"
          description="Đang tải danh sách món ăn Đà Nẵng, lọc theo khẩu vị và chuẩn bị gợi ý phù hợp cho bạn."
          sx={{
            minHeight: isEmbedded ? "60vh" : "100dvh",
            background: "transparent",
            ".dark &": { background: "transparent" },
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={styles.rootStyles(isEmbedded)}>
      <Box sx={styles.shellStyles}>
        <Box sx={styles.topBarStyles}>
          <IconButton
            aria-label="Quay lại"
            onClick={handleBack}
            sx={styles.backButtonStyles}
          >
            <ArrowLeft size={20} />
          </IconButton>
        </Box>

        <Paper
          component={motion.section}
          elevation={0}
          initial={shouldSkipMountMotion ? false : { opacity: 0, y: 14 }}
          animate={shouldSkipMountMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          sx={styles.heroPanelStyles}
        >
          <Box sx={styles.searchPanelHeaderStyles}>
            <Box sx={styles.searchPanelCopyStyles}>
              <Typography sx={styles.searchPanelEyebrowStyles}>
                <Clock3 size={15} />
                Food discovery nhanh
              </Typography>
              <Box sx={styles.titleBlockStyles}>
                <Typography component="h1" sx={styles.titleStyles}>
                  Hôm nay bạn muốn ăn gì?
                </Typography>
                <Typography sx={styles.subtitleStyles}>
                  Tìm theo tên món, nguyên liệu, khẩu vị hoặc nhu cầu ăn uống.
                  Kết quả được xếp hạng theo mức độ phù hợp với truy vấn của
                  bạn.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={styles.searchAreaStyles}>
            <TextField
              fullWidth
              value={query}
              placeholder="Ví dụ: mì quảng, ít dầu, hải sản, tôm…"
              onBlur={() => {
                setTimeout(() => setIsSuggestionOpen(false), 120);
              }}
              onChange={(event) => {
                setQuery(event.target.value);
                setIsSuggestionOpen(true);
              }}
              onFocus={() => setIsSuggestionOpen(true)}
              sx={styles.searchInputStyles}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={20} />
                    </InputAdornment>
                  ),
                  endAdornment: hasActiveSearch ? (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        onClick={clearSearch}
                        variant="contained"
                        sx={{
                          mr: 1,
                          color: "#FFFFFF",
                          backgroundColor: "#D9480F",
                          fontWeight: "bold",
                        }}
                      >
                        Xóa
                      </Button>
                    </InputAdornment>
                  ) : null,
                },
                htmlInput: {
                  "aria-label": "Tìm món ăn Đà Nẵng",
                  autoComplete: "off",
                  name: "food-search-query",
                },
              }}
            />

            <AnimatePresence>
              {isSuggestionOpen && suggestions.length > 0 ? (
                <Paper
                  component={motion.div}
                  elevation={0}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={
                    shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  onMouseDown={(event) => event.preventDefault()}
                  sx={styles.suggestionPaperStyles}
                >
                  {suggestionGroups.map((group) => (
                    <Box key={group.type} sx={styles.suggestionGroupStyles}>
                      <Typography sx={styles.suggestionGroupLabelStyles}>
                        {suggestionTypeLabels[group.type]}
                      </Typography>
                      {group.items.map((suggestion) => (
                        <SuggestionItem
                          key={suggestion.id}
                          suggestion={suggestion}
                          onSelect={selectSuggestion}
                        />
                      ))}
                    </Box>
                  ))}
                </Paper>
              ) : null}
            </AnimatePresence>
          </Box>

          <CategoryBrowser
            categories={foodCategories}
            isLoading={isCategoryLoading}
            selectedCategory={selectedCategory}
            onSelectCategory={toggleCategory}
          />

          {/* Filter toggle button row */}
          <Box sx={styles.filterBarStyles}>
            <Button
              onClick={() => setIsFilterPanelOpen((p) => !p)}
              startIcon={<SlidersHorizontal size={16} />}
              endIcon={
                isFilterPanelOpen ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )
              }
              sx={styles.filterToggleButtonStyles(
                isFilterPanelOpen,
                activeFilterCount > 0,
              )}
            >
              Bộ lọc{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </Button>
            {activeFilterCount > 0 && (
              <Button
                onClick={clearFilters}
                sx={styles.filterClearAllButtonStyles}
              >
                Xóa bộ lọc
              </Button>
            )}
          </Box>

          {/* Collapsible filter panel */}
          <Collapse in={isFilterPanelOpen} timeout={200}>
            <FilterPanel
              filterOptions={filterOptions}
              selectedTags={selectedTags}
              onToggleTag={toggleTag}
            />
          </Collapse>
        </Paper>

        <Box sx={styles.statusRowStyles}>
          {error ? (
            <Typography
              sx={{ ...styles.resultCountStyles, color: "error.main" }}
            >
              {error}
            </Typography>
          ) : isLoading ? (
            <Skeleton variant="text" animation="wave" width={120} height={24} />
          ) : (
            <Typography sx={styles.resultCountStyles}>
              {total > rankedFoods.length
                ? `${rankedFoods.length} / ${total} món`
                : `${rankedFoods.length} món phù hợp`}
            </Typography>
          )}
          <Typography sx={styles.helperTextStyles}>
            Chạm vào một món để xem nguyên liệu, tag và hướng dẫn nấu.
          </Typography>
        </Box>

        {isLoading ? (
          <Box sx={styles.gridStyles}>
            {Array.from({ length: 9 }).map((_, i) => (
              <FoodCardSkeleton key={i} />
            ))}
          </Box>
        ) : rankedFoods.length > 0 ? (
          <>
            <Box sx={styles.gridStyles}>
              <AnimatePresence
                mode="popLayout"
                initial={!shouldSkipMountMotion}
              >
                {rankedFoods.map((result, index) => (
                  <Box
                    key={result.food.id}
                    component={motion.div}
                    layout
                    initial={
                      shouldSkipMountMotion ? false : { opacity: 0, y: 14 }
                    }
                    animate={
                      shouldSkipMountMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    exit={
                      shouldSkipMountMotion ? undefined : { opacity: 0, y: 10 }
                    }
                    transition={{
                      duration: 0.18,
                      delay: shouldSkipMountMotion
                        ? 0
                        : Math.min(index * 0.025, 0.12),
                      ease: "easeOut",
                    }}
                  >
                    <FoodResultCard
                      result={result}
                      onSelect={() => setSelectedFood(result.food)}
                    />
                  </Box>
                ))}
              </AnimatePresence>
            </Box>

            {/* Load More */}
            <LoadMoreRow
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
              remaining={total - rankedFoods.length}
              onLoadMore={handleLoadMore}
            />
          </>
        ) : (
          <EmptyState hasError={Boolean(error)} onClear={clearSearch} />
        )}
      </Box>

      <FoodDetailDialog
        food={selectedFood}
        fullScreen={isMobile}
        isLoading={isDetailLoading}
        onClose={() => setSelectedFood(null)}
      />
    </Box>
  );
}

function CategoryBrowser({
  categories,
  isLoading,
  selectedCategory,
  onSelectCategory,
}: {
  categories: ApiFoodCategory[];
  isLoading: boolean;
  selectedCategory: string | null;
  onSelectCategory: (categoryKey: string | null) => void;
}) {
  if (isLoading) {
    return (
      <Box sx={styles.categorySectionStyles}>
        <Box sx={styles.categoryHeaderStyles}>
          <Skeleton variant="text" animation="wave" width={150} height={22} />
          <Skeleton variant="text" animation="wave" width={96} height={18} />
        </Box>
        <Box sx={styles.categoryRailStyles}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              animation="wave"
              width={index % 2 === 0 ? 132 : 104}
              height={44}
              sx={{ borderRadius: 999, flexShrink: 0 }}
            />
          ))}
        </Box>
      </Box>
    );
  }

  if (categories.length === 0) return null;

  const totalCount = categories.reduce(
    (sum, category) => sum + category.count,
    0,
  );

  return (
    <Box sx={styles.categorySectionStyles}>
      <Box sx={styles.categoryHeaderStyles}>
        <Typography sx={styles.categoryTitleStyles}>
          Duyệt theo nhóm nguyên liệu
        </Typography>
        <Typography sx={styles.categoryMetaStyles}>
          {categories.length} nhóm
        </Typography>
      </Box>
      <Box sx={styles.categoryRailStyles}>
        <Box
          component="button"
          type="button"
          onClick={() => onSelectCategory(null)}
          sx={styles.categoryPillStyles(!selectedCategory)}
        >
          <Typography sx={styles.categoryPillLabelStyles}>Tất cả</Typography>
          <Typography sx={styles.categoryPillCountStyles}>
            {totalCount} món
          </Typography>
        </Box>

        {categories.map((category) => {
          const isSelected = selectedCategory === category.key;
          return (
            <Box
              key={category.key}
              component="button"
              type="button"
              onClick={() => onSelectCategory(category.key)}
              sx={styles.categoryPillStyles(isSelected)}
            >
              <Typography sx={styles.categoryPillLabelStyles}>
                {category.label}
              </Typography>
              <Typography sx={styles.categoryPillCountStyles}>
                {category.count} món
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function SuggestionItem({
  suggestion,
  onSelect,
}: {
  suggestion: SearchSuggestion;
  onSelect: (suggestion: SearchSuggestion) => void;
}) {
  return (
    <Box
      component="button"
      type="button"
      onClick={() => onSelect(suggestion)}
      sx={styles.suggestionItemStyles}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          gap: 1.25,
        }}
      >
        {getSuggestionIcon(suggestion.type)}
        <Typography sx={{ fontWeight: 700 }}>{suggestion.label}</Typography>
      </Box>
      <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
        {suggestionTypeLabels[suggestion.type]}
      </Typography>
    </Box>
  );
}

function FoodCardSkeleton() {
  return (
    <Card elevation={0} sx={styles.cardStyles}>
      {/* Image area */}
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          borderRadius: "12px 12px 0 0",
          height: 180,
          width: "100%",
        }}
      />
      <CardContent sx={styles.cardContentStyles}>
        {/* Food name */}
        <Skeleton variant="text" animation="wave" width="65%" height={28} />
        {/* Description — 2 lines */}
        <Skeleton
          variant="text"
          animation="wave"
          width="100%"
          height={18}
          sx={{ mt: 0.5 }}
        />
        <Skeleton variant="text" animation="wave" width="80%" height={18} />
        {/* Tag chips */}
        <Box sx={{ display: "flex", gap: 0.75, mt: 1 }}>
          <Skeleton
            variant="rounded"
            animation="wave"
            width={56}
            height={24}
            sx={{ borderRadius: 99 }}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            width={72}
            height={24}
            sx={{ borderRadius: 99 }}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            width={48}
            height={24}
            sx={{ borderRadius: 99 }}
          />
        </Box>
        {/* Meta line */}
        <Skeleton
          variant="text"
          animation="wave"
          width="55%"
          height={16}
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
}

function FoodResultCard({
  result,
  onSelect,
}: {
  result: RankedFood;
  onSelect: () => void;
}) {
  const { food, score } = result;
  const scoreLabel = score > 0 ? `${Math.min(99, score)}% hợp` : "Nên thử";
  const imageUrl = food.img_url ?? FALLBACK_IMAGE;

  return (
    <Card elevation={0} sx={styles.cardStyles}>
      <CardActionArea onClick={onSelect} sx={styles.cardActionStyles}>
        <Box sx={styles.cardMediaWrapStyles}>
          <CardMedia
            image={imageUrl}
            title={food.name}
            sx={styles.cardMediaStyles}
          />
          <Box sx={styles.cardMediaOverlayStyles}>
            <Box sx={styles.scoreBadgeStyles}>{scoreLabel}</Box>
          </Box>
        </Box>
        <CardContent sx={styles.cardContentStyles}>
          <Box sx={styles.cardHeaderStyles}>
            <Typography component="h2" sx={styles.foodNameStyles}>
              {food.name}
            </Typography>
          </Box>

          <Typography sx={styles.descriptionStyles}>
            {food.description}
          </Typography>

          <Box sx={styles.chipWrapStyles}>
            {food.soft_tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={styles.softTagStyles}
              />
            ))}
            {food.meal_context.slice(0, 1).map((ctx) => (
              <Chip
                key={ctx}
                label={ctx}
                size="small"
                sx={styles.softTagStyles}
              />
            ))}
          </Box>

          {food.taste_profile.length > 0 ? (
            <Typography sx={styles.helperTextStyles}>
              Vị: {food.taste_profile.join(", ")}
            </Typography>
          ) : null}

          {food.core_ingredients.length > 0 ? (
            <Typography sx={styles.helperTextStyles}>
              NL chính: {food.core_ingredients.slice(0, 3).join(", ")}
              {food.core_ingredients.length > 3 ? "…" : ""}
            </Typography>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function FoodDetailDialog({
  food,
  fullScreen,
  isLoading,
  onClose,
}: {
  food: ApiFoodDetail | null;
  fullScreen: boolean;
  isLoading: boolean;
  onClose: () => void;
}) {
  const isOpen = Boolean(food) || isLoading;
  if (!isOpen) return null;

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={onClose}
      slotProps={{ paper: { sx: styles.dialogPaperStyles } }}
    >
      <DialogContent sx={{ padding: 0 }}>
        {isLoading || !food ? (
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              height: 320,
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={styles.detailHeroStyles}>
              <Box
                component="img"
                src={food.img_url ?? FALLBACK_IMAGE}
                alt={food.name}
                width={960}
                height={540}
                sx={styles.detailImageStyles}
              />
              <Box sx={styles.detailOverlayStyles} />
              <IconButton
                aria-label="Đóng"
                onClick={onClose}
                sx={styles.closeButtonStyles}
              >
                <X size={20} />
              </IconButton>
              <Box sx={styles.detailTitleWrapStyles}>
                <Typography component="h2" sx={styles.titleStyles}>
                  {food.name}
                </Typography>
                {food.meal_context.length > 0 ? (
                  <Typography sx={styles.subtitleStyles}>
                    {food.meal_context.join(" · ")}
                  </Typography>
                ) : null}
              </Box>
            </Box>

            <Box sx={styles.detailContentStyles}>
              <Typography sx={styles.descriptionStyles}>
                {food.description}
              </Typography>

              {/* Taste & occasion tags */}
              {food.taste_profile.length > 0 ||
              food.occasion_context.length > 0 ? (
                <Box sx={styles.detailSectionStyles}>
                  <Typography sx={{ fontWeight: 800, marginBottom: 1 }}>
                    Khẩu vị & dịp ăn
                  </Typography>
                  <Box sx={styles.chipWrapStyles}>
                    {[...food.taste_profile, ...food.occasion_context].map(
                      (tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={styles.softTagStyles}
                        />
                      ),
                    )}
                  </Box>
                </Box>
              ) : null}

              {/* Core ingredients */}
              {food.core_ingredients.length > 0 ? (
                <Box sx={styles.detailSectionStyles}>
                  <Typography sx={{ fontWeight: 800, marginBottom: 1 }}>
                    Nguyên liệu chính
                  </Typography>
                  <Box sx={styles.chipWrapStyles}>
                    {food.core_ingredients.map((ingredient) => (
                      <Chip
                        key={ingredient}
                        label={ingredient}
                        size="small"
                        sx={styles.softTagStyles}
                      />
                    ))}
                  </Box>
                </Box>
              ) : null}

              {/* Raw ingredients (full list with quantities) */}
              {food.raw_ingredients.length > 0 ? (
                <Box sx={styles.detailSectionStyles}>
                  <Typography sx={{ fontWeight: 800, marginBottom: 1 }}>
                    Định lượng nguyên liệu
                  </Typography>
                  <Stack spacing={0.5}>
                    {food.raw_ingredients.map((line, i) => (
                      <Typography
                        key={i}
                        sx={{ color: "text.secondary", fontSize: 14 }}
                      >
                        • {line}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              ) : null}

              {/* Soft tags */}
              {food.soft_tags.length > 0 ? (
                <Box sx={styles.detailSectionStyles}>
                  <Typography sx={{ fontWeight: 800, marginBottom: 1 }}>
                    Soft tags
                  </Typography>
                  <Box sx={styles.chipWrapStyles}>
                    {food.soft_tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={styles.softTagStyles}
                      />
                    ))}
                  </Box>
                </Box>
              ) : null}

              {/* Cooking instructions */}
              {food.raw_instructions ? (
                <Box sx={styles.detailSectionStyles}>
                  <Typography sx={{ fontWeight: 800, marginBottom: 1 }}>
                    Hướng dẫn nấu
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: 14,
                      lineHeight: 1.7,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {food.raw_instructions}
                  </Typography>
                </Box>
              ) : null}

              {/* Favorite status */}
              {food.is_favorite !== null && food.is_favorite !== undefined ? (
                <Box sx={styles.detailSectionStyles}>
                  <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                    {food.is_favorite
                      ? "❤️ Đã thêm vào yêu thích"
                      : "Chưa trong danh sách yêu thích"}
                  </Typography>
                </Box>
              ) : null}
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function LoadMoreRow({
  hasMore,
  isLoadingMore,
  remaining,
  onLoadMore,
}: {
  hasMore: boolean;
  isLoadingMore: boolean;
  remaining: number;
  onLoadMore: () => void;
}) {
  if (!hasMore && !isLoadingMore) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 3,
        mb: 1,
      }}
    >
      <Button
        onClick={onLoadMore}
        disabled={isLoadingMore}
        variant="outlined"
        size="large"
        startIcon={
          isLoadingMore ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            <ChevronDown size={18} />
          )
        }
        sx={{
          borderRadius: 99,
          fontWeight: 700,
          px: 4,
          py: 1.25,
          textTransform: "none",
          ".dark &": {
            borderColor: "rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.72)",
            "&:hover": {
              borderColor: "rgba(255,255,255,0.36)",
              backgroundColor: "rgba(255,255,255,0.06)",
            },
          },
          borderColor: "rgba(120,90,60,0.25)",
          color: "#78350f",
          "&:hover": {
            borderColor: "rgba(120,90,60,0.45)",
            backgroundColor: "rgba(120,90,60,0.06)",
          },
          "&.Mui-disabled": {
            opacity: 0.55,
          },
        }}
      >
        {isLoadingMore
          ? "Đang tải thêm…"
          : `Xem thêm ${remaining > 0 ? `${remaining} ` : ""}món`}
      </Button>
    </Box>
  );
}

function EmptyState({
  hasError,
  onClear,
}: {
  hasError: boolean;
  onClear: () => void;
}) {
  const IconComponent = hasError ? AlertCircle : Search;
  const color = hasError ? "#dc2626" : "#ea580c";
  const iconBg = hasError
    ? "rgba(220, 38, 38, 0.10)"
    : "rgba(234, 88, 12, 0.10)";
  const title = hasError
    ? "Không thể tải dữ liệu"
    : "Chưa tìm thấy món phù hợp";
  const description = hasError
    ? "Kiểm tra kết nối mạng hoặc thử lại sau."
    : "Hãy thử nhập tên món không dấu, một nguyên liệu chính hoặc bỏ bớt tag đang chọn.";

  return (
    <Box sx={styles.emptyStateStyles}>
      {/* Icon circle */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2.5 }}>
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: iconBg,
            borderRadius: "999px",
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <IconComponent size={32} style={{ color }} />
        </Box>
      </Box>

      {/* Title */}
      <Typography variant="h6" sx={{ color, fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          color: "text.secondary",
          maxWidth: 400,
          mb: 3,
          mx: "auto",
        }}
      >
        {description}
      </Typography>

      {/* Action */}
      <Button
        onClick={onClear}
        variant="outlined"
        sx={{
          borderColor: "rgba(15, 23, 42, 0.16)",
          color: "var(--foreground)",
          textTransform: "none",
          ".dark &": {
            borderColor: "rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.82)",
          },
        }}
      >
        Xóa bộ lọc
      </Button>
    </Box>
  );
}

function getSuggestionIcon(type: SearchSuggestion["type"]) {
  if (type === "dish") return <Utensils size={17} />;
  if (type === "tag") return <Tag size={17} />;
  return <Sparkles size={17} />;
}
