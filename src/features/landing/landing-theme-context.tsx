"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LandingThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const LandingThemeContext = createContext<LandingThemeContextType | undefined>(
  undefined,
);

export function LandingThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
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
