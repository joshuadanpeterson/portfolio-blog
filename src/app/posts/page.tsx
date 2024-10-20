//src/app/posts/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/interfaces/post";

// Fetch posts from the API route
export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts from the API route
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();

      // Sort posts by date (newest first) and then alphabetically by title if dates are the same
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
  }, []);

  // Handle search input and filter posts
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter posts based on search term
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(value),
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Blog Title and Description */}
      <div className="flex flex-col items-center justify-center mt-16 mb-16">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          Blog
        </h1>
        {/* Updated Blog description */}
        <p className="text-lg text-center mt-4 max-w-2xl text-gray-600">
          Welcome to my personal blog, where I share my journey as a web
          developer and explore a wide range of topics at the intersection of
          technology, AI, supply chain logistics, crypto, space, and tech
          policy. Dive into my latest projects, technical insights, and
          tutorials on web development, while also discovering in-depth analyses
          on emerging trends like AI, blockchain, and space exploration. This is
          where I document the evolution of my portfolio, share my learning
          experiences, and provide thought-provoking content on how technology
          is shaping our world.
        </p>
      </div>

      {/* Center the search bar and limit its width */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 w-full max-w-md md:w-1/2 rounded"
          placeholder="Search blog posts..."
        />
      </div>

      {/* Display filtered posts in a grid layout */}
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <li
              key={post.slug}
              className="border rounded-lg overflow-hidden shadow-lg flex flex-col"
            >
              {/* Display Post Image */}
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

              {/* Post Details */}
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
