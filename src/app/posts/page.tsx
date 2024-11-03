// src/app/posts/page.tsx

"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/interfaces/post";
import { useRouter } from "next/navigation";
import { fetchRSSFeeds, FeedItem } from "@/lib/rss";

// Extended interface for RSS feed items
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

// Helper function to strip HTML and CDATA
const stripHtml = (html: string): string => {
  if (!html) return "";

  // Remove CDATA
  let text = html.replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1");

  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, " ");

  // Decode HTML entities
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

  // Clean up whitespace
  text = text.replace(/\s+/g, " ").trim();

  return text;
};

// Debug logging function
const debugLog = (post: any) => {
  console.log("Post Content Debug:");
  console.log("Title:", post.title);
  console.log("Content:encoded:", post["content:encoded"]?.substring(0, 100));
  console.log("Description:", post.description?.substring(0, 100));
  console.log("Content:", post.content?.substring(0, 100));
};

// Helper function to get excerpt
const getExcerpt = (post: Post | ExtendedFeedItem): string => {
  // Debug log
  debugLog(post);

  let content = "";
  let excerpt = "";

  // Try Medium content:encoded first
  if ("content:encoded" in post && post["content:encoded"]) {
    content = post["content:encoded"];
    // Find first paragraph content
    const paragraphMatch = content.match(/<p>(.*?)<\/p>/);
    if (paragraphMatch && paragraphMatch[1]) {
      excerpt = stripHtml(paragraphMatch[1]);
    }
  }

  // Try description next
  if (!excerpt && "description" in post && post.description) {
    excerpt = stripHtml(post.description);
  }

  // Try content field
  if (!excerpt && "content" in post && post.content) {
    excerpt = stripHtml(post.content);
  }

  // Try excerpt field for local posts
  if (!excerpt && "excerpt" in post && post.excerpt) {
    excerpt = post.excerpt;
  }

  // If we have an excerpt, trim it to 80 chars
  if (excerpt) {
    if (excerpt.length > 80) {
      return excerpt.substring(0, 77) + "...";
    }
    return excerpt;
  }

  return "No excerpt available";
};

// Helper function for image path
const getImagePath = (post: Post | ExtendedFeedItem): string => {
  // For Medium RSS items
  if ("content:encoded" in post && post["content:encoded"]) {
    const imgMatch = post["content:encoded"].match(/<img.*?src="(.*?)".*?>/);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  // For RSS.app feed items with enclosure
  if ("enclosure" in post && post.enclosure?.url) {
    return post.enclosure.url;
  }

  // For posts with description containing image
  if ("description" in post && post.description) {
    const imgMatch = post.description.match(/<img.*?src="(.*?)".*?>/);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  // For direct imageUrl
  if ("imageUrl" in post && post.imageUrl) {
    return post.imageUrl.startsWith("http")
      ? post.imageUrl
      : `/assets/blog/${post.imageUrl}`;
  }

  // For local posts with slug
  if ("slug" in post) {
    return `/assets/blog/${post.slug}/cover.jpg`;
  }

  // Default fallback
  return "/assets/blog/preview/cover.jpg";
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
      ];

      try {
        const [rssData, apiPosts] = await Promise.all([
          fetchRSSFeeds(feedUrls),
          fetch("/api/posts").then((res) => res.json()),
        ]);

        console.log("Raw RSS Data:", rssData); // Debug log

        const processedRssData = (rssData as ExtendedFeedItem[]).map((post) => {
          const excerpt = getExcerpt(post);
          console.log(`Processed excerpt for ${post.title}:`, excerpt); // Debug log
          return {
            ...post,
            excerpt,
          };
        });

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

  const handleSuggestionClick = (post: Post | ExtendedFeedItem) => {
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
        setValue(selectedPost.title || "");
        setSuggestions([]);
        router.push(selectedPost.link || `/posts/${selectedPost.slug}`);
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
        router.push(matchedPost.link || `/posts/${matchedPost.slug}`);
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
              {suggestions.map((post, index) => (
                <li
                  key={post.link || post.slug}
                  onClick={() => handleSuggestionClick(post)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    index === selectedIndex ? "bg-gray-200" : ""
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
          filteredPosts.map((post) => (
            <li
              key={post.link || post.slug}
              className="border rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={getImagePath(post)}
                  alt={post.title || "Blog post thumbnail"}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <Link
                  href={post.link || `/posts/${post.slug}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-gray-500 text-sm">
                  {new Date(post.pubDate || post.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {getExcerpt(post)}
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
