/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { Controller } from "react-hook-form";
import {
  ALLERGY_OPTIONS,
  FAVORITE_OPTIONS,
  DISLIKE_OPTIONS,
} from "@/features/auth/onboarding";
import { Loader2, User, Mail, Lock, ArrowLeft, Save } from "lucide-react";

import { styles, useProfile } from ".";
import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Form } from "@/shared/components/ui/form/index";
import { Input } from "@/shared/components/ui/input/index";
import { Label } from "@/shared/components/ui/label/index";
import { MultiSelectPills } from "@/shared/components/ui/multi-select-pills/index";
import { Typography } from "@/shared/components/ui/typography/index";

export default function Profile() {
  const {
    register,
    control,
    handleSubmit,
    errors,
    handleBack,
    isLoading,
    onSubmit,
  } = useProfile();

  return (
    <Box sx={styles.pageShellStyles}>
      <Box sx={styles.pageBackgroundStyles} />
      <Box sx={styles.containerStyles}>
        <Box sx={styles.headerStyles}>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleBack}
            sx={styles.backButtonStyles}
          >
            <Box component={ArrowLeft} sx={styles.backIconStyles} />
          </Button>
          <Box>
            <Typography as="h2" sx={styles.titleStyles}>
              Hồ sơ cá nhân
            </Typography>
            <Typography sx={styles.descriptionStyles}>
              Quản lý thông tin và thiết lập sở thích ẩm thực
            </Typography>
          </Box>
        </Box>

        <Form onSubmit={handleSubmit(onSubmit)} sx={styles.formStyles}>
          <Box>
            <Typography as="h3" sx={styles.sectionTitleStyles}>
              Thông tin cơ bản
            </Typography>
            <Box sx={styles.accountGridStyles}>
              <Box sx={styles.fieldStyles}>
                <Label sx={styles.labelStyles}>Họ và tên</Label>
                <Box sx={styles.inputWrapperStyles}>
                  <Box sx={styles.inputIconWrapperStyles}>
                    <Box component={User} sx={styles.inputIconStyles} />
                  </Box>
                  <Input
                    type="text"
                    sx={styles.inputStyles(Boolean(errors.fullName))}
                    {...register("fullName")}
                  />
                </Box>
                {errors.fullName && (
                  <Typography sx={styles.errorTextStyles}>
                    {errors.fullName.message}
                  </Typography>
                )}
              </Box>

              <Box sx={styles.fieldStyles}>
                <Label sx={styles.labelStyles}>Email</Label>
                <Box sx={styles.inputWrapperStyles}>
                  <Box sx={styles.inputIconWrapperStyles}>
                    <Box component={Mail} sx={styles.inputIconStyles} />
                  </Box>
                  <Input
                    type="email"
                    sx={styles.inputStyles(Boolean(errors.email))}
                    {...register("email")}
                  />
                </Box>
                {errors.email && (
                  <Typography sx={styles.errorTextStyles}>
                    {errors.email.message}
                  </Typography>
                )}
              </Box>

              <Box sx={styles.fullWidthFieldStyles}>
                <Label sx={styles.passwordLabelStyles}>
                  <Typography as="span">Đổi mật khẩu mới</Typography>
                  <Typography as="span" sx={styles.optionalTextStyles}>
                    Bỏ trống nếu không đổi
                  </Typography>
                </Label>
                <Box sx={styles.inputWrapperStyles}>
                  <Box sx={styles.inputIconWrapperStyles}>
                    <Box component={Lock} sx={styles.inputIconStyles} />
                  </Box>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    sx={styles.passwordInputStyles}
                    {...register("password")}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={styles.preferencesSectionStyles}>
            <Typography as="h3" sx={styles.preferencesTitleStyles}>
              Sở thích ẩm thực
            </Typography>
            <Typography sx={styles.preferencesDescriptionStyles}>
              Chatbot sẽ dựa vào thông tin này để gọi ý món ăn phù hợp với bạn.
            </Typography>

            <Box sx={styles.preferenceGroupStyles}>
              <Box sx={styles.fieldStyles}>
                <Label sx={styles.labelStyles}>Dị ứng thực phẩm</Label>
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
                <Label sx={styles.labelStyles}>Món ăn yêu thích</Label>
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
                <Label sx={styles.labelStyles}>Món không thích</Label>
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
            </Box>
          </Box>

          <Box sx={styles.actionRowStyles}>
            <Button
              type="submit"
              disabled={isLoading}
              variant="default"
              sx={styles.submitButtonStyles}
            >
              {isLoading ? (
                <>
                  <Box component={Loader2} sx={styles.loadingIconStyles} />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Box component={Save} sx={styles.submitIconStyles} />
                  Lưu thay đổi
                </>
              )}
            </Button>
          </Box>
        </Form>
      </Box>
    </Box>
  );
}
