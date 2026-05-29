/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import {
  Chip,
  CircularProgress,
  Drawer,
  IconButton,
  Skeleton,
} from "@mui/material";
import { DatabaseZap, Pencil, Sparkles, Trash2, X } from "lucide-react";

import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Image } from "@/shared/components/ui/image/index";
import { Typography } from "@/shared/components/ui/typography/index";

import { DetailSection, FoodDetailDrawerProps, styles } from ".";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=900";

function buildSections(food: NonNullable<FoodDetailDrawerProps["food"]>) {
  return [
    {
      items: food.core_ingredients,
      title: "Nguyên liệu chính",
      tone: "green",
    },
    {
      items: food.raw_ingredients,
      title: "Nguyên liệu đầy đủ",
      tone: "neutral",
    },
    {
      items: food.soft_tags,
      title: "Soft tags",
      tone: "orange",
    },
    {
      items: food.taste_profile,
      title: "Khẩu vị",
      tone: "blue",
    },
    {
      items: food.meal_context,
      title: "Ngữ cảnh bữa ăn",
      tone: "neutral",
    },
    {
      items: food.occasion_context,
      title: "Ngữ cảnh dịp ăn",
      tone: "neutral",
    },
    {
      items: food.core_ingredient_keys,
      title: "Ingredient keys",
      tone: "green",
    },
  ] satisfies DetailSection[];
}

export default function FoodDetailDrawer({
  actionFoodId,
  food,
  isLoading,
  open,
  onClose,
  onDelete,
  onEdit,
  onRebuildEmbedding,
  onRebuildKeys,
}: FoodDetailDrawerProps) {
  const isActionLoading = Boolean(food && actionFoodId === food.id);
  const sections = food ? buildSections(food) : [];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: styles.paperStyles } }}
    >
      <Box sx={styles.containerStyles}>
        <Box sx={styles.headerStyles}>
          <Box sx={{ minWidth: 0 }}>
            <Typography as="span" sx={styles.eyebrowStyles}>
              Admin food detail
            </Typography>
            <Typography as="h2" sx={styles.titleStyles}>
              {food?.name ?? "Chi tiết món ăn"}
            </Typography>
          </Box>
          <IconButton sx={styles.closeButtonStyles} onClick={onClose}>
            <X size={18} />
          </IconButton>
        </Box>

        {isLoading && !food ? (
          <Box sx={styles.loadingStyles}>
            <CircularProgress size={28} />
          </Box>
        ) : food ? (
          <Box sx={styles.bodyStyles}>
            <Image
              src={food.img_url ?? FALLBACK_IMAGE}
              alt={food.name}
              sx={styles.imageStyles}
            />

            <Box sx={styles.statusRowStyles}>
              <Chip
                size="small"
                label={food.has_embedding ? "Embedding sẵn sàng" : "Thiếu embedding"}
                sx={styles.statusChipStyles(food.has_embedding)}
              />
              <Chip
                size="small"
                label={`${food.core_ingredients.length} nguyên liệu chính`}
                sx={styles.summaryChipStyles}
              />
              <Chip
                size="small"
                label={`${food.soft_tags.length} soft tags`}
                sx={styles.summaryChipStyles}
              />
            </Box>

            <Typography as="p" sx={styles.descriptionStyles}>
              {food.description}
            </Typography>

            {sections.map((section) => (
              <Box key={section.title} sx={styles.panelStyles}>
                <Typography as="p" sx={styles.sectionTitleStyles}>
                  {section.title}
                </Typography>
                {section.items.length > 0 ? (
                  <Box sx={styles.chipWrapStyles}>
                    {section.items.map((item) => (
                      <Box
                        key={`${section.title}-${item}`}
                        component="span"
                        sx={styles.chipStyles(section.tone)}
                      >
                        {item}
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography as="p" sx={styles.descriptionStyles}>
                    Chưa có dữ liệu.
                  </Typography>
                )}
              </Box>
            ))}

            <Box sx={styles.panelStyles}>
              <Typography as="p" sx={styles.sectionTitleStyles}>
                Cách làm / ghi chú
              </Typography>
              <Typography as="p" sx={styles.instructionsStyles}>
                {food.raw_instructions || "Chưa có hướng dẫn."}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={styles.bodyStyles}>
            <Skeleton variant="rounded" height={240} />
          </Box>
        )}

        {food && (
          <Box sx={styles.footerStyles}>
            {/* Content ops */}
            <Button
              type="button"
              variant="ghost"
              sx={styles.footerButtonStyles}
              onClick={() => onEdit(food)}
            >
              <Pencil size={15} />
              Chỉnh sửa
            </Button>
            <Button
              type="button"
              variant="ghost"
              sx={styles.dangerButtonStyles}
              onClick={() => onDelete(food)}
            >
              <Trash2 size={15} />
              Xóa món
            </Button>

            {/* Divider phân tách content ops vs technical ops */}
            <Box sx={styles.footerDividerStyles} />

            {/* Technical ops */}
            <Button
              type="button"
              variant="ghost"
              sx={styles.footerButtonStyles}
              disabled={Boolean(actionFoodId)}
              onClick={() => onRebuildKeys(food)}
            >
              {isActionLoading ? (
                <CircularProgress size={14} sx={{ color: "inherit" }} />
              ) : (
                <DatabaseZap size={15} />
              )}
              Rebuild keys
            </Button>
            <Button
              type="button"
              variant="ghost"
              sx={styles.footerButtonStyles}
              disabled={Boolean(actionFoodId)}
              onClick={() => onRebuildEmbedding(food)}
            >
              {isActionLoading ? (
                <CircularProgress size={14} sx={{ color: "inherit" }} />
              ) : (
                <Sparkles size={15} />
              )}
              Embedding
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
