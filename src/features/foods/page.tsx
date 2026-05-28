/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useRequireAuth } from "@/shared/hooks/use-auth-redirect";
import { FoodSearchUI } from "./search";
import type { FoodSearchUIProps } from "./search";

export default function Foods(props: FoodSearchUIProps = {}) {
  useRequireAuth();
  return <FoodSearchUI {...props} />;
}
