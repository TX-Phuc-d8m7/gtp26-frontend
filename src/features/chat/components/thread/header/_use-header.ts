/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiGetMe, apiLogout, getAccessToken } from "@/features/auth/_api";
import { prewarmFilterOptions } from "@/features/foods/search";

const SEARCH_PORTAL_SELECTOR =
  ".MuiDialog-root, .MuiDrawer-root, [role='dialog'], .leaflet-container, .leaflet-pane, .leaflet-popup";
const FOOD_MAP_DRAWER_SELECTOR = "[data-food-map-drawer='open']";

const isSearchPortalElement = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return false;

  return Boolean(target.closest(SEARCH_PORTAL_SELECTOR));
};

const isFoodMapDrawerOpen = () =>
  typeof document !== "undefined" &&
  Boolean(document.querySelector(FOOD_MAP_DRAWER_SELECTOR));

export function useHeader() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Cân bằng");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const searchOverlayRef = useRef<HTMLDivElement>(null);
  const modelOptions = ["Cân bằng", "Nhanh", "Chính xác", "Sáng tạo"];

  useEffect(() => {
    const token = getAccessToken();
    setIsLoggedIn(Boolean(token));
    if (!token) return;

    apiGetMe()
      .then((me) => {
        setUserName(me.full_name ?? null);
        setUserEmail(me.email);
      })
      .catch(() => {
        // Không cần báo lỗi — chỉ bị fallback về placeholder
      });
  }, []);

  // Pre-warm filter options cache so tag chips appear instantly when search opens
  useEffect(() => {
    prewarmFilterOptions();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;

    const frameId = window.requestAnimationFrame(() => {
      searchOverlayRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isSearchOpen]);

  const handleSearchOverlayBlur = (event: FocusEvent<HTMLDivElement>) => {
    const searchPanel = event.currentTarget;
    const nextFocusedElement = event.relatedTarget;
    if (isFoodMapDrawerOpen()) {
      return;
    }

    if (
      nextFocusedElement &&
      (searchPanel.contains(nextFocusedElement as Node) ||
        isSearchPortalElement(nextFocusedElement))
    ) {
      return;
    }

    window.requestAnimationFrame(() => {
      if (isFoodMapDrawerOpen()) {
        return;
      }

      const activeElement = document.activeElement;
      if (
        activeElement &&
        (searchPanel.contains(activeElement) ||
          isSearchPortalElement(activeElement))
      ) {
        return;
      }

      setIsSearchOpen(false);
    });
  };

  const handleSearchBackdropMouseDown = (
    event: ReactMouseEvent<HTMLDivElement>,
  ) => {
    if (event.target !== event.currentTarget) return;

    setIsSearchOpen(false);
  };

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    try {
      await apiLogout(); // revoke refresh token ở backend + xóa tokens local
    } catch {
      /* tokens đã được xóa trong apiLogout dù server lỗi */
    }
    setIsLoggedIn(false);
    toast.success("Đã đăng xuất thành công!");
    router.push("/");
  };

  return {
    handleLogout,
    isLoggedIn,
    isModelMenuOpen,
    isSearchOpen,
    isUserMenuOpen,
    handleSearchBackdropMouseDown,
    handleSearchOverlayBlur,
    menuRef,
    modelOptions,
    searchOverlayRef,
    selectedModel,
    setIsModelMenuOpen,
    setIsSearchOpen,
    setIsUserMenuOpen,
    setSelectedModel,
    userEmail,
    userName,
  };
}
