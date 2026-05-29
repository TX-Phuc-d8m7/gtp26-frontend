/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { Eye, Layers3, ListChecks, Save, Soup, Tags, X } from "lucide-react";

import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Image } from "@/shared/components/ui/image/index";
import { MultiSelectPills } from "@/shared/components/ui/multi-select-pills/index";
import { Typography } from "@/shared/components/ui/typography/index";

import {
  ADMIN_FOOD_DINING_CONTEXT_OPTIONS,
  ADMIN_FOOD_MEAL_CONTEXT_OPTIONS,
  ADMIN_FOOD_OCCASION_OPTIONS,
  ADMIN_FOOD_SOFT_TAG_GROUPS,
  ADMIN_FOOD_SOFT_TAG_OPTIONS,
  ADMIN_FOOD_TASTE_OPTIONS,
  AdminFoodChipFormField,
} from "../../_interface";
import {
  FoodFormDialogProps,
  FoodFormTextFieldConfig,
  styles,
} from ".";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=900";

const tabs = [
  { icon: Soup, label: "Thông tin món" },
  { icon: ListChecks, label: "Nguyên liệu" },
  { icon: Tags, label: "Phân loại AI" },
  { icon: Eye, label: "Preview & Indexing" },
] as const;

const basicFields: FoodFormTextFieldConfig[] = [
  {
    field: "name",
    label: "Tên món *",
    helperText: "Tên hiển thị trong search và chat.",
    placeholder: "Mì Quảng gà",
  },
  {
    field: "img_url",
    label: "URL ảnh",
    helperText: "URL ảnh công khai để hiển thị.",
    placeholder: "https://...",
  },
  {
    field: "description",
    label: "Mô tả",
    helperText: "Nên ngắn gọn, rõ nguyên liệu chính và cảm giác món ăn.",
    multiline: true,
    rows: 5,
    wide: true,
  },
  {
    field: "raw_instructions",
    label: "Cách làm / ghi chú vận hành",
    helperText: "Các bước nấu hoặc ghi chú cho admin nội dung.",
    multiline: true,
    rows: 5,
    wide: true,
  },
];

const ingredientFields: FoodFormTextFieldConfig[] = [
  {
    field: "core_ingredients",
    label: "Nguyên liệu chính",
    helperText: "Mỗi dòng hoặc dấu phẩy là một nguyên liệu chính.",
    multiline: true,
    rows: 9,
  },
  {
    field: "raw_ingredients",
    label: "Nguyên liệu đầy đủ",
    helperText: "Nguyên liệu đầy đủ, có thể kèm định lượng.",
    multiline: true,
    rows: 9,
  },
];

function getMergedOptions(options: readonly string[], value: string[]) {
  return [...options, ...value.filter((item) => !options.includes(item))];
}

