// src/app/page.tsx
import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import TitleUpdater from "@/app/_components/title-updater";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";

/**
 * Checks if a post has all required fields
 * @param post - The post to validate
 * @returns boolean indicating if the post is valid
 */
function isValidPost(post: Partial<Post> | null | undefined): post is Post {
  const date =
    post?.date instanceof Date
      ? post.date
      : typeof post?.date === "string"
        ? new Date(post.date)
        : null;

  return Boolean(
    post &&
    typeof post.title === 'string' &&
    typeof post.coverImage === 'string' &&
    date &&
    !Number.isNaN(date.getTime()) &&
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
  
  // Filter to get only valid posts
  const validPosts = allPosts.filter(isValidPost);
  
  // Select the best post for hero display
  const heroPost = validPosts.length > 0 ? validPosts[0] : null;
  
  // The rest of valid posts will be displayed in the more stories section
  const morePosts = validPosts.slice(1);

  // Set the homepage title
  const homePageTitle = "Josh Peterson | Portfolio & Blog";

  return (
    <main>
      <TitleUpdater title={homePageTitle} />
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
