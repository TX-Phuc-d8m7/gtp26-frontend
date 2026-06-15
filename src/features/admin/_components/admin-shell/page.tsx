/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Database,
  Home,
  LogOut,
  Plus,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

import { Box } from "@/shared/components/ui/box/index";
import { Typography } from "@/shared/components/ui/typography/index";
import { ThemeToggle } from "@/shared/components/theme-toggle";

import { AdminShellProps, styles, useAdminShell } from ".";

const navItems = [
  {
    href: "/admin",
    label: "Tổng quan",
    Icon: Home,
  },
  {
    href: "/admin/foods",
    label: "Kho món ăn",
    Icon: Database,
  },
  {
    href: "/admin/users",
    label: "Người dùng",
    Icon: Users,
  },
  {
    href: "/admin/query-logs",
    label: "Lịch sử truy vấn",
    Icon: ClipboardList,
  },
] as const;

export default function AdminShell({
  activePath,
  actions,
  children,
  subtitle,
  title,
}: AdminShellProps) {
  const { adminName, handleLogout, isUserMenuOpen, menuRef, setIsUserMenuOpen } =
    useAdminShell();

  const todayLabel = useMemo(
    () =>
      new Date().toLocaleDateString("vi-VN", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [],
  );

  return (
    <Box sx={styles.shellStyles}>
      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <Box component="aside" sx={styles.sidebarStyles}>
        <Box sx={styles.brandStyles}>
          <Box sx={styles.brandMarkStyles}>
            <ShieldCheck size={20} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography as="p" sx={styles.brandTitleStyles}>
              Food Ops
            </Typography>
            <Typography as="p" sx={styles.brandSubtitleStyles}>
              Admin Console
            </Typography>
          </Box>
        </Box>

        <Box component="nav" sx={styles.navStyles}>
          <Box sx={styles.navSectionLabelStyles}>Điều hướng</Box>
          {navItems.map(({ href, label, Icon }) => (
            <Box
              key={href}
              component={Link}
              href={href}
              sx={styles.navItemStyles(activePath === href)}
            >
              <Icon size={17} />
              {label}
            </Box>
          ))}
        </Box>

        <Box sx={styles.sidebarDividerStyles()} />

        <Box
          component={Link}
          href="/admin/foods"
          sx={styles.ctaButtonStyles}
        >
          <Plus size={15} />
          Thêm món ăn
        </Box>
      </Box>

      {/* ── Main ────────────────────────────────────────────────── */}
      <Box component="main" sx={styles.mainStyles}>

        {/* ── Top strip: title (left) + actions + user (right) ─── */}
        {/* No card — floats directly on the peach/dark page background */}
        <Box sx={styles.topStripStyles}>
          {/* Left: date badge + big title + subtitle */}
          <Box sx={{ minWidth: 0 }}>
            <Typography as="span" sx={styles.eyebrowStyles}>
              <CalendarDays size={12} />
              {todayLabel}
            </Typography>
            <Typography as="h1" sx={styles.titleStyles}>
              {title}
            </Typography>
            {subtitle && (
              <Typography as="p" sx={styles.subtitleStyles}>
                {subtitle}
              </Typography>
            )}
          </Box>

          {/* Right: page actions + ThemeToggle + user menu */}
          <Box sx={styles.topRightActionsStyles}>
            {actions}

            <ThemeToggle />

            <div ref={menuRef} style={{ position: "relative" }}>
              <Box
                component="button"
                onClick={() => setIsUserMenuOpen((v) => !v)}
                sx={styles.userMenuButtonStyles(isUserMenuOpen)}
              >
                <Box sx={styles.adminAvatarStyles}>
                  {adminName ? adminName[0].toUpperCase() : <User size={12} />}
                </Box>
                {adminName || "Tài khoản"}
                <ChevronDown
                  size={13}
                  style={{
                    transition: "transform 200ms ease",
                    transform: isUserMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </Box>

              {isUserMenuOpen && (
                <Box sx={styles.userDropdownStyles}>
                  {/* <Box
                    component={Link}
                    href="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    sx={styles.userDropdownItemStyles(false)}
                  >
                    <User size={14} />
                    Quản lý tài khoản
                  </Box>

                  <Box sx={styles.userDropdownDividerStyles()} /> */}

                  <Box
                    component="button"
                    onClick={handleLogout}
                    sx={styles.userDropdownItemStyles(true)}
                  >
                    <LogOut size={14} />
                    Đăng xuất
                  </Box>
                </Box>
              )}
            </div>
          </Box>
        </Box>

        {/* ── Page content ────────────────────────────────────── */}
        {children}
      </Box>
    </Box>
  );
}
