// src/lib/api.ts
import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

/**
 * Normalize Dropbox paths to handle both symlink and actual paths
 * This solves the issue where process.cwd() resolves to the actual path,
 * but the user is navigating via the symlink path
 */
function getPostsDirectory(): string {
  // Standard path using process.cwd()
  const standardPath = join(process.cwd(), "_posts");
  
  // Try to detect if we're in a Dropbox folder with potential symlink issues
  if (process.cwd().includes("Dropbox")) {
    // Case 1: We're in the CloudStorage path (the actual path)
    if (process.cwd().includes("Library/CloudStorage/Dropbox")) {
      // Check if the symlink version exists as an alternative
      const symlinkPath = process.cwd().replace(
        "/Library/CloudStorage/Dropbox/",
        "/Dropbox/"
      );
      const alternativePath = join(symlinkPath, "_posts");
      
      if (fs.existsSync(alternativePath)) {
        return alternativePath;
      }
    } 
    // Case 2: We're in the symlink path
    else if (process.cwd().match(/\/Users\/[^\/]+\/Dropbox\//)) {
      // Check if the CloudStorage version exists as an alternative
      const cloudPath = process.cwd().replace(
        /\/Users\/([^\/]+)\/Dropbox\//,
        "/Users/$1/Library/CloudStorage/Dropbox/"
      );
      const alternativePath = join(cloudPath, "_posts");
      
      if (fs.existsSync(alternativePath)) {
        return alternativePath;
      }
    }
  }
  
  // Default to the standard path if no alternatives are found
  return standardPath;
}

const postsDirectory = getPostsDirectory();

/**
 * Convert a filename to a URL-friendly slug
 */
export function filenameToSlug(filename: string): string {
  // Remove .md extension if present
  const withoutExtension = filename.replace(/\.md$/, "");
  
  // Check if the filename is already URL-encoded
  // %25 is the encoding for the % character, indicating double-encoding
  if (withoutExtension.includes('%25')) {
    // If already double-encoded, return as is
    console.log(`Filename already double-encoded: ${withoutExtension}`);
    return withoutExtension;
  } else if (withoutExtension.includes('%')) {
    // If already single-encoded, return as is
    console.log(`Filename already encoded: ${withoutExtension}`);
    return withoutExtension;
  }
  
  // Encode the filename to be URL-safe, preserving hierarchy
  return encodeURIComponent(withoutExtension);
}

/**
 * Convert a URL-friendly slug back to a filename
 */
export function slugToFilename(slug: string): string {
  let decodedSlug: string;
  
  try {
    // Try to decode the slug, handling potential double-encoding
    if (slug.includes('%25')) {
      // Handle double-encoded slugs (e.g., %2520 instead of %20)
      console.log(`Decoding double-encoded slug: ${slug}`);
      decodedSlug = decodeURIComponent(decodeURIComponent(slug));
    } else {
      // Standard decoding for normal slugs
      decodedSlug = decodeURIComponent(slug);
    }
  } catch (error: unknown) {
    // If decoding fails, use the original slug as a fallback
    console.warn(`Error decoding slug '${slug}':`, error);
    decodedSlug = slug;
  }
  
  // Add .md extension if not present
  return decodedSlug.endsWith(".md") ? decodedSlug : `${decodedSlug}.md`;
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}
export function getPostBySlug(slug: string) {
  console.log(`getPostBySlug called with slug: "${slug}"`);
  
  // Determine if the input is a filename or a URL slug
  const isFilename = slug.toLowerCase().endsWith('.md');
  
  let filename: string;
  
  if (isFilename) {
    // Input is already a filename
    filename = slug;
    console.log(`Input is a filename: "${filename}"`);
  } else {
    // Input is a slug, convert to filename
    filename = slugToFilename(slug);
    console.log(`Converted slug to filename: "${filename}"`);
  }
  
  // Generate the slug from the filename to ensure consistency
  const fileBasedSlug = filenameToSlug(filename);
  console.log(`Generated slug from filename: "${fileBasedSlug}"`);
  
  // Normalize path to prevent double slashes
  const normPath = postsDirectory.replace(/\/+$/, ''); // Remove trailing slashes
  const fullPath = join(normPath, filename.replace(/^\/+/, '')); // Remove leading slashes
  
  console.log(`Attempting to read file from: "${fullPath}"`);
  
  // Try multiple approaches to find the correct file
  const pathsToTry = [
    fullPath, // First try the full path with normalized filename
  ];
  
  // Add alternative paths for fallback
  if (!isFilename) {
    // Only add these fallbacks if the original input was a slug
    let decodedSlug: string;
    
    try {
      // Handle potentially double-encoded slugs
      if (slug.includes('%25')) {
        console.log(`Detected double-encoded slug: ${slug}`);
        decodedSlug = decodeURIComponent(decodeURIComponent(slug));
      } else {
        decodedSlug = decodeURIComponent(slug);
      }
    } catch (error: unknown) {
      console.warn(`Error decoding slug '${slug}':`, error);
      decodedSlug = slug;
    }
    
    // Remove .md extension if present
    const realSlug = decodedSlug.replace(/\.md$/, "");
    
    pathsToTry.push(
      join(normPath, `${realSlug}.md`), // Try with realSlug + .md
      join(normPath, decodedSlug), // Try with raw decoded slug
      join(normPath, filename.replace(/\'/g, "\\'")), // Try escaping single quotes
      join(normPath, filename.replace(/`/g, "\\`")), // Try escaping backticks
    );
  }
  
  let lastError = null;
  
  // Try each path in sequence
  for (const path of pathsToTry) {
    try {
      console.log(`Trying path: "${path}"`);
      const fileContents = fs.readFileSync(path, "utf8");
      const { data, content } = matter(fileContents);
      
      // Always use the filename as the basis for the slug to ensure consistency
      // This ensures URLs are derived from filenames, not post titles
      const encodedSlug = fileBasedSlug;
      console.log(`Successfully loaded post from: "${path}", using slug: "${encodedSlug}"`);
      return { ...data, slug: encodedSlug, content } as Post;
    } catch (error: unknown) {
      lastError = error;
      console.log(`Failed to read from path: "${path}" - ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  // If we get here, all attempts failed
  console.error(`All attempts to load post with slug "${slug}" failed:`, lastError instanceof Error ? lastError.message : String(lastError));
  throw lastError;
}

export function getAllPosts(): Post[] {
  console.log(`getAllPosts: Getting posts from directory: ${postsDirectory}`);
  const filenames = getPostSlugs();
  console.log(`getAllPosts: Found ${filenames.length} files: ${JSON.stringify(filenames)}`);
  
  // Filter out non-markdown files (like .DS_Store)
  const markdownFiles = filenames.filter(filename => {
    const isMarkdown = filename.toLowerCase().endsWith('.md');
    if (!isMarkdown) {
      console.log(`getAllPosts: Skipping non-markdown file: "${filename}"`);
    }
    return isMarkdown;
  });
  console.log(`getAllPosts: Processing ${markdownFiles.length} markdown files`);
  
  // Log any suspicious filenames that might cause issues
  markdownFiles.forEach(filename => {
    if (filename.includes(' ') || filename.includes('`') || filename.includes("'") || 
        filename.includes('%') || filename.includes('&')) {
      console.log(`getAllPosts: Warning - Special characters in filename: "${filename}"`);
    }
  });
  
  const posts = markdownFiles
    .map((filename) => {
      try {
        // We pass the raw filename to getPostBySlug
        // This ensures the slug is derived from the filename
        const post = getPostBySlug(filename);
        console.log(`getAllPosts: Successfully processed post: \"${filename}\"`, {
          title: post.title,
          slug: post.slug,
          date: post.date,
          hasAuthor: !!post.author,
          hasHeroImage: !!post.coverImage,
          excerpt: post.excerpt?.substring(0, 50) + '...',
        });
        return post;
      } catch (error) {
        console.warn(`getAllPosts: Error loading post from file \"${filename}\":`, error);
        // Log more details for debugging
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT' && 'path' in error) {
          console.warn(`getAllPosts: File not found: ${(error as { path: string }).path}`);
        } else if (error instanceof Error) {
          console.warn(`getAllPosts: Error type: ${error.name}, Message: ${error.message}`);
          if (error.stack) {
            console.warn(`getAllPosts: Stack trace: ${error.stack}`);
          }
        }
        return null;
      }
    })
    .filter((post): post is Post => {
      if (post === null) {
        // Additional logging for filtered out posts
        console.log('getAllPosts: Post was filtered out because it failed to load');
        return false;
      }
      return true;
    })
    // Sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  
  console.log(`getAllPosts: Successfully loaded ${posts.length} posts`);
  
  // Log the first post that would be used as the hero post
  if (posts.length > 0) {
    const heroPost = posts[0];
    console.log(`getAllPosts: Hero post candidate:`, {
      title: heroPost.title,
      slug: heroPost.slug,
      date: heroPost.date,
      author: heroPost.author ? {
        name: heroPost.author.name,
        picture: heroPost.author.picture
      } : 'undefined',
      hasExcerpt: !!heroPost.excerpt,
      hasCoverImage: !!heroPost.coverImage
    });
  } else {
    console.log(`getAllPosts: No posts available for hero post`);
  }
  
  return posts;
}
