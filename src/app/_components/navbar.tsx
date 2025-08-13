// src/app/_components/navbar.tsx
"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import ThemeToggle from "@/app/_components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 dark:text-white">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 dark:text-white">
            josh
          </h1>
        </div>
        <button
          className="text-black dark:text-white md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          type="button"
        >
          <svg
            className="w-6 h-6"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
      <ul className={`flex-col md:flex-row flex md:space-x-4 text-lg mt-5 md:pl-8 ${isOpen ? "block" : "hidden"} md:flex`}>
        <li>
          <Link
            href="/"
            className={clsx(
              "font-semibold underline underline-offset-2 transition-colors duration-200 hover:text-sky-700 dark:hover:text-white",
              { "underline decoration-2": pathname === "/" },
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/portfolio"
            className={clsx(
              "font-semibold underline underline-offset-2 transition-colors duration-200 hover:text-sky-700 dark:hover:text-white",
              { "underline decoration-2": pathname === "/portfolio" },
            )}
          >
            Portfolio
          </Link>
        </li>
        <li>
          <Link
            href="/posts"
            className={clsx(
              "font-semibold underline underline-offset-2 transition-colors duration-200 hover:text-sky-700 dark:hover:text-white",
              { "underline decoration-2": pathname === "/posts" },
            )}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={clsx(
              "font-semibold underline underline-offset-2 transition-colors duration-200 hover:text-sky-700 dark:hover:text-white",
              { "underline decoration-2": pathname === "/about" },
            )}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={clsx(
              "font-semibold underline underline-offset-2 transition-colors duration-200 hover:text-sky-700 dark:hover:text-white",
              { "underline decoration-2": pathname === "/contact" },
            )}
          >
            Contact
          </Link>
        </li>
        <li className="hidden md:block md:ml-2">
          <ThemeToggle />
        </li>
      </ul>
      {isOpen && (
        <div className="mt-4 md:hidden w-full">
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
