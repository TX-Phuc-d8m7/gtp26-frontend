/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Button } from "@/shared/components/ui/button/index";
import { Box } from "@mui/material";
import { Typography } from "@/shared/components/ui/typography/index";
import {
  Heart,
  Menu,
  SquarePen,
  User,
  LogOut,
  Settings,
  LogIn,
  Search,
} from "lucide-react";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import { GitHubSVG } from "@/shared/components/icons/github";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip/index";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FoodSearchUI } from "@/features/foods/search";
import { HeaderProps, styles, useHeader } from ".";
import gtp26logo from "@/app/gtp26-logo.png";

export default function Header({
  chatHistoryOpen,
  onToggleChatHistory,
  onNewThread,
  chatStarted,
  isLargeScreen,
}: HeaderProps) {
  const {
    handleLogout,
    handleSearchBackdropMouseDown,
    handleSearchOverlayBlur,
    isLoggedIn,
    isSearchOpen,
    isUserMenuOpen,
    menuRef,
    setIsSearchOpen,
    setIsUserMenuOpen,
    searchOverlayRef,
  } = useHeader();

  const shouldShowMenuButton = !chatHistoryOpen || !isLargeScreen;

  return (
    <>
      <Box sx={styles.headerBarStyles}>
        <Box sx={styles.headerSideStyles}>
          <Box sx={styles.headerSideStyles}>
            {shouldShowMenuButton && (
              <Button
                variant="ghost"
                size="icon"
                sx={styles.headerIconButtonStyles}
                onClick={onToggleChatHistory}
                aria-label="Mở lịch sử trò chuyện"
              >
                <Menu size={20} />
              </Button>
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    sx={styles.headerIconButtonStyles}
                    onClick={() => setIsSearchOpen(true)}
                    aria-label="Tra cứu món ăn"
                  >
                    <Search size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Tra cứu món ăn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Box>

          <motion.button
            type="button"
            style={{ minWidth: 0 }}
            onClick={onNewThread}
            animate={{ marginLeft: chatStarted && chatHistoryOpen ? 8 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Box sx={styles.brandButtonStyles}>
              <Box sx={styles.brandLogoLockupStyles}>
                <Box
                  component="img"
                  src={gtp26logo.src}
                  alt="App Icon"
                  sx={styles.brandLogoImageStyles}
                />
                <Typography as="span" sx={styles.brandHeaderTextStyles}>
                  Hôm nay
                  <br />
                  <Box component="span" sx={styles.brandHeaderAccentStyles}>
                    bạn ăn gì?
                  </Box>
                </Typography>
              </Box>
            </Box>
          </motion.button>
        </Box>

        <Box sx={styles.headerSideStyles}>
          {chatStarted && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    sx={styles.headerIconButtonStyles}
                    onClick={onNewThread}
                    aria-label="Cuộc hội thoại mới"
                  >
                    <SquarePen size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Cuộc hội thoại mới</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ThemeToggle />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Đổi theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Box
                  component="a"
                  href="https://github.com/TX-Phuc-d8m7/gtp26-frontend.git"
                  target="_blank"
                  sx={[
                    styles.headerIconButtonStyles,
                    {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                    },
                  ]}
                >
                  <GitHubSVG width="20" height="20" />
                </Box>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Mã nguồn GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Box sx={{ position: "relative" }} ref={menuRef}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    sx={styles.headerIconButtonStyles}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    aria-label="Tài khoản"
                  >
                    <User size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Tài khoản</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <AnimatePresence>
              {isUserMenuOpen && (
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  sx={[styles.dropdownPanelStyles, { right: 0, width: 236 }]}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                      p: 1,
                    }}
                  >
                    {isLoggedIn ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.25,
                            borderBottom: "1px solid var(--border)",
                            px: 1.5,
                            py: 1.2,
                            mb: 0.5,
                          }}
                        >
                          <Box sx={styles.assistantAvatarStyles}>
                            <User size={16} />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              minWidth: 0,
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              as="span"
                              sx={{ fontSize: "0.9rem", fontWeight: 700 }}
                            >
                              Người dùng
                            </Typography>
                            <Typography
                              as="span"
                              sx={{
                                color: "var(--muted-foreground)",
                                fontSize: "0.76rem",
                              }}
                            >
                              user@example.com
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          component={Link}
                          href="/favorites"
                          sx={[
                            styles.dropdownItemStyles,
                            {
                              justifyContent: "flex-start",
                              textDecoration: "none",
                            },
                          ]}
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Heart size={16} color="var(--muted-foreground)" />
                          Món yêu thích
                        </Box>
                        <Box
                          component={Link}
                          href="/profile"
                          sx={[
                            styles.dropdownItemStyles,
                            {
                              justifyContent: "flex-start",
                              textDecoration: "none",
                            },
                          ]}
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings size={16} color="var(--muted-foreground)" />
                          Quản lý tài khoản
                        </Box>
                        <Box
                          component="button"
                          type="button"
                          sx={[
                            styles.dropdownItemStyles,
                            {
                              justifyContent: "flex-start",
                              color: "var(--destructive)",
                            },
                          ]}
                          onClick={handleLogout}
                        >
                          <LogOut size={16} />
                          Đăng xuất
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography
                          as="span"
                          sx={{
                            borderBottom: "1px solid var(--border)",
                            px: 1.5,
                            py: 1.2,
                            mb: 0.5,
                            fontSize: "0.9rem",
                            fontWeight: 700,
                          }}
                        >
                          Chào mừng bạn!
                        </Typography>
                        <Box
                          component={Link}
                          href="/login"
                          sx={[
                            styles.dropdownItemStyles,
                            {
                              justifyContent: "flex-start",
                              textDecoration: "none",
                            },
                          ]}
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LogIn size={16} color="var(--muted-foreground)" />
                          Đăng nhập
                        </Box>
                        <Box
                          component={Link}
                          href="/signup"
                          sx={[
                            styles.dropdownItemStyles,
                            {
                              justifyContent: "flex-start",
                              textDecoration: "none",
                            },
                          ]}
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User size={16} color="var(--muted-foreground)" />
                          Đăng ký
                        </Box>
                      </>
                    )}
                  </Box>
                </Box>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>

      <AnimatePresence>
        {isSearchOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            onMouseDown={handleSearchBackdropMouseDown}
            sx={styles.searchOverlayStyles}
          >
            <Box
              component={motion.div}
              ref={searchOverlayRef}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.985, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 10 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 30,
                mass: 0.8,
              }}
              onBlur={handleSearchOverlayBlur}
              sx={styles.searchOverlayPanelStyles}
            >
              <FoodSearchUI onClose={() => setIsSearchOpen(false)} />
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
}
