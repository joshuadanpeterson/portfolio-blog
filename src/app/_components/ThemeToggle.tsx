"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggleTheme}
      className="ml-4 px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 text-sm text-neutral-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 transition-colors duration-150 inline-flex items-center gap-2"
      aria-label="Toggle dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      {isDark ? (
        <Sun size={18} className="text-white" aria-hidden="true" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="currentColor"
          className="text-black dark:text-white"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M21.752 15.002A9 9 0 0 1 9 2.248 9.002 9.002 0 1 0 21.752 15.002Zm-2.104 1.695A7 7 0 1 1 11.303 3.35a9 9 0 0 0 8.345 13.347Z" />
        </svg>
      )}
    </button>
  );
}
