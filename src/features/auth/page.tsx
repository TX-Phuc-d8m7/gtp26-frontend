/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useAuth } from ".";
import { Login } from "./login";

export default function Auth() {
  useAuth();

  return <Login />;
}
