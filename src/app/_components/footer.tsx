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
            >
              <FontAwesomeIcon icon={faMedium} size="2x" />
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
            &copy; 2024 Josh Peterson
          </div>
        </div>
      </Container>
    </footer>
  );
}
