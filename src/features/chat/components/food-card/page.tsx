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
  MapPinned,
  MessageSquareText,
  Users,
  Zap,
} from "lucide-react";

import { mergeSx } from "@/shared/shared.styles";
import { FoodCardProps, styles } from ".";

export default function FoodCard({
  food,
  index,
  onOpenLocations,
  onOpenFeedback,
  sx,
}: FoodCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const score = Math.max(0, Math.min(100, food.matchScore));
  const locationCount = food.locations?.length ?? 0;
  const difficulty = food.difficulty || "easy";
  const difficultyConfig = styles.difficultyConfig[difficulty];
  const shouldShowImage = Boolean(food.image && !imageFailed);

  return (
    <Card sx={mergeSx(styles.getRootSx(), sx)}>
      <CardContent sx={styles.contentRootSx}>
        {shouldShowImage && (
          <Box sx={styles.imageWrapSx}>
            <Box
              component="img"
              src={food.image}
              alt={food.name}
              sx={styles.imageSx}
              onError={() => setImageFailed(true)}
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
          <Box>
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
              {difficulty && (
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

            {food.tags && food.tags.length > 0 && (
              <Box sx={styles.tagWrapSx}>
                {food.tags.map((tag) => (
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
            {onOpenFeedback && (
              <Button
                type="button"
                variant="outlined"
                size="small"
                startIcon={<MessageSquareText size={16} />}
                onClick={() => onOpenFeedback(food)}
                sx={styles.getActionButtonSx("feedback")}
              >
                Đánh giá gợi ý
              </Button>
            )}
            {locationCount > 0 && onOpenLocations && (
              <Button
                type="button"
                variant="outlined"
                size="small"
                startIcon={<MapPinned size={16} />}
                onClick={() => onOpenLocations(food)}
                sx={styles.getActionButtonSx("location")}
              >
                {locationCount} quán gần bạn
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
