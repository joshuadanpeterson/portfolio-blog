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

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between py-4">
          <div className="flex space-x-6">
            <a
              href="https://medium.com/@joshpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
              aria-label="Medium"
            >
              <FontAwesomeIcon icon={faMedium} size="2x" />
            </a>
            <a
              href="https://substack.com/@joshuadanpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
              aria-label="Substack"
            >
              {/* Bootstrap Icons: Substack (inlined) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.75em"
                height="1.75em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="bi bi-substack"
                aria-hidden="true"
                focusable="false"
              >
                {/* This approximates the Bootstrap Icons Substack glyph with three horizontal bars */}
                <rect x="2" y="3" width="12" height="2" rx="0.5" />
                <rect x="2" y="7" width="12" height="2" rx="0.5" />
                <rect x="2" y="11" width="12" height="2" rx="0.5" />
              </svg>
            </a>
            <a
              href="https://x.com/jdpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faXTwitter} size="2x" />
            </a>
            <a
              href="https://instagram.com/chromaticera"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a
              href="https://github.com/joshuadanpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a
              href="https://linkedin.com/in/joshuadanpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
          <div className="mt-4 lg:mt-0 text-gray-600">
            © {new Date().getFullYear()} Josh Peterson
          </div>
        </div>
      </Container>
    </footer>
  );
}
