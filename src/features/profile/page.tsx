/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { Controller } from "react-hook-form";
import type { Path } from "react-hook-form";
import {
  ALLERGY_OPTIONS,
  DISLIKE_OPTIONS,
  FAVORITE_OPTIONS,
} from "@/features/auth/onboarding";
import {
  ArrowLeft,
  Ban,
  CheckCircle2,
  Clock3,
  Flame,
  HeartPulse,
  Loader2,
  Lock,
  Mail,
  Salad,
  Save,
  Sparkles,
  Target,
  User,
  Utensils,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { styles, useProfile } from ".";
import {
  BUDGET_LEVEL_OPTIONS,
  DIET_TYPE_OPTIONS,
  MEAL_TIME_OPTIONS,
  MEDICAL_CONDITION_OPTIONS,
  NUTRITION_GOAL_OPTIONS,
  TASTE_PREFERENCE_OPTIONS,
} from "@/features/profile/_interface";
import type {
  ProfileFormData,
  ProfilePreferenceVariant,
} from "@/features/profile/_interface";
import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Form } from "@/shared/components/ui/form/index";
import { Input } from "@/shared/components/ui/input/index";
import { Label } from "@/shared/components/ui/label/index";
import { MultiSelectPills } from "@/shared/components/ui/multi-select-pills/index";
import { Typography } from "@/shared/components/ui/typography/index";

const PROFILE_FORM_ID = "profile-form";

const navItems = [
  { href: "#profile-account", label: "Tài khoản" },
  { href: "#profile-health", label: "Sức khỏe" },
  { href: "#profile-taste", label: "Khẩu vị" },
  { href: "#profile-context", label: "Bối cảnh ăn" },
] as const;

