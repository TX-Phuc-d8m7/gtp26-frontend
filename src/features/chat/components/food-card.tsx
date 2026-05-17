import { Box, Card, CardContent, Typography, Chip, Button } from "@mui/material";
import {
  Clock,
  Flame,
  Users,
  Zap,
  MapPinned,
  ChefHat,
} from "lucide-react";
import { BackendFoodResult } from "../_interface";

interface FoodCardProps {
  food: BackendFoodResult;
  index: number;
  onOpenLocations?: (food: BackendFoodResult) => void;
}

const difficultyConfig = {
  easy: { label: "Dễ", color: "#1d7f3a", bg: "rgba(29, 127, 58, 0.1)" },
  medium: { label: "Trung bình", color: "#FF6B35", bg: "rgba(255, 107, 53, 0.1)" },
  hard: { label: "Khó", color: "#d32f2f", bg: "rgba(211, 47, 47, 0.1)" },
};

const tagColors: Record<string, { bg: string; color: string }> = {
  vegetarian: { bg: "rgba(29, 127, 58, 0.15)", color: "#1d7f3a" },
  "low-carb": { bg: "rgba(255, 107, 53, 0.15)", color: "#FF6B35" },
  quick: { bg: "rgba(59, 130, 246, 0.15)", color: "#3b82f6" },
  "high-protein": { bg: "rgba(217, 119, 6, 0.15)", color: "#d97706" },
  healthy: { bg: "rgba(34, 197, 94, 0.15)", color: "#22c55e" },
};

export function FoodCard({ food, index, onOpenLocations }: FoodCardProps) {
  const score = Math.max(0, Math.min(100, food.matchScore));
  const locationCount = food.locations?.length ?? 0;
  const difficulty = food.difficulty || "easy";
  const diffConfig = difficultyConfig[difficulty];

  return (
    <Card
      className="!mb-4 !border-l-4 transition-all hover:!shadow-elevated"
      sx={{
        borderLeftColor: `hsl(13 100% 59%)`,
        backgroundColor: "var(--card)",
      }}
    >
      <CardContent className="!p-0 flex flex-col md:flex-row overflow-hidden">
        {/* Image Section */}
        {food.image && (
          <div className="relative w-full md:w-48 h-40 flex-shrink-0 bg-gradient-to-br from-orange-100 to-orange-50">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center font-bold text-orange-600 text-lg">
              {index + 1}
            </div>
            {score >= 80 && (
              <div className="absolute top-3 right-3 bg-amber-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
                ⭐ Top Match
              </div>
            )}
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <Typography variant="subtitle2" className="!text-muted-foreground !uppercase !text-xs !font-semibold !tracking-wider !mb-1">
                  Gợi ý món phù hợp
                </Typography>
                <Typography variant="h6" className="!font-bold !text-foreground !text-xl !mb-2 line-clamp-2">
                  {food.name}
                </Typography>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {Math.round(score)}%
                </div>
                <div className="text-xs text-muted-foreground">hợp tâm</div>
              </div>
            </div>

            {/* Match Score Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
                style={{ width: `${score}%` }}
              />
            </div>

            {/* Description */}
            <Typography className="!text-muted-foreground !text-sm !mb-4 line-clamp-2">
              {food.description}
            </Typography>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {food.cookingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-xs text-foreground font-medium">
                    {food.cookingTime} phút
                  </span>
                </div>
              )}
              {food.servings && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-foreground font-medium">
                    {food.servings} phần
                  </span>
                </div>
              )}
              {food.calories && (
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-600" />
                  <span className="text-xs text-foreground font-medium">
                    {food.calories} kcal
                  </span>
                </div>
              )}
              {difficulty && (
                <div
                  className="flex items-center gap-2 px-2 py-1 rounded-md"
                  style={{ backgroundColor: diffConfig.bg }}
                >
                  <ChefHat className="w-4 h-4" style={{ color: diffConfig.color }} />
                  <span
                    className="text-xs font-semibold"
                    style={{ color: diffConfig.color }}
                  >
                    {diffConfig.label}
                  </span>
                </div>
              )}
            </div>

            {/* Nutrition Info */}
            {(food.protein || food.carbs || food.fat) && (
              <div className="flex gap-3 mb-4 flex-wrap">
                {food.protein && (
                  <Chip
                    icon={<Zap className="w-3 h-3" />}
                    label={`${food.protein}g protein`}
                    size="small"
                    variant="outlined"
                  />
                )}
                {food.carbs && (
                  <Chip
                    label={`${food.carbs}g carbs`}
                    size="small"
                    variant="outlined"
                  />
                )}
                {food.fat && (
                  <Chip
                    label={`${food.fat}g fat`}
                    size="small"
                    variant="outlined"
                  />
                )}
              </div>
            )}

            {/* Tags */}
            {food.tags && food.tags.length > 0 && (
              <div className="flex gap-2 mb-4 flex-wrap">
                {food.tags.map((tag) => {
                  const tagConfig =
                    tagColors[tag] ||
                    { bg: "rgba(107, 114, 128, 0.1)", color: "#6b7280" };
                  return (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: tagConfig.bg,
                        color: tagConfig.color,
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Recommendation Reason */}
            {food.reason && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex gap-2 items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 5v8a2 2 0 0 1-2 2h-5l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <Typography className="!font-semibold !text-blue-900 !text-sm !mb-2">
                      Tại sao lại gợi ý?
                    </Typography>
                    <Typography className="!text-xs !text-blue-800 !leading-relaxed">
                      {food.reason}
                    </Typography>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          {locationCount > 0 && onOpenLocations && (
            <Button
              type="button"
              variant="outlined"
              size="small"
              startIcon={<MapPinned className="w-4 h-4" />}
              className="!border-orange-600 !text-orange-600 hover:!bg-orange-50 !w-full"
              onClick={() => onOpenLocations(food)}
            >
              {locationCount} quán gần bạn
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
