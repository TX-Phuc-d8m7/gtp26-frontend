"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface LandingThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const LandingThemeContext = createContext<LandingThemeContextType | undefined>(
  undefined,
);

export function LandingThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme =
      typeof window !== "undefined"
        ? localStorage.getItem("landing-theme")
        : null;
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("landing-theme", newValue ? "dark" : "light");
      }
      return newValue;
    });
  };

  return (
    <LandingThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </LandingThemeContext.Provider>
  );
}

export function useLandingTheme() {
  const context = useContext(LandingThemeContext);
  if (context === undefined) {
    throw new Error(
      "useLandingTheme must be used within a LandingThemeProvider",
    );
  }
  return context;
}
