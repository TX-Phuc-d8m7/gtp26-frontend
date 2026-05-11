/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
export * from "./_use-foods";
export * from "./_styles";
export * from "./_interface";
export { default as FoodCard } from "./search/_components/food-card/page";
export { useFoodSearch } from "./search";
export { default as Foods, default as FoodSearchUI } from "./page";
export { MOCK_FOODS } from "./data/mock-foods";
export type { Food } from "./data/mock-foods";
