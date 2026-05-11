/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { Controller } from "react-hook-form";
import { ArrowRight, Loader2 } from "lucide-react";

import {
  ALLERGY_OPTIONS,
  DISLIKE_OPTIONS,
  FAVORITE_OPTIONS,
  styles,
  useOnboarding,
} from ".";
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
    <Box sx={styles.containerStyles}>
      <Box sx={styles.headerStyles}>
        <Typography as="h2" sx={styles.titleStyles}>
          Cá nhân hóa trải nghiệm
        </Typography>
        <Typography sx={styles.descriptionStyles}>
          Chọn sở thích ẩm thực để chúng tôi gợi ý món ăn phù hợp nhất với bạn.
        </Typography>
      </Box>

      <Form onSubmit={handleSubmit(onSubmit)} sx={styles.formStyles}>
        <Box sx={styles.fieldStyles}>
          <Label sx={styles.labelStyles}>
            Dị ứng thực phẩm
            <Typography as="span" sx={styles.optionalBadgeStyles}>
              Không bắt buộc
            </Typography>
          </Label>
          <Typography sx={styles.fieldDescriptionStyles}>
            Chọn các nguyên liệu bạn bị dị ứng (nếu có).
          </Typography>
          <Controller
            name="allergies"
            control={control}
            render={({ field }) => (
              <MultiSelectPills
                options={ALLERGY_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                variant="danger"
              />
            )}
          />
        </Box>

        <Box sx={styles.fieldStyles}>
          <Label sx={styles.labelStyles}>
            Món ăn yêu thích
            <Typography as="span" sx={styles.optionalBadgeStyles}>
              Nhiều lựa chọn
            </Typography>
          </Label>
          <Typography sx={styles.fieldDescriptionStyles}>
            Bạn thường thích ăn những loại thức ăn nào?
          </Typography>
          <Controller
            name="favorites"
            control={control}
            render={({ field }) => (
              <MultiSelectPills
                options={FAVORITE_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                variant="success"
              />
            )}
          />
        </Box>

        <Box sx={styles.fieldStyles}>
          <Label sx={styles.labelStyles}>Không thích ăn</Label>
          <Typography sx={styles.fieldDescriptionStyles}>
            Những nguyên liệu hoặc món bạn không bao giờ muốn ăn.
          </Typography>
          <Controller
            name="dislikes"
            control={control}
            render={({ field }) => (
              <MultiSelectPills
                options={DISLIKE_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                variant="danger"
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
  );
}
