// @/lib/github
// Grabs pinned repositories from GitHub using the GitHub GraphQL API
const GITHUB_API_URL = "https://api.github.com/graphql";

export async function fetchPinnedRepos() {
  const query = `
    {
      user(login: "joshuadanpeterson") {
        pinnedItems(first: 6, types: [REPOSITORY]) {
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
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch pinned repositories");
  }

  const result = await response.json();
  return result.data.user.pinnedItems.nodes;
}
