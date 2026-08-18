import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  Search,
  Star,
  Users as UsersIcon,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";

import {
  getGitHubRepositories,
  getGitHubUser,
} from "../../services/githubApi";

import type {
  GitHubRepository,
  GitHubUser,
} from "../../types/github";


type SortOption =
  | "stars"
  | "name";


const Users = () => {

  // ==============================
  // Search
  // ==============================

  const [username, setUsername] =
    useState("");

  const [debouncedUsername, setDebouncedUsername] =
    useState("");


  // ==============================
  // GitHub Data
  // ==============================

  const [user, setUser] =
    useState<GitHubUser | null>(null);

  const [repositories, setRepositories] =
    useState<GitHubRepository[]>([]);


  // ==============================
  // UI State
  // ==============================

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [repoSearch, setRepoSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState<SortOption>("stars");


  // ==============================
  // Debounce Search
  // ==============================

  useEffect(() => {

    const timer = setTimeout(() => {
      setDebouncedUsername(
        username.trim()
      );
    }, 500);


    return () => {
      clearTimeout(timer);
    };

  }, [username]);


  // ==============================
  // Fetch GitHub Data
  // ==============================

  useEffect(() => {

    if (!debouncedUsername) {

      setUser(null);
      setRepositories([]);
      setError("");

      return;
    }


    const fetchGitHubData =
      async () => {

        try {

          setLoading(true);
          setError("");

          setUser(null);
          setRepositories([]);


          // Fetch user and repositories
          // at the same time
          const [
            userData,
            repoData,
          ] = await Promise.all([
            getGitHubUser(
              debouncedUsername
            ),

            getGitHubRepositories(
              debouncedUsername
            ),
          ]);


          setUser(userData);
          setRepositories(repoData);

        } catch (error) {

          if (
            error instanceof Error
          ) {
            setError(error.message);
          } else {
            setError(
              "Unable to fetch GitHub data."
            );
          }

          setUser(null);
          setRepositories([]);

        } finally {

          setLoading(false);

        }
      };


    fetchGitHubData();

  }, [debouncedUsername]);


  // ==============================
  // Filter + Sort Repositories
  // ==============================

  const filteredRepositories =
    useMemo(() => {

      const filtered =
        repositories.filter(
          (repo) =>
            repo.name
              .toLowerCase()
              .includes(
                repoSearch.toLowerCase()
              )
        );


      return [...filtered].sort(
        (a, b) => {

          if (sortBy === "stars") {
            return (
              b.stargazers_count -
              a.stargazers_count
            );
          }

          return a.name.localeCompare(
            b.name
          );
        }
      );

    }, [
      repositories,
      repoSearch,
      sortBy,
    ]);


  return (
    <div className="space-y-6">

      {/* =================================
          PAGE HEADER
      ================================== */}

      <div>

        <h1 className="font-primary text-2xl font-semibold text-text-primary">
          GitHub Users
        </h1>

        <p className="mt-1 text-sm text-text-secondary">
          Search for a GitHub user and explore their repositories.
        </p>

      </div>


      {/* =================================
          USERNAME SEARCH
      ================================== */}

      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">

        <label
          htmlFor="github-username"
          className="mb-2 block text-sm font-medium text-gray-800"
        >
          GitHub Username
        </label>


        <div className="relative max-w-xl">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />


          <input
            id="github-username"
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(
                event.target.value
              )
            }
            placeholder="Enter GitHub username..."
            className="w-full rounded-lg border border-border py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-green-100"
          />

        </div>


        <p className="mt-2 text-xs text-text-secondary">
          Search waits 500ms after you stop typing before making the request.
        </p>

      </div>


      {/* =================================
          LOADING
      ================================== */}

      {loading && (

        <div className="flex items-center justify-center rounded-xl border border-border bg-white p-12">

          <div className="flex items-center gap-3 text-sm text-text-secondary">

            <LoaderCircle
              size={20}
              className="animate-spin text-primary"
            />

            Fetching GitHub data...

          </div>

        </div>

      )}


      {/* =================================
          ERROR
      ================================== */}

      {!loading && error && (

        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5">

          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0 text-red-500"
          />

          <div>

            <h3 className="text-sm font-semibold text-red-700">
              Unable to load GitHub data
            </h3>

            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>

          </div>

        </div>

      )}


      {/* =================================
          USER PROFILE
      ================================== */}

      {!loading && user && (

        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            {/* Avatar */}

            <img
              src={user.avatar_url}
              alt={`${user.login} avatar`}
              className="h-24 w-24 rounded-full border-4 border-green-50 object-cover"
            />


            {/* User Info */}

            <div className="flex-1">

              <div className="flex flex-wrap items-center gap-3">

                <h2 className="font-primary text-xl font-semibold text-gray-900">
                  {user.name ||
                    user.login}
                </h2>


                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  @{user.login}

                  <ExternalLink
                    size={14}
                  />

                </a>

              </div>


              <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
                {user.bio ||
                  "No bio available."}
              </p>


              {/* Followers */}

              <div className="mt-4 flex flex-wrap gap-5">

                <div className="flex items-center gap-2 text-sm">

                  <UsersIcon
                    size={17}
                    className="text-primary"
                  />

                  <span className="font-semibold">
                    {user.followers}
                  </span>

                  <span className="text-text-secondary">
                    followers
                  </span>

                </div>


                <div className="text-sm">

                  <span className="font-semibold">
                    {user.public_repos}
                  </span>

                  <span className="ml-1 text-text-secondary">
                    public repos
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =================================
          REPOSITORIES
      ================================== */}

      {!loading && user && (

        <section className="rounded-xl border border-border bg-white shadow-sm">

          {/* Repository Header */}

          <div className="flex flex-col gap-4 border-b border-border p-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="font-primary text-lg font-semibold">
                Repositories
              </h2>

              <p className="mt-1 text-xs text-text-secondary">
                {filteredRepositories.length} repositories shown
              </p>

            </div>


            <div className="flex flex-col gap-3 sm:flex-row">

              {/* Repository Search */}

              <div className="relative">

                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={repoSearch}
                  onChange={(event) =>
                    setRepoSearch(
                      event.target.value
                    )
                  }
                  placeholder="Filter repositories..."
                  className="w-full rounded-lg border border-border py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary sm:w-64"
                />

              </div>


              {/* Sort */}

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target
                      .value as SortOption
                  )
                }
                className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-primary"
              >

                <option value="stars">
                  Sort by Stars
                </option>

                <option value="name">
                  Sort by Name
                </option>

              </select>

            </div>

          </div>


          {/* Repository List */}

          {filteredRepositories.length ===
            0 ? (

            <div className="p-10 text-center">

              <p className="text-sm text-text-secondary">
                No repositories found.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-border">

              {filteredRepositories.map(
                (repo) => (

                  <div
                    key={repo.id}
                    className="p-5 transition hover:bg-gray-50"
                  >

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                      {/* Repo Details */}

                      <div className="min-w-0 flex-1">

                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-primary text-base font-semibold text-gray-900 hover:text-primary"
                        >
                          {repo.name}
                        </a>


                        <p className="mt-1 max-w-3xl text-sm leading-6 text-text-secondary">

                          {repo.description ||
                            "No description available."}

                        </p>


                        {/* Metadata */}

                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-text-secondary">

                          {/* Stars */}

                          <span className="flex items-center gap-1">

                            <Star
                              size={15}
                              className="fill-yellow-400 text-yellow-400"
                            />

                            {repo.stargazers_count}

                          </span>


                          {/* Language */}

                          {repo.language && (

                            <span className="rounded-full bg-gray-100 px-2.5 py-1">

                              {repo.language}

                            </span>

                          )}

                        </div>

                      </div>


                      {/* GitHub Link */}

                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-primary hover:text-primary"
                      >

                        View

                        <ExternalLink
                          size={14}
                        />

                      </a>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      )}

    </div>
  );
};

export default Users;