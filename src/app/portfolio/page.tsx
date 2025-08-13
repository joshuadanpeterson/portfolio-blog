// src/app/portfolio/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchPinnedRepos } from "@/lib/github";
import Container from "@/app/_components/container"; // Ensure this path is correct
import TitleUpdater from "@/app/_components/title-updater";
import { Card } from "@/components/ui/card";

interface Repository {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
}

const PortfolioPage = () => {
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    async function getRepos() {
      try {
        const repos = await fetchPinnedRepos();
        setRepos(repos);
      } catch (error) {
        console.error("Error fetching pinned repositories:", error);
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
