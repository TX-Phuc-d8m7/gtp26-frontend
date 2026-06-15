/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { Controller } from "react-hook-form";
import { ArrowRight, Loader2 } from "lucide-react";

import { styles, useOnboarding } from ".";
import {
  DEMO_HEALTH_RISK_OPTIONS,
  DISH_TYPE_OPTIONS,
  FAVORITE_INGREDIENT_OPTIONS,
  TASTE_PREFERENCE_OPTIONS,
} from "@/features/profile/_interface";
import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Form } from "@/shared/components/ui/form/index";
import { Label } from "@/shared/components/ui/label/index";
import { MultiSelectPills } from "@/shared/components/ui/multi-select-pills/index";
import { Typography } from "@/shared/components/ui/typography/index";

export default function Onboarding() {
  const { control, handleSubmit, handleSkip, isLoading, onSubmit } =
    useOnboarding();

  return (
    <Box sx={styles.pageShellStyles}>
      <Box sx={styles.pageBackgroundStyles} />
      <Box sx={styles.containerStyles}>
        <Box sx={styles.headerStyles}>
          <Typography as="h2" sx={styles.titleStyles}>
            Cá nhân hóa trải nghiệm
          </Typography>
          <Typography sx={styles.descriptionStyles}>
            Chọn sở thích ẩm thực để chúng tôi gợi ý món ăn phù hợp nhất với
            bạn.
          </Typography>
        </Box>

        <Form onSubmit={handleSubmit(onSubmit)} sx={styles.formStyles}>
          <Box sx={styles.fieldStyles}>
            <Label sx={styles.labelStyles}>
              Bệnh lý và dị ứng
              <Typography as="span" sx={styles.optionalBadgeStyles}>
                Không bắt buộc
              </Typography>
            </Label>
            <Typography sx={styles.fieldDescriptionStyles}>
              Chọn một trong 6 nhãn demo để AI ưu tiên lọc món an toàn hơn.
            </Typography>
            <Controller
              name="healthRisks"
              control={control}
              render={({ field }) => (
                <MultiSelectPills
                  options={DEMO_HEALTH_RISK_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  variant="danger"
                />
              )}
            />
          </Box>

          <Box sx={styles.fieldStyles}>
            <Label sx={styles.labelStyles}>
              Nguyên liệu yêu thích
              <Typography as="span" sx={styles.optionalBadgeStyles}>
                Nhiều lựa chọn
              </Typography>
            </Label>
            <Typography sx={styles.fieldDescriptionStyles}>
              Những nguyên liệu bạn muốn hệ thống ưu tiên khi gợi ý món.
            </Typography>
            <Controller
              name="favorites"
              control={control}
              render={({ field }) => (
                <MultiSelectPills
                  options={FAVORITE_INGREDIENT_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  variant="success"
                />
              )}
            />
          </Box>

          <Box sx={styles.fieldStyles}>
            <Label sx={styles.labelStyles}>Khẩu vị yêu thích</Label>
            <Typography sx={styles.fieldDescriptionStyles}>
              Vị chủ đạo bạn thường thích trong một món ăn.
            </Typography>
            <Controller
              name="tastePreferences"
              control={control}
              render={({ field }) => (
                <MultiSelectPills
                  options={TASTE_PREFERENCE_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  variant="default"
                />
              )}
            />
          </Box>

          <Box sx={styles.fieldStyles}>
            <Label sx={styles.labelStyles}>Cách nấu yêu thích</Label>
            <Typography sx={styles.fieldDescriptionStyles}>
              Kiểu chế biến bạn muốn AI ưu tiên khi chọn món.
            </Typography>
            <Controller
              name="dishTypes"
              control={control}
              render={({ field }) => (
                <MultiSelectPills
                  options={DISH_TYPE_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  variant="success"
                />
              )}
            />
          </Box>

          <Box sx={styles.actionRowStyles}>
            <Button
              type="button"
              onClick={handleSkip}
              variant="ghost"
              sx={styles.skipButtonStyles}
            >
              Bỏ qua
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              sx={styles.submitButtonStyles}
            >
              {isLoading ? (
                <>
                  <Box component={Loader2} sx={styles.loadingIconStyles} />
                  Đang lưu...
                </>
              ) : (
                <>
                  Hoàn tất & Khám phá
                  <Box component={ArrowRight} sx={styles.submitIconStyles} />
                </>
              )}
            </Button>
          </Box>
        </Form>
      </Box>
    </Box>
  );
}
