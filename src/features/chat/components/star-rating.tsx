import { Box, Typography } from "@mui/material";
import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  onRate: (rating: number) => void;
  readonly?: boolean;
  currentRating?: number;
  showLabel?: boolean;
}

export function StarRating({
  onRate,
  readonly = false,
  currentRating = 0,
  showLabel = true,
}: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleClick = (rating: number) => {
    if (!readonly) {
      onRate(rating);
    }
  };

  const displayRating = hoveredRating || currentRating;

  return (
    <Box className="flex flex-col gap-2">
      {showLabel && (
        <Typography variant="subtitle2" className="!font-semibold !text-muted-foreground !text-xs">
          Đánh giá món này
        </Typography>
      )}
      <Box className="flex gap-1 items-center">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => handleClick(rating)}
            onMouseEnter={() => setHoveredRating(rating)}
            onMouseLeave={() => setHoveredRating(0)}
            disabled={readonly}
            className={`transition-transform transform hover:scale-110 ${
              readonly ? "cursor-default" : "cursor-pointer"
            }`}
            aria-label={`Rate ${rating} stars`}
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                rating <= displayRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
        {currentRating > 0 && (
          <Typography className="!ml-2 !text-xs !text-muted-foreground">
            {currentRating}/5
          </Typography>
        )}
      </Box>
    </Box>
  );
}
