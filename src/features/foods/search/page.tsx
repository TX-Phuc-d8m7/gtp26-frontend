/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Search,
  Sparkles,
  Tag,
  Utensils,
  X,
} from "lucide-react";

import type {
  FoodSearchUIProps,
  RankedFood,
  SearchSuggestion,
} from "./_interface";
import { styles } from "./_styles";
import { useFoodSearch } from "./_use-food-search";
import type { SearchFood } from "./mockData";

const suggestionTypeLabels: Record<SearchSuggestion["type"], string> = {
  dish: "Món ăn",
  tag: "Thẻ gợi ý",
  ingredient: "Nguyên liệu",
};

export default function FoodSearchUI(props: FoodSearchUIProps = {}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    query,
    selectedTags,
    selectedFood,
    allTags,
    rankedFoods,
    suggestions,
    isSuggestionOpen,
    clearSearch,
    handleBack,
    selectSuggestion,
    setIsSuggestionOpen,
    setQuery,
    setSelectedFood,
    toggleTag,
  } = useFoodSearch(props);
  const hasActiveSearch = Boolean(query.trim()) || selectedTags.length > 0;

  return (
    <Box sx={styles.rootStyles(Boolean(props.onClose))}>
      <Box sx={styles.shellStyles}>
        <Box sx={styles.topBarStyles}>
          <IconButton
            aria-label="Quay lại"
            onClick={handleBack}
            sx={styles.backButtonStyles}
          >
            <ArrowLeft size={20} />
          </IconButton>

          <Box sx={styles.titleBlockStyles}>
            <Typography sx={styles.eyebrowStyles}>
              <Sparkles size={16} />
              Gợi ý đặc sản Đà Nẵng
            </Typography>
            <Typography component="h1" sx={styles.titleStyles}>
              Hôm nay bạn muốn ăn gì?
            </Typography>
            <Typography sx={styles.subtitleStyles}>
              Tìm theo tên món, nguyên liệu, khẩu vị hoặc nhu cầu ăn uống. Kết
              quả được xếp hạng theo mức độ phù hợp với truy vấn của bạn.
            </Typography>
          </Box>
        </Box>

        <Paper elevation={0} sx={styles.heroPanelStyles}>
          <Box sx={styles.searchAreaStyles}>
            <TextField
              fullWidth
              value={query}
              placeholder="Ví dụ: mi quang, ít dầu, hải sản, tôm..."
              onBlur={() => {
                setTimeout(() => setIsSuggestionOpen(false), 120);
              }}
              onChange={(event) => {
                setQuery(event.target.value);
                setIsSuggestionOpen(true);
              }}
              onFocus={() => setIsSuggestionOpen(true)}
              sx={styles.searchInputStyles}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={20} />
                    </InputAdornment>
                  ),
                  endAdornment: hasActiveSearch ? (
                    <InputAdornment position="end">
                      <Button size="small" onClick={clearSearch}>
                        Xóa
                      </Button>
                    </InputAdornment>
                  ) : null,
                },
              }}
            />

            {isSuggestionOpen && suggestions.length > 0 ? (
              <Paper
                elevation={0}
                onMouseDown={(event) => event.preventDefault()}
                sx={styles.suggestionPaperStyles}
              >
                {suggestions.map((suggestion) => (
                  <SuggestionItem
                    key={suggestion.id}
                    suggestion={suggestion}
                    onSelect={selectSuggestion}
                  />
                ))}
              </Paper>
            ) : null}
          </Box>

          <Box sx={styles.tagRailStyles}>
            {allTags.map((tag) => {
              const isActive = selectedTags.includes(tag);

              return (
                <Chip
                  key={tag}
                  clickable
                  label={tag}
                  variant="outlined"
                  onClick={() => toggleTag(tag)}
                  sx={styles.tagChipStyles(isActive)}
                />
              );
            })}
          </Box>
        </Paper>

        <Box sx={styles.statusRowStyles}>
          <Typography sx={styles.resultCountStyles}>
            {rankedFoods.length} món phù hợp
          </Typography>
          <Typography sx={styles.helperTextStyles}>
            Chạm vào một món để xem nguyên liệu, tag mềm và địa điểm gợi ý.
          </Typography>
        </Box>

        {rankedFoods.length > 0 ? (
          <Box sx={styles.gridStyles}>
            {rankedFoods.map((result) => (
              <FoodResultCard
                key={result.food.id}
                result={result}
                onSelect={() => setSelectedFood(result.food)}
              />
            ))}
          </Box>
        ) : (
          <EmptyState onClear={clearSearch} />
        )}
      </Box>

      <FoodDetailDialog
        food={selectedFood}
        fullScreen={isMobile}
        onClose={() => setSelectedFood(null)}
      />
    </Box>
  );
}

function SuggestionItem({
  suggestion,
  onSelect,
}: {
  suggestion: SearchSuggestion;
  onSelect: (suggestion: SearchSuggestion) => void;
}) {
  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={() => onSelect(suggestion)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onSelect(suggestion);
        }
      }}
      sx={styles.suggestionItemStyles}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          gap: 1.25,
        }}
      >
        {getSuggestionIcon(suggestion.type)}
        <Typography sx={{ fontWeight: 700 }}>{suggestion.label}</Typography>
      </Box>
      <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
        {suggestionTypeLabels[suggestion.type]}
      </Typography>
    </Box>
  );
}