function textToPreviewList(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderIcon(Icon: (typeof tabs)[number]["icon"]) {
  return <Box component={Icon} sx={{ width: 16, height: 16, mr: 0.85 }} />;
}

export default function FoodFormDialog({
  errors,
  formData,
  isSubmitting,
  mode,
  open,
  onChange,
  onClose,
  onSubmit,
}: FoodFormDialogProps) {
  const [activeTab, setActiveTab] = useState(0);
  const isCreateMode = mode === "create";

  useEffect(() => {
    if (open) setActiveTab(0);
  }, [open]);

  const coreIngredients = useMemo(
    () => textToPreviewList(formData.core_ingredients),
    [formData.core_ingredients],
  );
  const rawIngredients = useMemo(
    () => textToPreviewList(formData.raw_ingredients),
    [formData.raw_ingredients],
  );
  const knownSoftTagSet = useMemo(
    () => new Set<string>(ADMIN_FOOD_SOFT_TAG_OPTIONS),
    [],
  );
  const legacySoftTags = formData.soft_tags.filter(
    (item) => !knownSoftTagSet.has(item),
  );
  const previewTags = [
    ...formData.taste_profile,
    ...formData.meal_context,
    ...formData.soft_tags.slice(0, 4),
  ];

  const renderTextField = (config: FoodFormTextFieldConfig) => (
    <Box
      key={config.field}
      sx={config.wide ? styles.wideFieldStyles : undefined}
    >
      <TextField
        fullWidth
        error={Boolean(errors[config.field])}
        helperText={errors[config.field] ?? config.helperText}
        label={config.label}
        multiline={config.multiline}
        placeholder={config.placeholder}
        rows={config.rows}
        value={formData[config.field] as string}
        onChange={(event) => onChange(config.field, event.target.value)}
        sx={styles.fieldStyles}
      />
      {config.field === "description" && (
        <Typography as="p" sx={styles.charCounterStyles}>
          {(formData.description || "").length}/300 ký tự gợi ý
        </Typography>
      )}
    </Box>
  );

  const renderChipGroup = ({
    field,
    hint,
    key,
    label,
    options,
    strictOptions = false,
  }: {
    field: AdminFoodChipFormField;
    hint?: string;
    key?: string;
    label: string;
    options: readonly string[];
    /**
     * true  → chỉ hiện đúng options của group, không append selected values
     *         từ group khác (dùng cho ADMIN_FOOD_SOFT_TAG_GROUPS).
     * false → append custom/legacy values đang chọn vào cuối list
     *         (dùng cho taste_profile, meal_context, occasion_context).
     */
    strictOptions?: boolean;
  }) => {
    const value = formData[field];
    const displayOptions = strictOptions
      ? [...options]
      : getMergedOptions(options, value);
    return (
      <Box key={key ?? label} sx={styles.formSectionStyles}>
        <Typography as="p" sx={styles.chipFieldLabelStyles}>
          {label}
        </Typography>
        {hint && (
          <Typography as="p" sx={styles.chipFieldHintStyles}>
            {hint}
          </Typography>
        )}
        <MultiSelectPills
          options={displayOptions}
          value={value}
          onChange={(value) => onChange(field, value)}
        />
      </Box>
    );
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: styles.paperStyles } }}
    >
      <Box
        component="form"
        sx={styles.formStyles}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <DialogTitle sx={styles.titleStyles}>
          {isCreateMode ? "Tạo món ăn mới" : "Chỉnh sửa món ăn"}
          <Typography as="p" sx={styles.subtitleStyles}>
            Food Editor tách thông tin, nguyên liệu, phân loại AI và preview để
            nhập nhanh hơn, giảm sai tag và hiểu rõ dữ liệu nào ảnh hưởng tới
            gợi ý.
          </Typography>
        </DialogTitle>

        <DialogContent sx={styles.contentStyles}>
          <Box sx={styles.editorShellStyles}>
            <Tabs
              orientation="vertical"
              value={activeTab}
              onChange={(_, value) => setActiveTab(value)}
              sx={styles.tabsPanelStyles}
            >
              {tabs.map(({ icon: Icon, label }) => (
                <Tab
                  key={label}
                  icon={renderIcon(Icon)}
                  iconPosition="start"
                  label={label}
                  sx={styles.tabStyles}
                />
              ))}
            </Tabs>

            <Box sx={styles.tabContentStyles}>
              {activeTab === 0 && (
                <Box sx={styles.previewGridStyles}>
                  <Box sx={styles.formSectionStyles}>
                    <Typography as="p" sx={styles.formSectionHeaderStyles}>
                      Thông tin cơ bản
                    </Typography>
                    <Typography as="p" sx={styles.sectionIntroStyles}>
                      Đây là nhóm field tác động mạnh đến cách món xuất hiện
                      trong chat, search và embedding.
                    </Typography>
                    <Box sx={styles.fieldGridStyles}>
                      {basicFields.map(renderTextField)}
                    </Box>

                    {/* Dining context */}
                    <Box sx={styles.wideFieldStyles}>
                      <Typography as="p" sx={styles.diningContextLabelStyles}>
                        Ngữ cảnh phục vụ
                      </Typography>
                      <Typography as="p" sx={styles.diningContextHintStyles}>
                        Quyết định nút "Quán gần đây" có hiện không. Gemini đã
                        phân loại tự động — chỉnh sửa khi phân loại sai.
                      </Typography>
                      <Select
                        fullWidth
                        size="small"
                        value={formData.dining_context || "both"}
                        onChange={(e) => onChange("dining_context", e.target.value)}
                        sx={styles.selectInputStyles}
                        MenuProps={{
                          slotProps: { paper: { sx: styles.selectMenuPaperStyles } },
                        }}
                      >
                        {ADMIN_FOOD_DINING_CONTEXT_OPTIONS.map((opt) => (
                          <MenuItem key={opt.value} value={opt.value}>
                            <Box>
                              <Typography as="span" sx={styles.menuItemTitleStyles}>
                                {opt.label}
                              </Typography>
                              <Typography as="p" sx={styles.menuItemDescStyles}>
                                {opt.description}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Box>

                  <Box sx={styles.previewCardStyles}>
                    <Image
                      src={formData.img_url || FALLBACK_IMAGE}
                      alt={formData.name || "Food preview"}
                      sx={styles.previewImageStyles}
                    />
                    <Box sx={styles.previewBodyStyles}>
                      <Typography as="h3" sx={styles.previewTitleStyles}>
                        {formData.name || "Tên món sẽ hiển thị ở đây"}
                      </Typography>
                      <Typography as="p" sx={styles.previewDescriptionStyles}>
                        {formData.description ||
                          "Mô tả ngắn giúp admin hình dung món ăn trước khi lưu."}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {activeTab === 1 && (
                <Box sx={styles.formSectionStyles}>
                  <Typography as="p" sx={styles.formSectionHeaderStyles}>
                    Nguyên liệu
                  </Typography>
                  <Typography as="p" sx={styles.sectionIntroStyles}>
                    Nguyên liệu chính giúp sinh ingredient keys, còn nguyên liệu
                    đầy đủ giúp AI hiểu món sâu hơn khi giải thích gợi ý.
                  </Typography>
                  <Box sx={styles.fieldGridStyles}>
                    {ingredientFields.map(renderTextField)}
                  </Box>
                </Box>
              )}

              {activeTab === 2 && (
                <>
                  {renderChipGroup({
                    field: "taste_profile",
                    hint: "Dùng cho hồ sơ khẩu vị và scoring theo vị.",
                    label: "Khẩu vị",
                    options: ADMIN_FOOD_TASTE_OPTIONS,
                  })}
                  {renderChipGroup({
                    field: "meal_context",
                    hint: "Dùng để lọc theo thời điểm ăn trong ngày.",
                    label: "Bữa ăn phù hợp",
                    options: ADMIN_FOOD_MEAL_CONTEXT_OPTIONS,
                  })}
                  {renderChipGroup({
                    field: "occasion_context",
                    hint: "Dùng cho ngữ cảnh sử dụng món ăn.",
                    label: "Ngữ cảnh dùng món",
                    options: ADMIN_FOOD_OCCASION_OPTIONS,
                  })}
                  {ADMIN_FOOD_SOFT_TAG_GROUPS.map((group) =>
                    renderChipGroup({
                      key: `soft_tags-${group.label}`,
                      field: "soft_tags",
                      hint: "Nhóm này vẫn được gom vào field soft_tags khi lưu.",
                      label: group.label,
                      options: group.options,
                      strictOptions: true,
                    }),
                  )}
                  {legacySoftTags.length > 0 &&
                    renderChipGroup({
                      field: "soft_tags",
                      hint: "Các tag này đang có trong database nhưng chưa nằm trong bộ option chuẩn.",
                      label: "Tags dữ liệu cũ / ngoài chuẩn",
                      options: legacySoftTags,
                      strictOptions: true,
                    })}
                </>
              )}

              {activeTab === 3 && (
                <Box sx={styles.previewGridStyles}>
                  <Box sx={styles.formSectionStyles}>
                    <Typography as="p" sx={styles.formSectionHeaderStyles}>
                      Preview dữ liệu AI
                    </Typography>
                    <Box sx={styles.metricGridStyles}>
                      <Box sx={styles.metricCardStyles}>
                        <Typography as="p" sx={styles.metricLabelStyles}>
                          Nguyên liệu chính
                        </Typography>
                        <Typography as="p" sx={styles.metricValueStyles}>
                          {coreIngredients.length}
                        </Typography>
                      </Box>
                      <Box sx={styles.metricCardStyles}>
                        <Typography as="p" sx={styles.metricLabelStyles}>
                          Nguyên liệu đầy đủ
                        </Typography>
                        <Typography as="p" sx={styles.metricValueStyles}>
                          {rawIngredients.length}
                        </Typography>
                      </Box>
                      <Box sx={styles.metricCardStyles}>
                        <Typography as="p" sx={styles.metricLabelStyles}>
                          Tag phân loại
                        </Typography>
                        <Typography as="p" sx={styles.metricValueStyles}>
                          {formData.soft_tags.length +
                            formData.taste_profile.length +
                            formData.meal_context.length +
                            formData.occasion_context.length}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography as="p" sx={styles.indexingNoticeStyles}>
                      Các thay đổi ở tên món, mô tả, nguyên liệu, cách làm và
                      tag phân loại đều ảnh hưởng tới embedding. Backend hiện tự
                      rebuild embedding khi cập nhật nội dung; khi tạo mới có
                      thể bật/tắt tự động sinh embedding bên dưới.
                    </Typography>

                    {isCreateMode && (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.autoEmbed}
                            onChange={(event) =>
                              onChange("autoEmbed", event.target.checked)
                            }
                          />
                        }
                        label="Tự động sinh embedding sau khi tạo"
                        labelPlacement="start"
                        sx={styles.switchPanelStyles}
                      />
                    )}
                  </Box>

                  <Box sx={styles.previewCardStyles}>
                    <Image
                      src={formData.img_url || FALLBACK_IMAGE}
                      alt={formData.name || "Food preview"}
                      sx={styles.previewImageStyles}
                    />
                    <Box sx={styles.previewBodyStyles}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Layers3 size={16} />
                        <Typography as="p" sx={styles.formSectionHeaderStyles}>
                          User-facing card
                        </Typography>
                      </Box>
                      <Typography as="h3" sx={styles.previewTitleStyles}>
                        {formData.name || "Tên món"}
                      </Typography>
                      <Typography as="p" sx={styles.previewDescriptionStyles}>
                        {formData.description || "Mô tả món ăn"}
                      </Typography>
                      <Box sx={styles.previewChipWrapStyles}>
                        {previewTags.length > 0 ? (
                          previewTags.map((tag) => (
                            <Box
                              key={tag}
                              component="span"
                              sx={styles.previewChipStyles}
                            >
                              {tag}
                            </Box>
                          ))
                        ) : (
                          <Typography
                            as="p"
                            sx={styles.previewDescriptionStyles}
                          >
                            Chọn tag ở tab Phân loại AI để xem preview.
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={styles.actionsStyles}>
          <Button
            type="button"
            variant="ghost"
            sx={styles.cancelButtonStyles}
            disabled={isSubmitting}
            onClick={onClose}
          >
            <X size={16} />
            Hủy
          </Button>
          <Button
            type="submit"
            variant="brand"
            sx={styles.submitButtonStyles}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={16} /> : <Save size={16} />}
            {isCreateMode ? "Tạo món" : "Lưu thay đổi"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
