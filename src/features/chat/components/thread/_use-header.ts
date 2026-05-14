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

const AUTH_STORAGE_KEY = "food-recommendation:isLoggedIn";
const SEARCH_PORTAL_SELECTOR = ".MuiDialog-root, [role='dialog']";

const isSearchPortalElement = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return false;

  return Boolean(target.closest(SEARCH_PORTAL_SELECTOR));
};

export function useHeader() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Cân bằng");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const searchOverlayRef = useRef<HTMLDivElement>(null);
  const modelOptions = ["Cân bằng", "Nhanh", "Chính xác", "Sáng tạo"];

  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem(AUTH_STORAGE_KEY) === "true");
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
    if (
      nextFocusedElement &&
      (searchPanel.contains(nextFocusedElement as Node) ||
        isSearchPortalElement(nextFocusedElement))
    ) {
      return;
    }

    window.requestAnimationFrame(() => {
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

  const handleLogout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
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
  };
}
