// src/app/posts/page.tsx

"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchRSSFeeds, FeedItem } from "@/lib/rss";
import TitleUpdater from "@/app/_components/title-updater";

// Interface for your local post format
interface Post {
  link?: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: {
    name: string;
    picture: string;
  };
  ogImage: {
    url: string;
  };
  slug?: string;
  content?: string;
}

// Interface for RSS feed items
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

// Helper function to extract CDATA content
const extractCDATA = (text: string): string => {
  const cdataMatch = text.match(/<!\[CDATA\[(.*?)\]\]>/s);
  return cdataMatch ? cdataMatch[1] : text;
};

// Helper function to strip HTML and CDATA
const stripHtml = (html: string): string => {
  if (!html) return "";

  let text = extractCDATA(html);
  text = text.replace(/<[^>]*>/g, " ");
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8216;/g, "'")  // Left single quote
    .replace(/&#8217;/g, "'")  // Right single quote
    .replace(/&nbsp;/g, " ");

  return text.replace(/\s+/g, " ").trim();
};

// Helper function to get excerpt
const getExcerpt = (post: Post | ExtendedFeedItem): string => {
  // For local posts with excerpt field
  if ("excerpt" in post && post.excerpt) {
    if (post.excerpt.length > 80) {
      return post.excerpt.substring(0, 77) + "...";
    }
    return post.excerpt;
  }

  // For RSS feed items
  if ("content:encoded" in post && post["content:encoded"]) {
    const content = extractCDATA(post["content:encoded"]);
    const paragraphMatch = content.match(/<p>(.*?)<\/p>/);
    if (paragraphMatch && paragraphMatch[1]) {
      const plainText = stripHtml(paragraphMatch[1]);
      if (plainText.length > 80) {
        return plainText.substring(0, 77) + "...";
      }
      return plainText;
    }
  }

  // For RSS items with description
  if ("description" in post && post.description) {
    const plainText = stripHtml(extractCDATA(post.description));
    if (plainText.length > 80) {
      return plainText.substring(0, 77) + "...";
    }
    return plainText;
  }

  return "No excerpt available";
};

// Helper function to determine image path
const getImagePath = (post: Post | ExtendedFeedItem): string | null => {
  try {
    // For local posts with coverImage (including Midjourney)
    if ("coverImage" in post && post.coverImage) {
      return post.coverImage;
    }

    // For local posts with explicit imageUrl
    if ("imageUrl" in post && post.imageUrl) {
      if (post.imageUrl.startsWith("http")) {
        return post.imageUrl;
      }
      return `/assets/blog/${post.imageUrl}`;
    }

    // For Medium RSS items with content:encoded
    if ("content:encoded" in post && post["content:encoded"]) {
      const imgMatch = post["content:encoded"].match(/<img.*?src="(.*?)".*?>/);
      if (imgMatch && imgMatch[1]) {
        const imageUrl = imgMatch[1];
        if (
          imageUrl.includes("cdn-images-1.medium.com") ||
          imageUrl.includes("cdn.pixabay.com") ||
          imageUrl.includes("img.youtube.com")
        ) {
          return imageUrl;
        }
      }
    }

    // For RSS.app feed items with enclosure
    if ("enclosure" in post && post.enclosure?.url) {
      return post.enclosure.url;
    }

    return "/assets/blog/preview/cover.jpg";
  } catch (error) {
    console.error("Error getting image path:", error);
    return "/assets/blog/preview/cover.jpg";
  }
};