export default function Profile() {
  const {
    register,
    control,
    handleSubmit,
    errors,
    handleBack,
    isDirty,
    isLoading,
    onSubmit,
    profileValues,
  } = useProfile();

  const completedFields = [
    profileValues.fullName,
    profileValues.email,
    profileValues.allergies,
    profileValues.medicalConditions,
    profileValues.dietTypes,
    profileValues.favorites,
    profileValues.dislikes,
    profileValues.tastePreferences,
    profileValues.budgetLevels,
    profileValues.mealTimes,
    profileValues.nutritionGoals,
  ].filter((value) =>
    Array.isArray(value) ? value.length > 0 : Boolean(value),
  );
  const completionPercent = Math.round((completedFields.length / 11) * 100);
  const healthSignals =
    profileValues.allergies.length +
    profileValues.medicalConditions.length +
    profileValues.dietTypes.length;
  const tasteSignals =
    profileValues.favorites.length +
    profileValues.dislikes.length +
    profileValues.tastePreferences.length;
  const contextSignals =
    profileValues.budgetLevels.length +
    profileValues.mealTimes.length +
    profileValues.nutritionGoals.length;
  const insightItems = [
    profileValues.allergies.length
      ? `Tránh ${profileValues.allergies.slice(0, 2).join(", ")}`
      : null,
    profileValues.dietTypes.length
      ? `Ưu tiên ${profileValues.dietTypes.slice(0, 2).join(", ")}`
      : null,
    profileValues.tastePreferences.length
      ? `Gu ${profileValues.tastePreferences.slice(0, 2).join(", ")}`
      : null,
    profileValues.budgetLevels.length
      ? `Ngân sách ${profileValues.budgetLevels[0].toLowerCase()}`
      : null,
    profileValues.mealTimes.length
      ? `Hay ăn ${profileValues.mealTimes[0].toLowerCase()}`
      : null,
    profileValues.nutritionGoals.length
      ? `Mục tiêu ${profileValues.nutritionGoals[0].toLowerCase()}`
      : null,
  ].filter(Boolean) as string[];

  return (
    <Box sx={styles.pageShellStyles}>
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
                <SummaryMetric
                  label="Bối cảnh"
                  value={contextSignals}
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
                      Hồ sơ sức khỏe
                    </Typography>
                    <Typography sx={styles.sectionDescriptionStyles}>
                      Các dữ liệu an toàn giúp AI tránh món có rủi ro.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={styles.preferenceGridStyles}>
                  <PreferenceField
                    control={control}
                    name="allergies"
                    label="Dị ứng thực phẩm"
                    description="Các nguyên liệu cần loại trừ tuyệt đối khi gợi ý món."
                    options={ALLERGY_OPTIONS}
                    variant="danger"
                    Icon={HeartPulse}
                  />
                  <PreferenceField
                    control={control}
                    name="dislikes"
                    label="Nguyên liệu không thích"
                    description="Những món hoặc nguyên liệu bạn thường muốn tránh."
                    options={DISLIKE_OPTIONS}
                    variant="danger"
                    Icon={Ban}
                  />
                  <PreferenceField
                    control={control}
                    name="medicalConditions"
                    label="Bệnh lý nền"
                    description="Dùng để tránh món có rủi ro với tình trạng sức khỏe."
                    options={MEDICAL_CONDITION_OPTIONS}
                    variant="default"
                    Icon={HeartPulse}
                  />
                  <PreferenceField
                    control={control}
                    name="dietTypes"
                    label="Chế độ ăn kiêng"
                    description="Các nguyên tắc ăn uống cố định bạn đang theo."
                    options={DIET_TYPE_OPTIONS}
                    variant="success"
                    Icon={Salad}
                  />
                </Box>
              </Box>

              <Box id="profile-taste" sx={styles.sectionCardStyles}>
                <Box sx={styles.sectionHeaderStyles}>
                  <Box sx={styles.sectionIconStyles("success")}>
                    <Box
                      component={Utensils}
                      sx={styles.preferenceIconSvgStyles}
                    />
                  </Box>
                  <Box>
                    <Typography as="h2" sx={styles.sectionTitleStyles}>
                      Khẩu vị & món yêu thích
                    </Typography>
                    <Typography sx={styles.sectionDescriptionStyles}>
                      Cho AI biết gu ăn uống để gợi ý tự nhiên hơn.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={styles.preferenceGridStyles}>
                  <PreferenceField
                    control={control}
                    name="favorites"
                    label="Món ăn yêu thích"
                    description="Các nhóm món giúp AI hiểu gu ăn uống quen thuộc của bạn."
                    options={FAVORITE_OPTIONS}
                    variant="success"
                    Icon={Utensils}
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
                </Box>
              </Box>

              <Box id="profile-context" sx={styles.sectionCardStyles}>
                <Box sx={styles.sectionHeaderStyles}>
                  <Box sx={styles.sectionIconStyles("default")}>
                    <Box
                      component={Target}
                      sx={styles.preferenceIconSvgStyles}
                    />
                  </Box>
                  <Box>
                    <Typography as="h2" sx={styles.sectionTitleStyles}>
                      Ngân sách & mục tiêu
                    </Typography>
                    <Typography sx={styles.sectionDescriptionStyles}>
                      Tối ưu gợi ý theo thời điểm, giá tiền và mục tiêu ăn uống.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={styles.preferenceGridStyles}>
                  <PreferenceField
                    control={control}
                    name="budgetLevels"
                    label="Mức ngân sách"
                    description="Giúp hệ thống ưu tiên món và địa điểm hợp túi tiền."
                    options={BUDGET_LEVEL_OPTIONS}
                    variant="default"
                    Icon={Wallet}
                  />
                  <PreferenceField
                    control={control}
                    name="mealTimes"
                    label="Thời điểm ăn"
                    description="Mỗi khung giờ sẽ ưu tiên kiểu món khác nhau."
                    options={MEAL_TIME_OPTIONS}
                    variant="default"
                    Icon={Clock3}
                  />
                  <PreferenceField
                    control={control}
                    name="nutritionGoals"
                    label="Mục tiêu ăn uống"
                    description="Mục tiêu cá nhân để AI cân bằng giữa ngon và phù hợp."
                    options={NUTRITION_GOAL_OPTIONS}
                    variant="success"
                    Icon={Target}
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
  options: string[];
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
