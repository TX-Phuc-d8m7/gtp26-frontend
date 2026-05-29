/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import {
  ChefHat,
  Clock,
  Flame,
  Heart,
  Info,
  MapPinned,
  MessageSquareText,
  Users,
  Zap,
} from "lucide-react";

import { mergeSx } from "@/shared/shared.styles";
import {
  FALLBACK_FOOD_IMAGE,
  resolveFoodImageUrl,
} from "@/features/chat/lib/food-image";
import { FoodCardProps, styles } from ".";

export default function FoodCard({
  food,
  index,
  isFavoriteLoading = false,
  isFavorited = false,
  recommendationFeedback,
  onOpenDetail,
  onOpenLocations,
  onOpenFeedback,
  onToggleFavorite,
  sx,
}: FoodCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const score = Math.max(0, Math.min(100, food.matchScore));
  const locationCount = food.locations?.length ?? 0;
  const difficulty = food.difficulty;
  const difficultyConfig = difficulty
    ? styles.difficultyConfig[difficulty]
    : undefined;
  const preferredImageSrc =
    resolveFoodImageUrl(food.img_url) ??
    resolveFoodImageUrl(food.image) ??
    FALLBACK_FOOD_IMAGE;
  const imageSrc = imageFailed ? FALLBACK_FOOD_IMAGE : preferredImageSrc;
  const displayTags =
    food.soft_tags && food.soft_tags.length > 0
      ? food.soft_tags
      : (food.tags ?? []);
  const shouldShowImage = Boolean(imageSrc);

  return (
    <Card sx={mergeSx(styles.getRootSx(), sx)}>
      <CardContent sx={styles.contentRootSx}>
        {shouldShowImage && (
          <Box sx={styles.imageWrapSx}>
            <Box
              component="img"
              src={imageSrc ?? undefined}
              alt={food.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              sx={styles.imageSx}
              onError={() => {
                if (imageSrc !== FALLBACK_FOOD_IMAGE) {
                  setImageFailed(true);
                }
              }}
            />
            <Box sx={styles.rankBadgeSx}>{index + 1}</Box>
            <Box sx={styles.heroOverlaySx}>
              <Box sx={styles.heroTextWrapSx}>
                <Box sx={styles.heroEyebrowSx}>Gợi ý món phù hợp</Box>
                <Box sx={styles.heroTitleSx}>{food.name}</Box>
              </Box>
              <Box sx={styles.heroScoreSx}>{Math.round(score)}% hợp</Box>
            </Box>
          </Box>
        )}

        <Box sx={styles.bodySx}>
          <Box sx={{ flex: 1 }}>
            {!shouldShowImage && (
              <Box sx={styles.fallbackHeaderSx}>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={styles.fallbackEyebrowSx}>
                    Gợi ý món phù hợp
                  </Typography>
                  <Typography sx={styles.fallbackTitleSx}>
                    {food.name}
                  </Typography>
                </Box>
                <Box sx={styles.heroScoreSx}>{Math.round(score)}% hợp</Box>
              </Box>
            )}

            <Box sx={styles.scoreTrackSx}>
              <Box sx={styles.getScoreFillSx(score)} />
            </Box>

            <Typography sx={styles.descriptionSx}>
              {food.description}
            </Typography>

            <Box sx={styles.metadataGridSx}>
              {food.cookingTime && (
                <Box sx={styles.metaItemSx}>
                  <Box component={Clock} sx={styles.getMetaIconSx("time")} />
                  <Box component="span" sx={styles.metaTextSx}>
                    {food.cookingTime} phút
                  </Box>
                </Box>
              )}
              {food.servings && (
                <Box sx={styles.metaItemSx}>
                  <Box component={Users} sx={styles.getMetaIconSx("serving")} />
                  <Box component="span" sx={styles.metaTextSx}>
                    {food.servings} phần
                  </Box>
                </Box>
              )}
              {food.calories && (
                <Box sx={styles.metaItemSx}>
                  <Box component={Flame} sx={styles.getMetaIconSx("calorie")} />
                  <Box component="span" sx={styles.metaTextSx}>
                    {food.calories} kcal
                  </Box>
                </Box>
              )}
              {difficulty && difficultyConfig && (
                <Box sx={styles.getDifficultyPillSx(difficulty)}>
                  <ChefHat size={16} color={difficultyConfig.color} />
                  <Box
                    component="span"
                    sx={styles.difficultyTextSx}
                    style={{ color: difficultyConfig.color }}
                  >
                    {difficultyConfig.label}
                  </Box>
                </Box>
              )}
            </Box>

            {(food.protein || food.carbs || food.fat) && (
              <Box sx={styles.nutritionWrapSx}>
                {food.protein && (
                  <Chip
                    icon={<Zap size={12} />}
                    label={`${food.protein}g protein`}
                    size="small"
                    variant="outlined"
                    sx={styles.getNutritionChipSx("protein")}
                  />
                )}
                {food.carbs && (
                  <Chip
                    label={`${food.carbs}g carbs`}
                    size="small"
                    variant="outlined"
                    sx={styles.getNutritionChipSx("carbs")}
                  />
                )}
                {food.fat && (
                  <Chip
                    label={`${food.fat}g fat`}
                    size="small"
                    variant="outlined"
                    sx={styles.getNutritionChipSx("fat")}
                  />
                )}
              </Box>
            )}

            {displayTags.length > 0 && (
              <Box sx={styles.tagWrapSx}>
                {displayTags.map((tag) => (
                  <Box key={tag} component="span" sx={styles.getTagChipSx(tag)}>
                    {tag}
                  </Box>
                ))}
              </Box>
            )}

            {food.reason && (
              <Box sx={styles.reasonCardSx}>
                <Box sx={styles.reasonInnerSx}>
                  <Box sx={styles.reasonIconSx}>
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 5v8a2 2 0 0 1-2 2h-5l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={styles.reasonTitleSx}>
                      Tại sao lại gợi ý?
                    </Typography>
                    <Typography sx={styles.reasonTextSx}>
                      {food.reason}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          <Box sx={styles.actionsGridSx}>
            {onOpenDetail && (
              <Button
                type="button"
                variant="outlined"
                size="small"
                startIcon={<Info size={16} />}
                onClick={() => onOpenDetail(food)}
                sx={styles.getActionButtonSx("detail")}
              >
                Chi tiết
              </Button>
            )}
            {onToggleFavorite && (
              <Button
                type="button"
                variant="outlined"
                size="small"
                startIcon={
                  <Heart
                    size={16}
                    fill={isFavorited ? "currentColor" : "none"}
                  />
                }
                disabled={isFavoriteLoading}
                onClick={() => onToggleFavorite(food)}
                sx={styles.getActionButtonSx("favorite", isFavorited)}
                aria-label={
                  isFavorited
                    ? "Xoá khỏi món yêu thích"
                    : "Thêm vào món yêu thích"
                }
              >
                {isFavorited ? "Đã yêu thích" : "Yêu thích"}
              </Button>
            )}
            {onOpenFeedback && (
              <Button
                type="button"
                variant="outlined"
                size="small"
                startIcon={<MessageSquareText size={16} />}
                onClick={() => onOpenFeedback(food)}
                sx={styles.getActionButtonSx(
                  "feedback",
                  Boolean(recommendationFeedback),
                )}
              >
                {recommendationFeedback ? "Đã đánh giá" : "Đánh giá gợi ý"}
              </Button>
            )}
            {onOpenLocations && food.dining_context === "restaurant" && (
              <Button
                type="button"
                variant="outlined"
                size="small"
                startIcon={<MapPinned size={16} />}
                onClick={() => onOpenLocations(food)}
                sx={styles.getActionButtonSx("location")}
              >
                {locationCount > 0
                  ? `${locationCount} quán gần bạn`
                  : "Quán gần bạn"}
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
