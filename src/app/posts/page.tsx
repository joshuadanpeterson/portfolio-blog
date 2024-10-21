//src/app/posts/page.tsx
"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/interfaces/post";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [value, setValue] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [suggestions, setSuggestions] = useState<Post[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();

      const sortedPosts = data.sort((post1: Post, post2: Post) => {
        const date1 = new Date(post1.date);
        const date2 = new Date(post2.date);
        if (date1 > date2) return -1;
        if (date1 < date2) return 1;
        return post1.title
          .toLowerCase()
          .localeCompare(post2.title.toLowerCase());
      });

      setPosts(sortedPosts);
      setFilteredPosts(sortedPosts);
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
        post.title.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
      setFilteredPosts(filteredSuggestions);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setFilteredPosts(posts); // Reset to show all posts when input is empty
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (post: Post) => {
    setValue(post.title);
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
      handleSuggestionClick(suggestions[selectedIndex]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts); // Reset to show all posts when form is submitted with empty input
    }
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const suggestionListStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderTop: "none",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    zIndex: 1000,
    maxHeight: "300px",
    overflowY: "auto",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  };

  const suggestionItemStyle: React.CSSProperties = {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  };

  const selectedItemStyle: React.CSSProperties = {
    ...suggestionItemStyle,
    backgroundColor: "#f0f0f0",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center mt-16 mb-16">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          Blog
        </h1>
        <p className="text-lg text-center mt-4 max-w-2xl text-gray-600">
          Welcome to my personal blog, where I share my journey as a web
          developer and explore a wide range of topics at the intersection of
          technology, AI, supply chain logistics, crypto, space, and tech
          policy.
        </p>
      </div>

      <div className="relative flex justify-center mb-6" ref={searchRef}>
        <form onSubmit={handleFormSubmit} className="relative w-full max-w-md">
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
            <ul style={suggestionListStyle}>
              {suggestions.map((post, index) => (
                <li
                  key={post.slug}
                  onClick={() => handleSuggestionClick(post)}
                  style={
                    index === selectedIndex
                      ? selectedItemStyle
                      : suggestionItemStyle
                  }
                  className={`hover:bg-gray-100 ${index === selectedIndex ? "bg-gray-200" : ""}`}
                >
                  {post.title}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <li
              key={post.slug}
              className="border rounded-lg overflow-hidden shadow-lg flex flex-col"
            >
              <div className="relative h-48">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    objectFit="cover"
                    className="w-full"
                  />
                )}
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-gray-500 text-sm">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mt-2">{post.excerpt}</p>
              </div>
            </li>
          ))
        ) : (
          <li>No posts found.</li>
        )}
      </ul>
    </div>
  );
}
