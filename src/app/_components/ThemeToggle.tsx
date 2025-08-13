"use client";

import { useTheme } from "@/context/ThemeContext";

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
        // Sun icon when currently dark (action: go light)
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
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1ZM12 4a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm8 8a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM2 12a1 1 0 0 1 1-1H4a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm14.95 6.364a1 1 0 0 1 1.415 0l.707.707a1 1 0 1 1-1.414 1.415l-.708-.707a1 1 0 0 1 0-1.415ZM4.635 4.636a1 1 0 0 1 1.415 0l.707.707A1 1 0 1 1 5.343 6.758l-.707-.707a1 1 0 0 1 0-1.415Zm12.728-1e-3a1 1 0 0 1 0 1.415l-.707.707A1 1 0 1 1 15.242 5.05l.707-.707a1 1 0 0 1 1.414 0Z" />
        </svg>
      ) : (
        // Moon icon when currently light (action: go dark)
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
