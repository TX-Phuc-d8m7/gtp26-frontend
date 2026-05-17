/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Star } from "lucide-react";

import { mergeSx } from "@/shared/shared.styles";
import { StarRatingProps, styles } from ".";

export default function StarRating({
  onRate,
  readonly = false,
  currentRating = 0,
  showLabel = true,
  sx,
}: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const displayRating = hoveredRating || currentRating;

  const handleClick = (rating: number) => {
    if (!readonly) {
      onRate(rating);
    }
  };

  return (
    <Box sx={mergeSx(styles.rootSx, sx)}>
      {showLabel && (
        <Typography variant="subtitle2" sx={styles.labelSx}>
          Đánh giá món này
        </Typography>
      )}
      <Box sx={styles.rowSx}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <Box
            component="button"
            key={rating}
            type="button"
            onClick={() => handleClick(rating)}
            onMouseEnter={() => setHoveredRating(rating)}
            onMouseLeave={() => setHoveredRating(0)}
            disabled={readonly}
            aria-label={`Rate ${rating} stars`}
            sx={styles.getStarButtonSx(rating, displayRating, readonly)}
          >
            <Star
              size={20}
              style={{ transition: "color 180ms ease" }}
              fill={rating <= displayRating ? "currentColor" : "none"}
            />
          </Box>
        ))}
        {currentRating > 0 && (
          <Typography sx={styles.countSx}>{currentRating}/5</Typography>
        )}
      </Box>
    </Box>
  );
}
