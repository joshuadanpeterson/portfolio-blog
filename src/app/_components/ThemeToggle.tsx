"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="ml-4 px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 transition-colors duration-150"
      aria-label="Toggle dark mode"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

