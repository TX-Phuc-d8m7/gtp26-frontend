/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
const FOOD_AI_API_URL =
  process.env.NEXT_PUBLIC_FOOD_AI_API_URL ?? "/api/backend";

export const FALLBACK_FOOD_IMAGE =
  "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=900";

const fallbackFoodImages: Array<{ keywords: string[]; url: string }> = [
  {
    keywords: ["mi quang", "mì quảng"],
    url: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=900",
  },
  {
    keywords: ["bun cha ca", "bún chả cá"],
    url: "https://images.unsplash.com/photo-1582878826629-29b7ad1cb431?auto=format&fit=crop&q=80&w=900",
  },
  {
    keywords: ["banh xeo", "bánh xèo"],
    url: "https://images.unsplash.com/photo-1626804475297-4160ebbaea4b?auto=format&fit=crop&q=80&w=900",
  },
  {
    keywords: ["banh cuon", "bánh cuốn", "pho cuon", "phở cuốn"],
    url: "https://images.unsplash.com/photo-1603046891744-1f76eb10aec4?auto=format&fit=crop&q=80&w=900",
  },
  {
    keywords: ["hai san", "hải sản", "tom", "tôm", "ca ", "cá "],
    url: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=900",
  },
  {
    keywords: ["chay", "rau", "salad"],
    url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=900",
  },
];

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function isPlaceholderImageUrl(value: string) {
  try {
    const url = new URL(value);
    return ["example.com", "www.example.com"].includes(url.hostname);
  } catch {
    return false;
  }
}

export function getFallbackFoodImage(foodName?: string | null) {
  const normalizedName = normalizeText(foodName ?? "");
  const matched = fallbackFoodImages.find((item) =>
    item.keywords.some((keyword) =>
      normalizedName.includes(normalizeText(keyword)),
    ),
  );

  return matched?.url ?? FALLBACK_FOOD_IMAGE;
}

export function resolveFoodImageUrl(value?: string | null) {
  const raw = value?.trim();
  if (!raw) return undefined;

  if (/^(https?:|data:|blob:)/i.test(raw)) {
    if (isPlaceholderImageUrl(raw)) return undefined;
    return raw;
  }

  if (raw.startsWith("/")) {
    return `${FOOD_AI_API_URL.replace(/\/$/, "")}${raw}`;
  }

  return raw;
}

export function getFoodImageFromRecord(food: Record<string, unknown>) {
  const foodName = typeof food.name === "string" ? food.name : undefined;
  const candidates = [
    food.img_url,
    food.image_url,
    food.imageUrl,
    food.imgUrl,
    food.photo_url,
    food.thumbnail_url,
    food.image,
  ];

  for (const candidate of candidates) {
    if (typeof candidate !== "string") continue;
    const resolved = resolveFoodImageUrl(candidate);
    if (resolved) return resolved;
  }

  return getFallbackFoodImage(foodName);
}
