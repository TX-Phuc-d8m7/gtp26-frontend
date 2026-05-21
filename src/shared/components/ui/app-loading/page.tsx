/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

"use client";

import { Box, Typography } from "@mui/material";
import { Sparkles, UtensilsCrossed } from "lucide-react";
import { useMemo, useState } from "react";
import { AppLoadingProps, AppLoadingMediaType, styles } from ".";
import { mergeSx } from "@/shared/shared.styles";

const getMediaType = (
  mediaSrc?: string,
  mediaType?: AppLoadingMediaType,
): AppLoadingMediaType => {
  if (mediaType) return mediaType;
  return mediaSrc?.toLowerCase().endsWith(".mp4") ? "video" : "image";
};

export default function AppLoading({
  mediaSrc,
  mediaType,
  title = "Đang chuẩn bị món ngon",
  description = "Foodie Suggest đang mở bếp gợi ý, kiểm tra khẩu vị và chuẩn bị trải nghiệm phù hợp cho bạn.",
  sx,
}: AppLoadingProps) {
  const [isMediaAvailable, setIsMediaAvailable] = useState(Boolean(mediaSrc));
  const resolvedMediaType = useMemo(
    () => getMediaType(mediaSrc, mediaType),
    [mediaSrc, mediaType],
  );
  const titleParts = useMemo(() => {
    const words = title.trim().split(/\s+/);
    if (words.length <= 2) {
      return { prefix: "", highlight: title };
    }

    return {
      prefix: words.slice(0, -2).join(" "),
      highlight: words.slice(-2).join(" "),
    };
  }, [title]);

  const shouldRenderMedia = Boolean(mediaSrc && isMediaAvailable);

  return (
    <Box component="main" sx={mergeSx(styles.rootStyles, sx)}>
      <Box sx={styles.patternStyles} />
      <Box sx={styles.cardStyles}>
        <Box sx={styles.badgeStyles}>
          <Sparkles size={16} strokeWidth={2.4} />
          Foodie Suggest
        </Box>

        <Box sx={styles.mediaFrameStyles}>
          {shouldRenderMedia ? (
            resolvedMediaType === "video" ? (
              <Box
                component="video"
                src={mediaSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onError={() => setIsMediaAvailable(false)}
                sx={styles.mediaStyles}
              />
            ) : (
              <Box
                component="img"
                src={mediaSrc}
                alt="Foodie Suggest loading"
                onError={() => setIsMediaAvailable(false)}
                sx={styles.mediaStyles}
              />
            )
          ) : (
            <Box sx={styles.fallbackMarkStyles}>
              <Box sx={styles.fallbackIconStyles}>
                <UtensilsCrossed size={76} strokeWidth={1.7} />
              </Box>
            </Box>
          )}
        </Box>

        <Typography component="h1" sx={styles.titleStyles}>
          {titleParts.prefix ? `${titleParts.prefix} ` : ""}
          <Box component="span" sx={styles.highlightStyles}>
            {titleParts.highlight}
          </Box>
        </Typography>

        <Typography sx={styles.descriptionStyles}>{description}</Typography>

        <Box aria-label="Đang tải" role="status" sx={styles.dotsStyles}>
          {[0, 120, 240].map((delay) => (
            <Box key={delay} sx={styles.dotStyles(delay)} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
