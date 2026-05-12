/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { FoodSearchUI } from "./search";
import type { FoodSearchUIProps } from "./search";

export default function Foods(props: FoodSearchUIProps = {}) {
  return <FoodSearchUI {...props} />;
}
