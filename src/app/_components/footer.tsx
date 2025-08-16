"use client";

import React from "react";
import Container from "@/app/_components/container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedium,
  faGithub,
  faXTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useTheme } from "@/context/ThemeContext";

const SUBSTACK_PATH = "M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z";

export default function Footer() {
  const { theme } = useTheme();
  const [isGithubHovered, setIsGithubHovered] = React.useState(false);
  
  return (
    <footer className="bg-background text-foreground border-t border-border">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between py-4">
          <div className="flex items-center gap-4">
            {/* Conversion-focused order: Substack, Medium, X, GitHub, LinkedIn, Instagram */}
            <a
              href="https://substack.com/@joshuadanpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:text-[#FF6719] dark:hover:text-[#FF6719] hover:bg-neutral-100 dark:hover:bg-neutral-800 visited:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 align-middle transition-colors duration-150 motion-reduce:transition-none"
              aria-label="Substack"
              title="Substack"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                className="align-middle"
              >
                <path d={SUBSTACK_PATH} />
              </svg>
            </a>
            <a
              href="https://medium.com/@joshpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:text-[#00AB6C] dark:hover:text-[#00AB6C] hover:bg-neutral-100 dark:hover:bg-neutral-800 visited:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 align-middle transition-colors duration-150 motion-reduce:transition-none"
              aria-label="Medium"
              title="Medium"
            >
              <FontAwesomeIcon icon={faMedium} size="2x" className="align-middle" />
            </a>
            <a
              href="https://x.com/jdpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 visited:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 align-middle transition-colors duration-150 motion-reduce:transition-none"
              aria-label="X"
              title="X (Twitter)"
            >
              <FontAwesomeIcon icon={faXTwitter} size="2x" className="align-middle" />
            </a>
            <a
              href="https://github.com/joshuadanpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 visited:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 align-middle transition-colors duration-150 motion-reduce:transition-none"
              aria-label="GitHub"
              title="GitHub"
              onMouseEnter={() => setIsGithubHovered(true)}
              onMouseLeave={() => setIsGithubHovered(false)}
            >
              <FontAwesomeIcon 
                icon={faGithub} 
                size="2x" 
                className="align-middle transition-colors duration-150" 
                style={{ 
                  color: isGithubHovered 
                    ? (theme === 'dark' ? 'black' : '#6b7280') // black on hover in dark, gray on hover in light
                    : (theme === 'dark' ? 'white' : 'black')   // white in dark, black in light
                }}
              />
            </a>
            <a
              href="https://linkedin.com/in/joshuadanpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] hover:bg-neutral-100 dark:hover:bg-neutral-800 visited:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 align-middle transition-colors duration-150 motion-reduce:transition-none"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" className="align-middle" />
            </a>
            <a
              href="https://instagram.com/chromaticera"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:text-[#E4405F] dark:hover:text-[#E4405F] hover:bg-neutral-100 dark:hover:bg-neutral-800 visited:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 align-middle transition-colors duration-150 motion-reduce:transition-none"
              aria-label="Instagram"
              title="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" className="align-middle" />
            </a>
          </div>
          <div className="mt-4 lg:mt-0 text-gray-600 dark:text-neutral-400">
            © {new Date().getFullYear()} Josh Peterson
          </div>
        </div>
      </Container>
    </footer>
  );
}
