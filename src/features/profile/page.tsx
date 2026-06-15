/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { Controller } from "react-hook-form";
import type { Path } from "react-hook-form";
import {
  ArrowLeft,
  ChefHat,
  CheckCircle2,
  Flame,
  HeartPulse,
  Loader2,
  Lock,
  Mail,
  Salad,
  Save,
  Sparkles,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { styles, useProfile } from ".";
import {
  DEMO_HEALTH_RISK_OPTIONS,
  DISH_TYPE_OPTIONS,
  FAVORITE_INGREDIENT_OPTIONS,
  getHealthRiskDisplayLabel,
  TASTE_PREFERENCE_OPTIONS,
} from "@/features/profile/_interface";
import type {
  ProfileFormData,
  ProfilePreferenceVariant,
} from "@/features/profile/_interface";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Form } from "@/shared/components/ui/form/index";
import { Input } from "@/shared/components/ui/input/index";
import { Label } from "@/shared/components/ui/label/index";
import {
  MultiSelectPills,
  type MultiSelectPillOption,
} from "@/shared/components/ui/multi-select-pills/index";
import { Typography } from "@/shared/components/ui/typography/index";

const PROFILE_FORM_ID = "profile-form";

const navItems = [
  { href: "#profile-account", label: "Tài khoản" },
  { href: "#profile-health", label: "Hồ sơ sức khỏe" },
] as const;

