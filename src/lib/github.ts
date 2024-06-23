// @/lib/github
// Grabs pinned repositories from GitHub using the GitHub GraphQL API

import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/graphql";
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

interface Repository {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
}

export async function fetchPinnedRepos(): Promise<Repository[]> {
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

  const response = await axios.post(
    GITHUB_API_URL,
    { query },
    {
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    },
  );

  return response.data.data.viewer.pinnedItems.nodes.map((repo: any) => ({
    name: repo.name,
    description: repo.description,
    url: repo.url,
    stargazerCount: repo.stargazerCount,
    forkCount: repo.forkCount,
  }));
}
