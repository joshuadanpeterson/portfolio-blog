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

const SUBSTACK_PATH = "M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z";

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between py-4">
          <div className="flex items-center gap-4">
            {/* Conversion-focused order: Substack, Medium, X, GitHub, LinkedIn, Instagram */}
            <a
              href="https://substack.com/@joshuadanpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-gray-600 hover:text-[#FF6719] hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-400/50 align-middle"
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
              className="p-2 rounded-md text-gray-600 hover:text-[#00AB6C] hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-400/50 align-middle"
              aria-label="Medium"
              title="Medium"
            >
              <FontAwesomeIcon icon={faMedium} size="2x" className="align-middle" />
            </a>
            <a
              href="https://x.com/jdpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-gray-600 hover:text-black hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-400/50 align-middle"
              aria-label="X"
              title="X (Twitter)"
            >
              <FontAwesomeIcon icon={faXTwitter} size="2x" className="align-middle" />
            </a>
            <a
              href="https://github.com/joshuadanpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-gray-600 hover:text-black hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-400/50 align-middle"
              aria-label="GitHub"
              title="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" className="align-middle" />
            </a>
            <a
              href="https://linkedin.com/in/joshuadanpeterson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-gray-600 hover:text-[#0A66C2] hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-400/50 align-middle"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" className="align-middle" />
            </a>
            <a
              href="https://instagram.com/chromaticera"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-gray-600 hover:text-[#E4405F] hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-400/50 align-middle"
              aria-label="Instagram"
              title="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" className="align-middle" />
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
