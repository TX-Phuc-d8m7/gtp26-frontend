/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { z } from "zod";

export const onboardingSchema = z.object({
  healthRisks: z.array(z.string()),
  favorites: z.array(z.string()),
  tastePreferences: z.array(z.string()),
  dishTypes: z.array(z.string()),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
