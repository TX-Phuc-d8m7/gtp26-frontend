/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import React from "react";

import { Box } from "@/shared/components/ui/box/index";
import { useRequireAuth } from "@/shared/hooks/use-auth-redirect";
import { ChatProps, styles, useChat } from ".";
import { StreamProvider } from "./providers/stream-provider";
import { ThreadProvider } from "./providers/thread-provider";
import { Thread } from "./components/thread";

export default function Chat({ fallback }: ChatProps = {}) {
  useRequireAuth();
  const { fallbackText } = useChat();

  return (
    <React.Suspense
      fallback={
        fallback ?? <Box sx={styles.fallbackStyles}>{fallbackText}</Box>
      }
    >
      <ThreadProvider>
        <StreamProvider>
          <Thread />
        </StreamProvider>
      </ThreadProvider>
    </React.Suspense>
  );
}
