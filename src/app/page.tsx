"use client";

import { StreamProvider, Thread, ThreadProvider } from "@/features/chat";
import { Toaster } from "@/shared/components/ui/sonner";
import React from "react";

export default function DemoPage(): React.ReactNode {
  return (
    <React.Suspense fallback={<div>Loading (layout)...</div>}>
      <Toaster />
      <ThreadProvider>
        <StreamProvider>
          <Thread />
        </StreamProvider>
      </ThreadProvider>
    </React.Suspense>
  );
}
