/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

"use client";

import { useEffect, useState } from "react";
import { AppLoading } from "@/shared/components/ui/app-loading";

const MIN_LOADING_DURATION_MS = 1600;

export default function AppTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, MIN_LOADING_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    return <AppLoading mediaSrc="/loading/foodie-loader.gif" />;
  }

  return children;
}
