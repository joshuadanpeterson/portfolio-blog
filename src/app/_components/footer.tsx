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
  const [hoveredIcon, setHoveredIcon] = React.useState<string | null>(null);
  
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
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 visited:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 align-middle transition-colors duration-150 motion-reduce:transition-none"
              aria-label="Substack"
              title="Substack"
              onMouseEnter={() => setHoveredIcon('substack')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                className="align-middle transition-colors duration-150"
                style={{ 
                  color: hoveredIcon === 'substack'
                    ? '#FF6719' // Substack orange on hover
                    : (theme === 'dark' ? 'white' : 'black')
                }}
              >
                <path d={SUBSTACK_PATH} />
              </svg>
            </a>
            <a
              href="https://medium.com/@joshpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 visited:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 align-middle transition-colors duration-150 motion-reduce:transition-none"
              aria-label="Medium"
              title="Medium"
              onMouseEnter={() => setHoveredIcon('medium')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <FontAwesomeIcon 
                icon={faMedium} 
                size="2x" 
                className="align-middle transition-colors duration-150" 
                style={{ 
                  color: hoveredIcon === 'medium'
                    ? '#00AB6C' // Medium green on hover
                    : (theme === 'dark' ? 'white' : 'black')
                }}
              />
            </a>
            <a
              href="https://x.com/jdpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 visited:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 align-middle transition-colors duration-150 motion-reduce:transition-none"
              aria-label="X"
              title="X (Twitter)"
              onMouseEnter={() => setHoveredIcon('x')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <FontAwesomeIcon 
                icon={faXTwitter} 
                size="2x" 
                className="align-middle transition-colors duration-150" 
                style={{ 
                  color: hoveredIcon === 'x'
                    ? (theme === 'dark' ? '#1DA1F2' : 'black') // Twitter blue in dark, black in light
                    : (theme === 'dark' ? 'white' : 'black')
                }}
              />
            </a>
            <a
              href="https://github.com/joshuadanpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 visited:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 align-middle transition-colors duration-150 motion-reduce:transition-none"
              aria-label="GitHub"
              title="GitHub"
              onMouseEnter={() => setHoveredIcon('github')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <FontAwesomeIcon 
                icon={faGithub} 
                size="2x" 
                className="align-middle transition-colors duration-150" 
                style={{ 
                  color: hoveredIcon === 'github'
                    ? (theme === 'dark' ? '#6b7280' : '#6b7280') // gray on hover in both modes
                    : (theme === 'dark' ? 'white' : 'black')     // white in dark, black in light
                }}
              />
            </a>
            <a
              href="https://linkedin.com/in/joshuadanpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 visited:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 align-middle transition-colors duration-150 motion-reduce:transition-none"
              aria-label="LinkedIn"
              title="LinkedIn"
              onMouseEnter={() => setHoveredIcon('linkedin')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <FontAwesomeIcon 
                icon={faLinkedin} 
                size="2x" 
                className="align-middle transition-colors duration-150" 
                style={{ 
                  color: hoveredIcon === 'linkedin'
                    ? '#0A66C2' // LinkedIn blue on hover
                    : (theme === 'dark' ? 'white' : 'black')
                }}
              />
            </a>
            <a
              href="https://instagram.com/chromaticera"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 visited:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 align-middle transition-colors duration-150 motion-reduce:transition-none"
              aria-label="Instagram"
              title="Instagram"
              onMouseEnter={() => setHoveredIcon('instagram')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <FontAwesomeIcon 
                icon={faInstagram} 
                size="2x" 
                className="align-middle transition-colors duration-150" 
                style={{ 
                  color: hoveredIcon === 'instagram'
                    ? '#E4405F' // Instagram pink on hover
                    : (theme === 'dark' ? 'white' : 'black')
                }}
              />
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
