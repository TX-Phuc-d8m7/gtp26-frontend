/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import {
  Box,
  Chip,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Heart, Loader2, MapPin, X } from "lucide-react";

import { styles } from "./_styles";
import type { ApiFoodDetail } from "./_interface";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=900";

export interface FoodDetailDrawerProps {
  food: ApiFoodDetail | null;
  isFavoriteLoading: boolean;
  isLoading: boolean;
  onClose: () => void;
  onToggleFavorite: () => void;
  onOpenLocations?: () => void;
}

/** @deprecated Use FoodDetailDrawer instead */
export type FoodDetailDialogProps = FoodDetailDrawerProps;

export function FoodDetailDrawer({
  food,
  isFavoriteLoading,
  isLoading,
  onClose,
  onToggleFavorite,
  onOpenLocations,
}: FoodDetailDrawerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isOpen = Boolean(food) || isLoading;

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "right"}
      open={isOpen}
      onClose={onClose}
      slotProps={{ paper: { sx: styles.foodDetailDrawerPaperStyles(isMobile) } }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {isLoading || !food ? (
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flex: 1,
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
              {onOpenLocations && (
                <IconButton
                  aria-label="Tìm quán gần bạn"
                  onClick={onOpenLocations}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: food.is_favorite !== undefined ? 100 : 52,
                    backgroundColor: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(4px)",
                    color: "#fff",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                  }}
                >
                  <MapPin size={18} />
                </IconButton>
              )}
              {food.is_favorite !== undefined && (
                <IconButton
                  aria-label={
                    food.is_favorite ? "Xoá khỏi yêu thích" : "Thêm vào yêu thích"
                  }
                  disabled={isFavoriteLoading}
                  onClick={onToggleFavorite}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 52,
                    backgroundColor: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(4px)",
                    color: food.is_favorite ? "#F97316" : "#fff",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                  }}
                >
                  {isFavoriteLoading ? (
                    <Loader2
                      size={18}
                      style={{ animation: "spin 0.8s linear infinite" }}
                    />
                  ) : (
                    <Heart
                      size={18}
                      fill={food.is_favorite ? "#F97316" : "none"}
                    />
                  )}
                </IconButton>
              )}
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
              <Typography sx={[styles.descriptionStyles, { WebkitLineClamp: "unset", overflow: "visible", display: "block" }]}>
                {food.description}
              </Typography>

              {/* Taste & occasion tags */}
              {food.taste_profile.length > 0 ||
              food.occasion_context.length > 0 ? (
                <Box sx={styles.detailSectionStyles}>
                  <Typography sx={styles.detailSectionLabelStyles}>
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
                  <Typography sx={styles.detailSectionLabelStyles}>
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

              {/* Raw ingredients */}
              {food.raw_ingredients.length > 0 ? (
                <Box sx={styles.detailSectionStyles}>
                  <Typography sx={styles.detailSectionLabelStyles}>
                    Định lượng nguyên liệu
                  </Typography>
                  <Stack spacing={0.5}>
                    {food.raw_ingredients.map((line, i) => (
                      <Typography key={i} sx={styles.detailListItemStyles}>
                        • {line}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              ) : null}

              {/* Soft tags */}
              {food.soft_tags.length > 0 ? (
                <Box sx={styles.detailSectionStyles}>
                  <Typography sx={styles.detailSectionLabelStyles}>
                    Đặc điểm món
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
                <Box sx={[styles.detailSectionStyles, { pb: 2 }]}>
                  <Typography sx={styles.detailSectionLabelStyles}>
                    Hướng dẫn nấu
                  </Typography>
                  <Stack spacing={1.5} sx={{ mt: 0.5 }}>
                    {food.raw_instructions
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .map((step, idx) => (
                        <Box key={idx} sx={styles.instructionStepStyles}>
                          <Box
                            component="span"
                            sx={styles.instructionStepBadgeStyles}
                          >
                            {idx + 1}
                          </Box>
                          <Typography sx={styles.instructionStepTextStyles}>
                            {step}
                          </Typography>
                        </Box>
                      ))}
                  </Stack>
                </Box>
              ) : null}

              {/* Favorite status badge */}
              {food.is_favorite === true && (
                <Box sx={styles.detailSectionStyles}>
                  <Chip
                    size="small"
                    icon={<Heart size={12} fill="#F97316" color="#F97316" />}
                    label="Đã thêm vào yêu thích"
                    sx={styles.detailFavoriteBadgeStyles}
                  />
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}

/** @deprecated Use FoodDetailDrawer instead */
export const FoodDetailDialog = FoodDetailDrawer;
