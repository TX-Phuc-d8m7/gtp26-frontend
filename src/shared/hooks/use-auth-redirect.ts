/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getSavedRole, isLoggedIn } from "@/features/auth/_api";

/** Trả về trang chủ tương ứng với role: admin → /admin, user → /chat. */
export function getHomeRoute(): string {
  return getSavedRole() === "admin" ? "/admin" : "/chat";
}

/** Trả về route khi bấm CTA từ landing page. */
export function getLandingEntryRoute(): string {
  return isLoggedIn() ? getHomeRoute() : "/login";
}

/**
 * Guard cho protected routes (chat, profile, search).
 * Nếu chưa đăng nhập → redirect về /login.
 */
export function useRequireAuth() {
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
    }
  }, [router]);
}

/**
 * Guard cho auth routes (login, signup) và landing page.
 * Nếu đã đăng nhập → redirect về /admin (admin) hoặc /chat (user).
 */
export function useRedirectIfLoggedIn() {
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn()) {
      router.replace(getHomeRoute());
    }
  }, [router]);
}
