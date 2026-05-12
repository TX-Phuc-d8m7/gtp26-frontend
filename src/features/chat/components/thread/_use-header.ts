/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AUTH_STORAGE_KEY = "food-recommendation:isLoggedIn";

export function useHeader() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Cân bằng");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const modelOptions = ["Cân bằng", "Nhanh", "Chính xác", "Sáng tạo"];

  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem(AUTH_STORAGE_KEY) === "true");
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    menuRef,
    modelOptions,
    selectedModel,
    setIsModelMenuOpen,
    setIsSearchOpen,
    setIsUserMenuOpen,
    setSelectedModel,
  };
}
