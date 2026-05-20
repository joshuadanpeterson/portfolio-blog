// src/app/portfolio/page.tsx
"use client";

import { useEffect, useState } from "react";
import Container from "@/app/_components/container"; // Ensure this path is correct
import TitleUpdater from "@/app/_components/title-updater";
import { Card } from "@/components/ui/card";
import type { Repository } from "@/lib/github-types";

const PortfolioPage = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getRepos() {
      try {
        const response = await fetch("/api/github/pinned");

        if (!response.ok) {
          throw new Error("Failed to load pinned repositories");
        }

        const repos = (await response.json()) as Repository[];
        setRepos(repos);
      } catch (error) {
        console.error("Error fetching pinned repositories:", error);
        setError("Pinned repositories are temporarily unavailable.");
      } finally {
        setIsLoading(false);
      }
    }
    getRepos();
  }, []);

  return (
    <Container>
      <TitleUpdater title="Portfolio | Josh Peterson" />
      <div className="flex flex-col items-center justify-center mt-16 mb-16 px-4 md:px-8 lg:px-16">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          Portfolio
        </h1>
        <p className="text-lg mt-5 md:pl-8 text-center md:text-left max-w-2xl">
          Welcome to my portfolio! Here are my pinned GitHub repositories.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {isLoading && (
            <p className="col-span-full text-gray-600 dark:text-neutral-400">
              Loading repositories...
            </p>
          )}
          {error && (
            <p className="col-span-full text-gray-600 dark:text-neutral-400">
              {error}
            </p>
          )}
          {repos.map((repo) => (
            <Card key={repo.name} className="p-4 shadow-lg">
              <h2 className="text-2xl font-bold">{repo.name}</h2>
              <p className="mt-2 text-gray-600 dark:text-neutral-400">{repo.description}</p>
              <div className="mt-4">
                <a
                  href={repo.url}
                  className="text-blue-500 dark:text-sky-400 hover:underline dark:hover:text-sky-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Repository
                </a>
              </div>
              <div className="mt-4 flex items-center justify-between text-gray-600 dark:text-neutral-400">
                <span>⭐ {repo.stargazerCount}</span>
                <span>🍴 {repo.forkCount}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PortfolioPage;
