// src/app/page.tsx
import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";

/**
 * Checks if a post has all required fields
 * @param post - The post to validate
 * @returns boolean indicating if the post is valid
 */
function isValidPost(post: any): post is Post {
  return (
    post &&
    typeof post.title === 'string' &&
    typeof post.coverImage === 'string' &&
    (post.date instanceof Date || !isNaN(new Date(post.date).getTime())) &&
    typeof post.excerpt === 'string' &&
    typeof post.slug === 'string' &&
    // Check if author exists and has required properties
    post.author && 
    typeof post.author.name === 'string' &&
    typeof post.author.picture === 'string'
  );
}

export default function Index() {
  const allPosts = getAllPosts();
  console.log("DEBUG - All posts retrieved:", allPosts);
  
  // Log validation details for each post
  allPosts.forEach((post, index) => {
    console.log(`DEBUG - Validating post ${index}:`, {
      title: post.title ? "✓" : "✗",
      coverImage: post.coverImage ? "✓" : "✗",
      date: post.date ? "✓" : "✗",
      excerpt: post.excerpt ? "✓" : "✗", 
      slug: post.slug ? "✓" : "✗",
      author: post.author ? "✓" : "✗",
      authorName: post.author?.name ? "✓" : "✗",
      authorPicture: post.author?.picture ? "✓" : "✗",
      isValid: isValidPost(post)
    });
  });
  
  // Filter to get only valid posts
  const validPosts = allPosts.filter(isValidPost);
  console.log(`DEBUG - Valid posts count: ${validPosts.length}/${allPosts.length}`);
  console.log("DEBUG - Valid posts:", validPosts);
  
  // Select the best post for hero display
  const heroPost = validPosts.length > 0 ? validPosts[0] : null;
  console.log("DEBUG - Hero post:", heroPost);
  
  // The rest of valid posts will be displayed in the more stories section
  const morePosts = validPosts.slice(1);
  console.log("DEBUG - More posts:", morePosts);

  return (
    <main>
      <Container>
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
