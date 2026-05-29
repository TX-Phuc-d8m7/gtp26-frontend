/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { apiGetMe, apiLogout } from "@/features/auth/_api";

export function useAdminShell() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [adminName, setAdminName] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Lấy tên admin để hiển thị trên top nav
  useEffect(() => {
    apiGetMe()
      .then((me) => setAdminName(me.full_name ?? me.email))
      .catch(() => {}); // silent — UI vẫn dùng được nếu lỗi
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

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    try {
      await apiLogout();
    } catch {
      /* tokens cleared locally even if server fails */
    }
    toast.success("Đã đăng xuất thành công!");
    router.push("/");
  };

  return {
    adminName,
    handleLogout,
    isUserMenuOpen,
    menuRef,
    setIsUserMenuOpen,
  };
}
