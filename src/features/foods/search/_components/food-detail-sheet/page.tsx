/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { ChefHat, HeartPulse, Info, Tag } from "lucide-react";

import { FoodDetailSheetProps, styles } from "../..";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/shared/components/ui/sheet/index";
import { Box } from "@/shared/components/ui/box/index";
import { Image } from "@/shared/components/ui/image/index";
import { Typography } from "@/shared/components/ui/typography/index";

export default function FoodDetailSheet({
  food,
  onClose,
}: FoodDetailSheetProps) {
  return (
    <Sheet open={food !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent sx={styles.sheetContentStyles}>
        {food && (
          <Box sx={styles.detailRootStyles}>
            <Box sx={styles.detailImageWrapperStyles}>
              <Image
                src={food.image}
                alt={food.name}
                sx={styles.detailImageStyles}
              />
              <Box sx={styles.detailImageOverlayStyles} />
              <Box sx={styles.detailTitleWrapperStyles}>
                <SheetTitle sx={styles.detailTitleStyles}>
                  {food.name}
                </SheetTitle>
                <Typography sx={styles.detailPriceStyles}>
                  {food.priceRange}
                </Typography>
              </Box>
            </Box>

            <Box sx={styles.detailBodyStyles}>
              <Box>
                <SheetDescription sx={styles.detailDescriptionStyles}>
                  {food.description}
                </SheetDescription>
                <Box sx={styles.detailTagListStyles}>
                  {food.categories.map((category) => (
                    <Typography
                      as="span"
                      key={category}
                      sx={styles.detailTagStyles}
                    >
                      <Box component={Tag} sx={styles.detailTagIconStyles} />
                      {category}
                    </Typography>
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography as="h4" sx={styles.detailSectionTitleStyles}>
                  <Box
                    component={HeartPulse}
                    sx={styles.detailSectionIconStyles}
                  />
                  Dinh dưỡng (Ước tính)
                </Typography>
                <Box sx={styles.nutritionGridStyles}>
                  <NutritionItem value={food.nutrition.calories} label="Kcal" />
                  <NutritionItem
                    value={`${food.nutrition.protein}g`}
                    label="Đạm"
                  />
                  <NutritionItem
                    value={`${food.nutrition.carbs}g`}
                    label="Tinh bột"
                  />
                  <NutritionItem value={`${food.nutrition.fat}g`} label="Béo" />
                </Box>
              </Box>

              <Box>
                <Typography as="h4" sx={styles.detailSectionTitleStyles}>
                  <Box
                    component={ChefHat}
                    sx={styles.detailSectionIconStyles}
                  />
                  Thành phần chính
                </Typography>
                <Box sx={styles.ingredientListStyles}>
                  {food.ingredients.map((ingredient) => (
                    <Typography
                      as="span"
                      key={ingredient}
                      sx={styles.ingredientStyles}
                    >
                      {ingredient}
                    </Typography>
                  ))}
                </Box>
              </Box>

              {(food.allergies || food.medicalAdvice) && (
                <Box sx={styles.warningBoxStyles}>
                  <Typography as="h4" sx={styles.warningTitleStyles}>
                    <Box component={Info} sx={styles.warningIconStyles} />
                    Lưu ý sức khỏe
                  </Typography>
                  {food.allergies && food.allergies.length > 0 && (
                    <Typography sx={styles.warningTextSpacedStyles}>
                      <Typography as="span" sx={styles.warningStrongStyles}>
                        Dị ứng:
                      </Typography>{" "}
                      Có chứa {food.allergies.join(", ")}.
                    </Typography>
                  )}
                  {food.medicalAdvice && (
                    <Typography sx={styles.warningTextStyles}>
                      <Typography as="span" sx={styles.warningStrongStyles}>
                        Khuyên dùng:
                      </Typography>{" "}
                      {food.medicalAdvice}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </SheetContent>
    </Sheet>
  );
}

function NutritionItem({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <Box sx={styles.nutritionItemStyles}>
      <Typography sx={styles.nutritionValueStyles}>{value}</Typography>
      <Typography sx={styles.nutritionLabelStyles}>{label}</Typography>
    </Box>
  );
}
