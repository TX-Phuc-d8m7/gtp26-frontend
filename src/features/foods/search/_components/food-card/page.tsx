/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { FoodCardProps, styles } from "../..";
import { Box } from "@/shared/components/ui/box/index";
import { Image } from "@/shared/components/ui/image/index";
import { Typography } from "@/shared/components/ui/typography/index";

export default function FoodCard({ food, onClick }: FoodCardProps) {
  return (
    <Box onClick={onClick} sx={styles.cardStyles}>
      <Box sx={styles.cardImageWrapperStyles}>
        <Image
          src={food.image}
          alt={food.name}
          data-food-card-image="true"
          sx={styles.cardImageStyles}
        />
        <Box sx={styles.cardBadgeWrapperStyles}>
          {food.allergies && food.allergies.length > 0 && (
            <Typography as="span" sx={styles.allergyBadgeStyles}>
              Cảnh báo dị ứng
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={styles.cardBodyStyles}>
        <Box sx={styles.cardTitleRowStyles}>
          <Typography
            as="h3"
            data-food-card-title="true"
            sx={styles.cardTitleStyles}
          >
            {food.name}
          </Typography>
          <Typography as="span" sx={styles.caloriesStyles}>
            {food.nutrition.calories} kcal
          </Typography>
        </Box>

        <Typography sx={styles.cardDescriptionStyles}>
          {food.description}
        </Typography>

        <Box sx={styles.cardCategoryListStyles}>
          {food.categories.slice(0, 3).map((category) => (
            <Typography as="span" key={category} sx={styles.cardCategoryStyles}>
              {category}
            </Typography>
          ))}
          {food.categories.length > 3 && (
            <Typography as="span" sx={styles.cardCategoryStyles}>
              +{food.categories.length - 3}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
