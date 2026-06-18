/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Box, Chip, Drawer } from "@mui/material";

import { fetchFoodDetail } from "@/features/foods/search/_api";
import {
  ChefHat,
  Clock3,
  Flame,
  Heart,
  MapPinned,
  MessageSquareText,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button/index";
import { Typography } from "@/shared/components/ui/typography/index";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import {
  FALLBACK_FOOD_IMAGE,
  resolveFoodImageUrl,
} from "@/features/chat/lib/food-image";

import type { FoodDetailDrawerProps, FoodDetailSectionProps } from ".";
import { styles } from ".";

const difficultyLabels = {
  easy: "Dễ",
  medium: "Trung bình",
  hard: "Khó",
} as const;

function uniqueItems(items: Array<string | undefined> = []) {
  return Array.from(
    new Set(items.map((item) => item?.trim()).filter(Boolean) as string[]),
  );
}

function FoodDetailSection({ items, title }: FoodDetailSectionProps) {
  const values = uniqueItems(items);
  if (!values.length) return null;

  return (
    <Box sx={styles.sectionCardStyles}>
      <Typography as="h3" sx={styles.sectionTitleStyles}>
        {title}
      </Typography>
      <Box sx={styles.chipWrapStyles}>
        {values.map((item) => (
          <Chip key={item} label={item} size="small" sx={styles.chipStyles} />
        ))}
      </Box>
    </Box>
  );
}

export default function FoodDetailDrawer({
  food,
  isFavoriteLoading = false,
  isFavorited = false,
  open,
  recommendationFeedback,
  onClose,
  onOpenFeedback,
  onOpenLocations,
  onToggleFavorite,
}: FoodDetailDrawerProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [imageFailed, setImageFailed] = useState(false);
  const [rawIngredients, setRawIngredients] = useState<string[]>([]);
  const [rawInstructions, setRawInstructions] = useState<string | null>(null);

  useEffect(() => {
    setImageFailed(false);
    // Reset khi đổi món
    setRawIngredients(food?.raw_ingredients ?? []);
    setRawInstructions(food?.raw_instructions ?? null);

    if (!food?.id) return;
    // Nếu dữ liệu đã có (truyền từ ngoài vào) thì không cần fetch thêm
    if (food.raw_ingredients?.length || food.raw_instructions) return;

    fetchFoodDetail(food.id)
      .then((detail) => {
        setRawIngredients(detail.raw_ingredients ?? []);
        setRawInstructions(detail.raw_instructions ?? null);
      })
      .catch(() => { /* fail silently — section ẩn */ });
  }, [food?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const preferredImageSrc =
    resolveFoodImageUrl(food?.img_url) ??
    resolveFoodImageUrl(food?.image) ??
    FALLBACK_FOOD_IMAGE;
  const imageSrc = imageFailed ? FALLBACK_FOOD_IMAGE : preferredImageSrc;
  const shouldShowImage = Boolean(imageSrc);
  const allTags = useMemo(
    () =>
      uniqueItems([
        ...(food?.soft_tags ?? []),
        ...(food?.taste_profile ?? []),
        ...(food?.meal_context ?? []),
        ...(food?.occasion_context ?? []),
        ...(food?.tags ?? []),
      ]),
    [food],
  );

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "right"}
      open={open && Boolean(food)}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: styles.drawerPaperStyles(isMobile),
        },
      }}
    >
      {food ? (
        <Box sx={styles.contentStyles}>
          <Box sx={styles.headerStyles}>
            <Typography as="span" sx={styles.eyebrowStyles}>
              <Sparkles size={15} />
              Chi tiết món gợi ý
            </Typography>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              sx={styles.closeButtonStyles}
              onClick={onClose}
              aria-label="Đóng chi tiết món ăn"
            >
              <X size={18} />
            </Button>
          </Box>

          <Box sx={styles.scrollBodyStyles}>
            <Box sx={styles.heroStyles}>
              {shouldShowImage && (
                <Box
                  component="img"
                  src={imageSrc ?? undefined}
                  alt={food.name}
                  loading="eager"
                  referrerPolicy="no-referrer"
                  sx={styles.heroImageStyles}
                  onError={() => {
                    if (imageSrc !== FALLBACK_FOOD_IMAGE) {
                      setImageFailed(true);
                    }
                  }}
                />
              )}
              <Box sx={styles.heroOverlayStyles} />
              <Box sx={styles.heroContentStyles}>
                <Typography as="h2" sx={styles.titleStyles}>
                  {food.name}
                </Typography>
              </Box>
            </Box>

            <Box sx={styles.metaGridStyles}>
              {food.cookingTime ? (
                <Box sx={styles.metaItemStyles}>
                  <Clock3 size={17} />
                  {food.cookingTime} phút
                </Box>
              ) : null}
              {food.servings ? (
                <Box sx={styles.metaItemStyles}>
                  <Users size={17} />
                  {food.servings} phần
                </Box>
              ) : null}
              {food.calories ? (
                <Box sx={styles.metaItemStyles}>
                  <Flame size={17} />
                  {food.calories} kcal
                </Box>
              ) : null}
              {food.difficulty ? (
                <Box sx={styles.metaItemStyles}>
                  <ChefHat size={17} />
                  {difficultyLabels[food.difficulty]}
                </Box>
              ) : null}
            </Box>

            <Box sx={styles.sectionCardStyles}>
              <Typography as="h3" sx={styles.sectionTitleStyles}>
                Mô tả món ăn
              </Typography>
              <Typography as="p" sx={styles.descriptionStyles}>
                {food.description || "Chưa có mô tả chi tiết cho món này."}
              </Typography>
            </Box>

            {food.reason ? (
              <Box sx={styles.sectionCardStyles}>
                <Typography as="h3" sx={styles.sectionTitleStyles}>
                  Vì sao AI gợi ý?
                </Typography>
                <Typography as="p" sx={styles.descriptionStyles}>
                  {food.reason}
                </Typography>
              </Box>
            ) : null}

            <FoodDetailSection
              title="Nguyên liệu chính"
              items={food.core_ingredients}
            />
            <FoodDetailSection title="Đặc điểm món" items={allTags} />

            {/* Định lượng nguyên liệu */}
            {rawIngredients.length > 0 ? (
              <Box sx={styles.sectionCardStyles}>
                <Typography as="h3" sx={styles.sectionTitleStyles}>
                  Định lượng nguyên liệu
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  {rawIngredients.map((line, i) => (
                    <Typography key={i} as="p" sx={[styles.descriptionStyles, { fontSize: "0.875rem" }]}>
                      • {line}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ) : null}

            {/* Hướng dẫn nấu */}
            {rawInstructions ? (
              <Box sx={styles.sectionCardStyles}>
                <Typography as="h3" sx={styles.sectionTitleStyles}>
                  Hướng dẫn nấu
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "0.75rem", mt: 0.5 }}>
                  {rawInstructions
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
                            mt: "2px",
                            background: "linear-gradient(135deg, #FF8A1F 0%, #D9480F 100%)",
                            color: "#fff",
                          }}
                        >
                          {idx + 1}
                        </Box>
                        <Typography as="p" sx={[styles.descriptionStyles, { flex: 1, fontSize: "0.875rem" }]}>
                          {step}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Box>
            ) : null}
          </Box>

          <Box sx={styles.actionBarStyles}>
            {onToggleFavorite ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isFavoriteLoading}
                sx={styles.actionButtonStyles("favorite")}
                onClick={() => onToggleFavorite(food)}
              >
                <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
                {isFavorited ? "Đã yêu thích" : "Yêu thích"}
              </Button>
            ) : null}
            {onOpenFeedback ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                sx={styles.actionButtonStyles("feedback")}
                onClick={() => {
                  onClose();
                  onOpenFeedback(food);
                }}
              >
                <MessageSquareText size={16} />
                {recommendationFeedback ? "Đã đánh giá" : "Đánh giá gợi ý"}
              </Button>
            ) : null}
            {onOpenLocations && food.dining_context === "restaurant" ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                sx={styles.actionButtonStyles("location")}
                onClick={() => {
                  onClose();
                  onOpenLocations(food);
                }}
              >
                <MapPinned size={16} />
                Quán gần bạn
              </Button>
            ) : null}
          </Box>
        </Box>
      ) : null}
    </Drawer>
  );
}