export default function Profile() {
  const {
    register,
    control,
    handleSubmit,
    errors,
    handleBack,
    isDirty,
    isFetching,
    isLoading,
    onSubmit,
    profileValues,
  } = useProfile();

  const completedFields = [
    profileValues.fullName,
    profileValues.email,
    profileValues.healthRisks,
    profileValues.favorites,
    profileValues.tastePreferences,
    profileValues.dishTypes,
  ].filter((value) =>
    Array.isArray(value) ? value.length > 0 : Boolean(value),
  );
  const completionPercent = Math.round((completedFields.length / 6) * 100);
  const healthSignals = profileValues.healthRisks.length;
  const tasteSignals =
    profileValues.favorites.length +
    profileValues.tastePreferences.length +
    profileValues.dishTypes.length;
  const insightItems = [
    profileValues.healthRisks.length
      ? `Lưu ý ${profileValues.healthRisks
          .slice(0, 2)
          .map(getHealthRiskDisplayLabel)
          .join(", ")}`
      : null,
    profileValues.favorites.length
      ? `Thích ${profileValues.favorites.slice(0, 2).join(", ")}`
      : null,
    profileValues.tastePreferences.length
      ? `Gu ${profileValues.tastePreferences.slice(0, 2).join(", ")}`
      : null,
    profileValues.dishTypes.length
      ? `Cách nấu ${profileValues.dishTypes.slice(0, 2).join(", ")}`
      : null,
  ].filter(Boolean) as string[];

  return (
    <Box sx={styles.pageShellStyles}>
      {isFetching && (
        <LinearProgress
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            height: 3,
            "& .MuiLinearProgress-bar": { backgroundColor: "#ea580c" },
            backgroundColor: "rgba(234,88,12,0.15)",
          }}
        />
      )}
      <Box sx={styles.pageBackgroundStyles} />

      <Box sx={styles.controlHeaderStyles}>
        <Box sx={styles.controlHeaderInnerStyles}>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleBack}
            sx={styles.backButtonStyles}
          >
            <Box component={ArrowLeft} sx={styles.backIconStyles} />
          </Button>

          <Box sx={styles.controlTitleBlockStyles}>
            <Typography as="h1" sx={styles.titleStyles}>
              Hồ sơ cá nhân
            </Typography>
            <Typography sx={styles.descriptionStyles}>
              Dữ liệu này giúp AI gợi ý món phù hợp hơn trong từng cuộc chat.
            </Typography>
          </Box>

          <Box sx={styles.headerNavStyles}>
            {navItems.map((item) => (
              <Box
                key={item.href}
                component="a"
                href={item.href}
                sx={styles.headerNavLinkStyles}
              >
                {item.label}
              </Box>
            ))}
          </Box>

          <Box sx={styles.headerActionStyles}>
            <Box sx={styles.saveStatusStyles(isDirty)}>
              <Box component={CheckCircle2} sx={styles.saveStatusIconStyles} />
              {isDirty ? "Có thay đổi" : "Đã lưu"}
            </Box>
            <Button
              type="submit"
              form={PROFILE_FORM_ID}
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
                  Lưu
                </>
              )}
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={styles.containerStyles}>
        <Box sx={styles.cockpitLayoutStyles}>
          <Box sx={styles.summarySidebarStyles}>
            <Box sx={styles.profileIdentityCardStyles}>
              <Box sx={styles.avatarStyles}>
                {profileValues.fullName
                  .split(" ")
                  .slice(-1)[0]
                  ?.charAt(0)
                  .toUpperCase() || "U"}
              </Box>
              <Box sx={styles.identityCopyStyles}>
                <Typography sx={styles.identityNameStyles}>
                  {profileValues.fullName}
                </Typography>
                <Typography sx={styles.identityEmailStyles}>
                  {profileValues.email}
                </Typography>
              </Box>
            </Box>

            <Box sx={styles.aiSummaryCardStyles}>
              <Box sx={styles.summaryHeaderStyles}>
                <Box sx={styles.summaryIconStyles}>
                  <Box component={Sparkles} sx={styles.summaryIconSvgStyles} />
                </Box>
                <Box>
                  <Typography sx={styles.summaryTitleStyles}>
                    AI hiểu bạn như thế nào?
                  </Typography>
                  <Typography sx={styles.summaryDescriptionStyles}>
                    Các tín hiệu này sẽ được đưa vào bộ lọc ngầm khi chat.
                  </Typography>
                </Box>
              </Box>

              <Box sx={styles.profileScoreStyles}>
                <Typography sx={styles.profileScoreNumberStyles}>
                  {completionPercent}%
                </Typography>
                <Box sx={styles.profileScoreMetaStyles}>
                  <Typography sx={styles.profileScoreLabelStyles}>
                    hồ sơ hoàn thiện
                  </Typography>
                  <Box sx={styles.profileScoreTrackStyles}>
                    <Box
                      sx={styles.profileScoreFillStyles(completionPercent)}
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={styles.summaryMetricGridStyles}>
                <SummaryMetric
                  label="Sức khỏe"
                  value={healthSignals}
                  helper="tín hiệu"
                />
                <SummaryMetric
                  label="Khẩu vị"
                  value={tasteSignals}
                  helper="tín hiệu"
                />
              </Box>

              <Box sx={styles.insightListStyles}>
                {insightItems.map((item) => (
                  <Box key={item} sx={styles.insightChipStyles}>
                    {item}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box sx={styles.contentColumnStyles}>
            <Form
              id={PROFILE_FORM_ID}
              onSubmit={handleSubmit(onSubmit)}
              sx={styles.formStyles}
            >
              <Box id="profile-account" sx={styles.sectionCardStyles}>
                <Box sx={styles.sectionHeaderStyles}>
                  <Box sx={styles.sectionIconStyles("default")}>
                    <Box component={User} sx={styles.preferenceIconSvgStyles} />
                  </Box>
                  <Box>
                    <Typography as="h2" sx={styles.sectionTitleStyles}>
                      Thông tin tài khoản
                    </Typography>
                    <Typography sx={styles.sectionDescriptionStyles}>
                      Thông tin cơ bản và bảo mật tài khoản.
                    </Typography>
                  </Box>
                </Box>

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
                      <Typography as="span">Mật khẩu hiện tại</Typography>
                      <Typography as="span" sx={styles.optionalTextStyles}>
                        Bắt buộc khi đổi mật khẩu
                      </Typography>
                    </Label>
                    <Box sx={styles.inputWrapperStyles}>
                      <Box sx={styles.inputIconWrapperStyles}>
                        <Box component={Lock} sx={styles.inputIconStyles} />
                      </Box>
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu hiện tại"
                        sx={styles.passwordInputStyles}
                        {...register("currentPassword")}
                      />
                    </Box>
                    {errors.currentPassword && (
                      <Typography sx={styles.errorTextStyles}>
                        {errors.currentPassword.message}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={styles.fullWidthFieldStyles}>
                    <Label sx={styles.passwordLabelStyles}>
                      <Typography as="span">Mật khẩu mới</Typography>
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
                        placeholder="Mật khẩu mới tối thiểu 6 ký tự"
                        sx={styles.passwordInputStyles}
                        {...register("password")}
                      />
                    </Box>
                    {errors.password && (
                      <Typography sx={styles.errorTextStyles}>
                        {errors.password.message}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={styles.fullWidthFieldStyles}>
                    <Label sx={styles.passwordLabelStyles}>
                      <Typography as="span">Xác nhận mật khẩu mới</Typography>
                      <Typography as="span" sx={styles.optionalTextStyles}>
                        Nhập lại mật khẩu mới
                      </Typography>
                    </Label>
                    <Box sx={styles.inputWrapperStyles}>
                      <Box sx={styles.inputIconWrapperStyles}>
                        <Box component={Lock} sx={styles.inputIconStyles} />
                      </Box>
                      <Input
                        type="password"
                        placeholder="Nhập lại mật khẩu mới"
                        sx={styles.passwordInputStyles}
                        {...register("confirmPassword")}
                      />
                    </Box>
                    {errors.confirmPassword && (
                      <Typography sx={styles.errorTextStyles}>
                        {errors.confirmPassword.message}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box id="profile-health" sx={styles.sectionCardStyles}>
                <Box sx={styles.sectionHeaderStyles}>
                  <Box sx={styles.sectionIconStyles("danger")}>
                    <Box
                      component={HeartPulse}
                      sx={styles.preferenceIconSvgStyles}
                    />
                  </Box>
                  <Box>
                    <Typography as="h2" sx={styles.sectionTitleStyles}>
                      Hồ sơ sức khỏe & khẩu vị
                    </Typography>
                    <Typography sx={styles.sectionDescriptionStyles}>
                      Các dữ liệu này giúp AI lọc rủi ro và hiểu cách bạn muốn
                      ăn.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={styles.preferenceGridStyles}>
                  <PreferenceField
                    control={control}
                    name="healthRisks"
                    label="Bệnh lý và dị ứng"
                    description="Demo hiện tập trung vào 3 dị ứng và 3 bệnh lý chính để AI lọc món an toàn."
                    options={DEMO_HEALTH_RISK_OPTIONS}
                    variant="danger"
                    Icon={HeartPulse}
                  />
                  <PreferenceField
                    control={control}
                    name="favorites"
                    label="Nguyên liệu yêu thích"
                    description="Những nguyên liệu bạn muốn hệ thống ưu tiên khi gợi ý món."
                    options={FAVORITE_INGREDIENT_OPTIONS}
                    variant="success"
                    Icon={Salad}
                  />
                  <PreferenceField
                    control={control}
                    name="tastePreferences"
                    label="Khẩu vị yêu thích"
                    description="Vị cay, ngọt, thanh đạm hoặc đậm vị bạn hay chọn."
                    options={TASTE_PREFERENCE_OPTIONS}
                    variant="default"
                    Icon={Flame}
                  />
                  <PreferenceField
                    control={control}
                    name="dishTypes"
                    label="Cách nấu yêu thích"
                    description="Kiểu chế biến bạn thích để AI chọn món đúng gu hơn."
                    options={DISH_TYPE_OPTIONS}
                    variant="success"
                    Icon={ChefHat}
                  />
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
      </Box>
    </Box>
  );
}

function SummaryMetric({
  label,
  value,
  helper,
}: {
  label: string;
  value: number;
  helper: string;
}) {
  return (
    <Box sx={styles.summaryMetricStyles}>
      <Typography sx={styles.summaryMetricValueStyles}>{value}</Typography>
      <Typography sx={styles.summaryMetricLabelStyles}>{label}</Typography>
      <Typography sx={styles.summaryMetricHelperStyles}>{helper}</Typography>
    </Box>
  );
}

function PreferenceField({
  control,
  name,
  label,
  description,
  options,
  variant,
  Icon,
}: {
  control: ReturnType<typeof useProfile>["control"];
  name: Path<ProfileFormData>;
  label: string;
  description: string;
  options: Array<string | MultiSelectPillOption>;
  variant: ProfilePreferenceVariant;
  Icon: LucideIcon;
}) {
  return (
    <Box sx={styles.preferenceCardStyles}>
      <Box sx={styles.preferenceCardHeaderStyles}>
        <Box sx={styles.preferenceIconStyles(variant)}>
          <Box component={Icon} sx={styles.preferenceIconSvgStyles} />
        </Box>
        <Box sx={styles.preferenceLabelBlockStyles}>
          <Label sx={styles.labelStyles}>{label}</Label>
          <Typography sx={styles.fieldDescriptionStyles}>
            {description}
          </Typography>
        </Box>
      </Box>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MultiSelectPills
            options={options}
            value={Array.isArray(field.value) ? field.value : []}
            onChange={field.onChange}
            variant={variant}
          />
        )}
      />
    </Box>
  );
}
