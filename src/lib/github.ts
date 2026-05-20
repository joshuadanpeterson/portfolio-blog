import "server-only";

import type { Repository } from "@/lib/github-types";

const GITHUB_API_URL = "https://api.github.com/graphql";

export async function fetchPinnedRepos(): Promise<Repository[]> {
  const token = process.env.GITHUB_ACCESS_TOKEN;

  if (!token) {
    throw new Error("GITHUB_ACCESS_TOKEN is not configured");
  }

  const query = `
    {
      viewer {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed with ${response.status}`);
  }

  const payload = (await response.json()) as {
    data?: {
      viewer?: {
        pinnedItems?: {
          nodes?: Repository[];
        };
      };
    };
    errors?: unknown[];
  };

  if (payload.errors?.length) {
    throw new Error("GitHub API returned GraphQL errors");
  }

  return (
    payload.data?.viewer?.pinnedItems?.nodes?.map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      stargazerCount: repo.stargazerCount,
      forkCount: repo.forkCount,
    })) ?? []
  );
}
