// src/app/posts/page.tsx

"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TitleUpdater from "@/app/_components/title-updater";
import { Input } from "@/components/ui/input";
import type { Post } from "@/interfaces/post";
import type { FeedItem } from "@/lib/rss";
import { getArtifactLabel, getLaneLabel } from "@/lib/post-lanes";

interface ExtendedFeedItem extends FeedItem {
  "content:encoded"?: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  enclosure?: {
    url: string;
    type: string;
    length: string;
  };
}

type ContentPost = Post | ExtendedFeedItem;

const extractCDATA = (text: string): string => {
  const cdataMatch = text.match(/<!\[CDATA\[(.*?)\]\]>/s);
  return cdataMatch ? cdataMatch[1] : text;
};

const stripHtml = (html: string): string =>
  extractCDATA(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (text: string, length = 120): string =>
  text.length > length ? `${text.substring(0, length - 3)}...` : text;

const isLocalPost = (post: ContentPost): post is Post =>
  "slug" in post && typeof post.slug === "string";

const getExcerpt = (post: ContentPost): string => {
  const excerpt = isLocalPost(post)
    ? post.excerpt
    : post.contentSnippet ||
      post.description ||
      post["content:encoded"] ||
      post.content ||
      "";

  const cleanExcerpt = stripHtml(String(excerpt || ""));

  return cleanExcerpt ? truncate(cleanExcerpt) : "No excerpt available";
};

const getImagePath = (post: ContentPost): string => {
  if (isLocalPost(post)) {
    return post.coverImage || "/assets/blog/preview/cover.jpg";
  }

  if (post.imageUrl) {
    return post.imageUrl.startsWith("http")
      ? post.imageUrl
      : `/assets/blog/${post.imageUrl}`;
  }

  const content = post["content:encoded"] || post.content || "";
  const imgMatch = content.match(/<img.*?src=["'](.*?)["'].*?>/);
  if (imgMatch?.[1]) {
    return imgMatch[1];
  }

  if (post.enclosure?.url) {
    return post.enclosure.url;
  }

  return "/assets/blog/preview/cover.jpg";
};

const getPostHref = (post: ContentPost): string =>
  isLocalPost(post) ? `/posts/${post.slug}` : post.link || "/";

const getPostDate = (post: ContentPost): string | Date =>
  isLocalPost(post) ? post.date : post.pubDate;

const getPostKey = (post: ContentPost): string =>
  isLocalPost(post)
    ? post.slug
    : post.externalId || post.link || `${post.source || "syndicated"}-${post.title}`;

const getSourceLabel = (post: ContentPost): string => {
  if (isLocalPost(post)) {
    return getLaneLabel(post.lane);
  }

  switch (post.source) {
    case "medium":
      return "Medium";
    case "substack":
      return "Substack";
    case "steemit":
      return "Steemit";
    default:
      return "Syndicated";
  }
};

const matchesSearch = (post: ContentPost, query: string): boolean => {
  const value = query.toLowerCase();
  const searchable = isLocalPost(post)
    ? [
        post.title,
        post.excerpt,
        post.lane,
        post.artifactType,
        ...(post.tags ?? []),
      ]
    : [
        post.title,
        post.contentSnippet,
        post.description,
        post.source,
        post.link,
      ];

  return searchable.filter(Boolean).join(" ").toLowerCase().includes(value);
};

const sortByDateDesc = (posts: ContentPost[]): ContentPost[] =>
  [...posts].sort(
    (a, b) =>
      new Date(getPostDate(b)).getTime() - new Date(getPostDate(a)).getTime(),
  );

export default function BlogPage() {
  const [posts, setPosts] = useState<ContentPost[]>([]);
  const [value, setValue] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<ContentPost[]>([]);
  const [suggestions, setSuggestions] = useState<ContentPost[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [syndicatedPosts, apiPosts] = await Promise.all([
          fetch("/api/syndicated-posts").then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch syndicated posts");
            }
            return res.json();
          }),
          fetch("/api/posts").then((res) => res.json()),
        ]);

        const combinedPosts = sortByDateDesc([
          ...(apiPosts as Post[]),
          ...(syndicatedPosts as ExtendedFeedItem[]),
        ]);

        setPosts(combinedPosts);
        setFilteredPosts(combinedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const navigateToPost = (post: ContentPost) => {
    const href = getPostHref(post);

    if (href.startsWith("http")) {
      window.location.href = href;
      return;
    }

    router.push(href);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (inputValue.trim()) {
      const filteredSuggestions = posts.filter((post) =>
        matchesSearch(post, inputValue),
      );
      setSuggestions(filteredSuggestions);
      setFilteredPosts(filteredSuggestions);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setFilteredPosts(posts);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (post: ContentPost) => {
    setValue(post.title || "");
    setFilteredPosts([post]);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selectedPost = suggestions[selectedIndex];
      if (selectedPost) {
        navigateToPost(selectedPost);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim()) {
      const matchedPost = posts.find(
        (post) => post.title.toLowerCase() === value.toLowerCase(),
      );

      if (matchedPost) {
        navigateToPost(matchedPost);
      } else {
        setFilteredPosts(posts.filter((post) => matchesSearch(post, value)));
      }
    } else {
      setFilteredPosts(posts);
    }

    setSuggestions([]);
    setSelectedIndex(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <TitleUpdater title="Lab Notes | Josh Peterson" />
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">
        Lab Notes
      </h1>
      <p className="text-lg text-center mt-5 md:pl-8 max-w-2xl mb-8 text-muted-foreground">
        Automation builds, source trails, public research notes, syndicated
        writing, and practical artifacts from the public lab.
      </p>

      <div className="relative w-full max-w-md mb-12" ref={searchRef}>
        <form onSubmit={handleFormSubmit} className="relative">
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search lab notes..."
          />
          {suggestions.length > 0 && (
            <ul className="absolute w-full bg-background border border-border rounded-b shadow-lg z-10">
              {suggestions.map((post, index) => (
                <li
                  key={getPostKey(post)}
                  onClick={() => handleSuggestionClick(post)}
                  className={`p-2 cursor-pointer hover:bg-accent hover:text-accent-foreground ${
                    index === selectedIndex
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }`}
                >
                  {post.title}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const href = getPostHref(post);
            const external = href.startsWith("http");
            const imagePath = getImagePath(post);

            return (
              <li
                key={getPostKey(post)}
                className="border border-border rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48 bg-muted">
                  <Image
                    src={imagePath}
                    alt={post.title || "Lab note thumbnail"}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={imagePath.includes("cdn.midjourney.com")}
                  />
                </div>
                <div className="p-4">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded border border-border px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {getSourceLabel(post)}
                    </span>
                    {isLocalPost(post) && post.artifactType && (
                      <span className="rounded bg-accent px-2 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
                        {getArtifactLabel(post.artifactType)}
                      </span>
                    )}
                    {!isLocalPost(post) && (
                      <span className="rounded bg-accent px-2 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
                        Syndicated
                      </span>
                    )}
                  </div>
                  <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="text-xl font-semibold text-blue-600 dark:text-sky-400 hover:underline dark:hover:text-sky-300"
                  >
                    {post.title}
                  </Link>
                  <p className="text-muted-foreground text-sm">
                    {new Date(getPostDate(post)).toLocaleDateString()}
                  </p>
                  <p className="text-muted-foreground mt-2 line-clamp-3">
                    {getExcerpt(post)}
                  </p>
                </div>
              </li>
            );
          })
        ) : (
          <li className="col-span-full text-center">No posts found.</li>
        )}
      </ul>
    </div>
  );
}
