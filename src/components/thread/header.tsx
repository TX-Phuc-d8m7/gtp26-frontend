import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  SquarePen,
  User,
  LogOut,
  Settings,
  LogIn,
  Search,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubSVG } from "@/components/icons/github";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FoodSearchUI from "@/components/foods/FoodSearchUI";

interface HeaderProps {
  chatHistoryOpen: boolean;
  onToggleChatHistory: () => void;
  onNewThread: () => void;
  chatStarted: boolean;
  isLargeScreen: boolean;
}

export function Header({
  chatHistoryOpen,
  onToggleChatHistory,
  onNewThread,
  chatStarted,
  isLargeScreen,
}: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

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
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    toast.success("Đã đăng xuất thành công!");
    router.push("/login");
  };

  return (
    <>
      <div className="flex items-center justify-between gap-3 p-3 px-4 z-10 relative border-b border-border bg-background/50 backdrop-blur-sm">
        {/* Left: Menu + Search + Brand */}
        <div className="flex items-center justify-start gap-4">
          <div className="flex items-center gap-1">
            {!chatStarted && (!chatHistoryOpen || !isLargeScreen) && (
              <Button
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
                variant="ghost"
                size="sm"
                onClick={onToggleChatHistory}
              >
                <Menu className="size-5" />
              </Button>
            )}
            {chatStarted && (!chatHistoryOpen || !isLargeScreen) && (
              <Button
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
                variant="ghost"
                size="sm"
                onClick={onToggleChatHistory}
              >
                <Menu className="size-5" />
              </Button>
            )}

            {/* Search Button placed on the left next to Menu */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Tra cứu món ăn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {chatStarted && (
            <motion.button
              className="flex gap-2 items-center cursor-pointer"
              onClick={onNewThread}
              animate={{
                marginLeft: !chatHistoryOpen ? 0 : 8,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-orange-500 to-rose-500 text-transparent bg-clip-text">
                Foodie Suggest
              </span>
            </motion.button>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Search Button moved to the right */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Tra cứu món ăn</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {chatStarted && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={onNewThread}
                  >
                    <SquarePen className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Cuộc hội thoại mới</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          <ThemeToggle />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://github.com/TX-Phuc-d8m7/gtp26-frontend.git"
                  target="_blank"
                  className="flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <GitHubSVG width="20" height="20" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Mã nguồn GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* User Profile Menu */}
          <div className="relative" ref={menuRef}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full w-9 h-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 ml-1"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <User className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Tài khoản</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card text-card-foreground shadow-lg z-50 overflow-hidden"
                >
                  <div className="p-2 flex flex-col gap-1">
                    {isLoggedIn ? (
                      <>
                        <div className="px-3 py-2 text-sm font-semibold border-b border-border/50 mb-1 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User className="size-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="leading-none mb-1">Người dùng</span>
                            <span className="text-xs text-muted-foreground font-normal">user@example.com</span>
                          </div>
                        </div>
                        <Link 
                          href="/profile" 
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-secondary-foreground transition-colors cursor-pointer"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="size-4 text-muted-foreground" />
                          Quản lý tài khoản
                        </Link>
                        <div 
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors cursor-pointer mt-1"
                          onClick={handleLogout}
                        >
                          <LogOut className="size-4" />
                          Đăng xuất
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-3 py-2 text-sm font-semibold border-b border-border/50 mb-1">
                          Chào mừng bạn!
                        </div>
                        <Link 
                          href="/login" 
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-secondary-foreground transition-colors cursor-pointer"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LogIn className="size-4 text-muted-foreground" />
                          Đăng nhập
                        </Link>
                        <Link 
                          href="/signup" 
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-secondary-foreground transition-colors cursor-pointer"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="size-4 text-muted-foreground" />
                          Đăng ký
                        </Link>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Full screen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6"
          >
            {/* The Search UI container */}
            <div className="w-full h-full max-w-6xl max-h-[95vh] bg-background border border-border shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden relative flex flex-col">
              <FoodSearchUI onClose={() => setIsSearchOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
