/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";
import type React from "react";

import FoodCard from "./_components/food-card/page";
import FoodDetailSheet from "./_components/food-detail-sheet/page";
import { FoodSearchUIProps, styles } from ".";
import { useFoodSearch } from "./_use-food-search";
import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Input } from "@/shared/components/ui/input/index";
import { Typography } from "@/shared/components/ui/typography/index";

export default function FoodSearchUI(props: FoodSearchUIProps = {}) {
  const {
    searchTerm,
    selectedCategory,
    selectedFood,
    allCategories,
    filteredFoods,
    setSearchTerm,
    setSelectedCategory,
    setSelectedFood,
    handleBack,
    closeFoodDetail,
  } = useFoodSearch(props);

  return (
    <Box sx={styles.rootStyles}>
      <Box sx={styles.headerStyles}>
        <Box sx={styles.headerContentStyles}>
          <Box sx={styles.titleRowStyles}>
            <Button
              onClick={handleBack}
              variant="ghost"
              size="icon"
              sx={styles.backButtonStyles}
            >
              <Box component={ArrowLeft} sx={styles.backIconStyles} />
            </Button>
            <Typography as="h1" sx={styles.titleStyles}>
              Tra cứu món ăn
            </Typography>
          </Box>

          <Box sx={styles.searchRowStyles}>
            <Box sx={styles.searchFieldStyles}>
              <Box component={Search} sx={styles.searchIconStyles} />
              <Input
                type="text"
                placeholder="Tìm món ăn, nguyên liệu..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                sx={styles.searchInputStyles}
              />
            </Box>
            <Button
              type="button"
              variant="outline"
              size="icon"
              sx={styles.filterButtonStyles}
            >
              <Box component={SlidersHorizontal} sx={styles.backIconStyles} />
            </Button>
          </Box>

          <Box sx={styles.categoryListStyles}>
            <CategoryButton
              active={selectedCategory === null}
              onClick={() => setSelectedCategory(null)}
            >
              Tất cả
            </CategoryButton>
            {allCategories.map((category) => (
              <CategoryButton
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </CategoryButton>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={styles.resultsAreaStyles}>
        <Box sx={styles.resultsContentStyles}>
          {!searchTerm.trim() ? (
            <EmptySearchState
              title="Nhập từ khóa để tra cứu món ăn"
              description="Ví dụ: bún, món ít dầu mỡ, món cho người tiểu đường..."
            />
          ) : filteredFoods.length === 0 ? (
            <EmptySearchState
              title="Không tìm thấy món ăn nào"
              description="Hãy thử với từ khóa khác hoặc bỏ chọn bộ lọc."
            />
          ) : (
            <Box sx={styles.gridStyles}>
              {filteredFoods.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  onClick={() => setSelectedFood(food)}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>

      <FoodDetailSheet food={selectedFood} onClose={closeFoodDetail} />
    </Box>
  );
}

function CategoryButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      sx={[
        styles.categoryButtonBaseStyles,
        active
          ? styles.categoryButtonActiveStyles
          : styles.categoryButtonInactiveStyles,
      ]}
    >
      {children}
    </Button>
  );
}

function EmptySearchState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Box sx={styles.emptyStateStyles}>
      <Box component={Search} sx={styles.emptyIconStyles} />
      <Typography sx={styles.emptyTitleStyles}>{title}</Typography>
      <Typography sx={styles.emptyDescriptionStyles}>{description}</Typography>
    </Box>
  );
}