export default function BlogPage() {
  const [posts, setPosts] = useState<(Post | ExtendedFeedItem)[]>([]);
  const [value, setValue] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<
    (Post | ExtendedFeedItem)[]
  >([]);
  const [suggestions, setSuggestions] = useState<(Post | ExtendedFeedItem)[]>(
    [],
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const feedUrls = [
        "/api/proxy-rss?url=https://medium.com/feed/@joshpeterson",
        "/api/proxy-rss?url=https://rss.app/feeds/Q0d7If1vLw2uZdL2.xml",
        "/api/proxy-rss?url=https://joshuadanpeterson.substack.com/feed",
      ];

      try {
        const [rssData, apiPosts] = await Promise.all([
          fetchRSSFeeds(feedUrls),
          fetch("/api/posts").then((res) => res.json()),
        ]);

        const processedRssData = (rssData as ExtendedFeedItem[]).map(
          (post) => ({
            ...post,
            "content:encoded": post["content:encoded"] || undefined,
            description: post.description || undefined,
          }),
        );

        const combinedPosts = [...apiPosts, ...processedRssData].sort(
          (a, b) =>
            new Date(b.pubDate || b.date).getTime() -
            new Date(a.pubDate || a.date).getTime(),
        );

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (inputValue.trim()) {
      const filteredSuggestions = posts.filter((post) =>
        (post.title || "").toLowerCase().includes(inputValue.toLowerCase()),
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

  const handleSuggestionClick = (currentPost: Post | ExtendedFeedItem) => {
    setValue(currentPost.title || "");
    setFilteredPosts([currentPost]);
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
        setValue(selectedPost.title || "");
        setSuggestions([]);

        // Use type narrowing to safely access slug
        if ("slug" in selectedPost && selectedPost.slug) {
          router.push(selectedPost.link || `/posts/${selectedPost.slug}`);
        } else {
          router.push(selectedPost.link || "/");
        }
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim()) {
      const matchedPost = posts.find(
        (post) => (post.title || "").toLowerCase() === value.toLowerCase(),
      );

      if (matchedPost) {
        // Safely access slug with type check
        if ("slug" in matchedPost && matchedPost.slug) {
          router.push(matchedPost.link || `/posts/${matchedPost.slug}`);
        } else {
          router.push(matchedPost.link || "/");
        }
      } else {
        const filtered = posts.filter((post) =>
          (post.title || "").toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredPosts(filtered);
      }
    } else {
      setFilteredPosts(posts);
    }

    setSuggestions([]);
    setSelectedIndex(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <TitleUpdater title="Blog | Josh Peterson" />
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">
        Blog
      </h1>
      <p className="text-lg text-center mt-5 md:pl-8 max-w-2xl mb-8">
        Welcome to my personal blog, where I share my journey as a web developer
        and explore a wide range of topics at the intersection of technology,
        AI, supply chain logistics, crypto, space, and tech policy.
      </p>

      <div className="relative w-full max-w-md mb-12" ref={searchRef}>
        <form onSubmit={handleFormSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search blog posts..."
            className="border border-gray-300 p-2 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-shadow duration-200"
          />
          {suggestions.length > 0 && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-b shadow-lg z-10">
              {suggestions.map((currentPost, index) => (
                <li
                  key={
                    currentPost.link ||
                    ("slug" in currentPost ? currentPost.slug : "")
                  }
                  onClick={() => handleSuggestionClick(currentPost)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    index === selectedIndex ? "bg-gray-200" : ""
                  }`}
                >
                  {currentPost.title}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((currentPost) => (
            <li
              key={
                currentPost.link ||
                ("slug" in currentPost ? currentPost.slug : "")
              }
              className="border rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                {getImagePath(currentPost) ? (
                  <Image
                    src={getImagePath(currentPost) as string} // Type assertion to ensure it's treated as string
                    alt={currentPost.title || "Blog post thumbnail"}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={getImagePath(currentPost)?.includes(
                      "cdn.midjourney.com",
                    )} // Ensure no null errors
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <Link
                  href={
                    currentPost.link ||
                    `/posts/${"slug" in currentPost ? currentPost.slug : ""}`
                  }
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {currentPost.title}
                </Link>
                <p className="text-gray-500 text-sm">
                  {new Date(
                    "pubDate" in currentPost && currentPost.pubDate
                      ? currentPost.pubDate
                      : "date" in currentPost && currentPost.date
                        ? currentPost.date
                        : new Date().toISOString(), // Fallback to current date if neither exists
                  ).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {getExcerpt(currentPost)}
                </p>
              </div>
            </li>
          ))
        ) : (
          <li className="col-span-full text-center">No posts found.</li>
        )}
      </ul>
    </div>
  );
}