function FoodResultCard({
  result,
  onSelect,
}: {
  result: RankedFood;
  onSelect: () => void;
}) {
  const { food, matchedTerms, score } = result;
  const scoreLabel = score > 0 ? `${Math.min(99, score)}% hợp` : "Nên thử";

  return (
    <Card elevation={0} sx={styles.cardStyles}>
      <CardActionArea onClick={onSelect} sx={styles.cardActionStyles}>
        <CardMedia
          image={food.image}
          title={food.name}
          sx={styles.cardMediaStyles}
        />
        <CardContent sx={styles.cardContentStyles}>
          <Box sx={styles.cardHeaderStyles}>
            <Typography component="h2" sx={styles.foodNameStyles}>
              {food.name}
            </Typography>
            <Box sx={styles.scoreBadgeStyles}>{scoreLabel}</Box>
          </Box>

          <Typography sx={styles.descriptionStyles}>
            {food.description}
          </Typography>

          <Box sx={styles.chipWrapStyles}>
            {food.soft_tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={styles.softTagStyles}
              />
            ))}
          </Box>

          {matchedTerms.length > 0 ? (
            <Typography sx={styles.helperTextStyles}>
              Khớp: {matchedTerms.join(", ")}
            </Typography>
          ) : null}

          <Box sx={styles.locationLineStyles}>
            <MapPin size={16} />
            <span>
              {food.locations[0].name} · {food.locations.length} địa điểm
            </span>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function FoodDetailDialog({
  food,
  fullScreen,
  onClose,
}: {
  food: SearchFood | null;
  fullScreen: boolean;
  onClose: () => void;
}) {
  if (!food) return null;

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={Boolean(food)}
      onClose={onClose}
      slotProps={{ paper: { sx: styles.dialogPaperStyles } }}
    >
      <DialogContent sx={{ padding: 0 }}>
        <Box sx={styles.detailHeroStyles}>
          <Box
            component="img"
            src={food.image}
            alt={food.name}
            sx={styles.detailImageStyles}
          />
          <Box sx={styles.detailOverlayStyles} />
          <IconButton
            aria-label="Đóng"
            onClick={onClose}
            sx={styles.closeButtonStyles}
          >
            <X size={20} />
          </IconButton>
          <Box sx={styles.detailTitleWrapStyles}>
            <Typography component="h2" sx={styles.titleStyles}>
              {food.name}
            </Typography>
            <Typography sx={styles.subtitleStyles}>
              {food.priceRange}
            </Typography>
          </Box>
        </Box>

        <Box sx={styles.detailContentStyles}>
          <Typography sx={styles.descriptionStyles}>
            {food.description}
          </Typography>

          <Box sx={styles.detailSectionStyles}>
            <Typography sx={{ fontWeight: 800, marginBottom: 1 }}>
              Điểm nổi bật
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {food.signature}
            </Typography>
          </Box>

          <Box sx={styles.detailSectionStyles}>
            <Typography sx={{ fontWeight: 800, marginBottom: 1 }}>
              Nguyên liệu
            </Typography>
            <Box sx={styles.chipWrapStyles}>
              {food.ingredients.map((ingredient) => (
                <Chip
                  key={ingredient}
                  label={ingredient}
                  size="small"
                  sx={styles.softTagStyles}
                />
              ))}
            </Box>
          </Box>

          <Box sx={styles.detailSectionStyles}>
            <Typography sx={{ fontWeight: 800, marginBottom: 1 }}>
              Soft tags
            </Typography>
            <Box sx={styles.chipWrapStyles}>
              {food.soft_tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={styles.softTagStyles}
                />
              ))}
            </Box>
          </Box>

          <Box sx={styles.detailSectionStyles}>
            <Typography sx={{ fontWeight: 800, marginBottom: 1 }}>
              Địa điểm gợi ý
            </Typography>
            <Stack spacing={1}>
              {food.locations.map((location) => (
                <Box
                  key={`${food.id}-${location.name}`}
                  sx={styles.locationCardStyles}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 800 }}>
                      {location.name}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                      {location.address}
                    </Typography>
                  </Box>
                  <Box
                    component="a"
                    href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                    rel="noreferrer"
                    target="_blank"
                    sx={styles.mapLinkStyles}
                  >
                    <Navigation size={15} /> Mở map
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box sx={styles.detailSectionStyles}>
            <Typography sx={{ fontWeight: 800, marginBottom: 1 }}>
              Ghi chú
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {food.healthNote}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <Box sx={styles.emptyStateStyles}>
      <Search size={36} />
      <Typography component="h2" sx={styles.resultCountStyles}>
        Chưa tìm thấy món phù hợp
      </Typography>
      <Typography sx={styles.helperTextStyles}>
        Hãy thử nhập tên món không dấu, một nguyên liệu chính hoặc bỏ bớt tag
        đang chọn.
      </Typography>
      <Button onClick={onClear} sx={{ marginTop: 2 }} variant="contained">
        Xóa bộ lọc
      </Button>
    </Box>
  );
}

function getSuggestionIcon(type: SearchSuggestion["type"]) {
  if (type === "dish") return <Utensils size={17} />;
  if (type === "tag") return <Tag size={17} />;
  return <Sparkles size={17} />;
}
