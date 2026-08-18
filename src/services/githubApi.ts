import type {
  GitHubRepository,
  GitHubUser,
} from "../types/github";

const GITHUB_API_URL = "https://api.github.com";

const githubFetch = async <T>(
  endpoint: string
): Promise<T> => {
  const response = await fetch(
    `${GITHUB_API_URL}${endpoint}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("GitHub user not found.");
    }

    if (response.status === 403) {
      throw new Error(
        "GitHub API rate limit exceeded. Please try again later."
      );
    }

    throw new Error(
      "Something went wrong while fetching GitHub data."
    );
  }

  return response.json();
};

export const getGitHubUser = (
  username: string
) => {
  return githubFetch<GitHubUser>(
    `/users/${encodeURIComponent(username)}`
  );
};

export const getGitHubRepositories = (
  username: string
) => {
  return githubFetch<GitHubRepository[]>(
    `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
  );
};