/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { AuthView } from ".";

export function useAuth(defaultView: AuthView = "login") {
  return {
    defaultView,
  };
}
