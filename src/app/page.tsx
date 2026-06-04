// src/app/page.tsx
import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import TitleUpdater from "@/app/_components/title-updater";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";
import Link from "next/link";

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
  const homePageTitle = "Josh Peterson | Public Automation Lab";

  return (
    <main>
      <TitleUpdater title={homePageTitle} />
      <Container>
        <section className="mb-16 md:mb-24">
          <div className="max-w-5xl">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight text-foreground">
              Public automation lab and reporter&apos;s notebook.
            </h1>
            <p className="mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-muted-foreground">
              I investigate messy systems, document the source trail, and turn
              repeatable work into practical automation. The first niche pilot
              is small-business AI workflow automation for solo operators and
              tiny teams.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/posts"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/85"
              >
                Read lab notes
              </Link>
              <Link
                href="/freelance"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-foreground px-5 py-3 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
              >
                Work with Josh
              </Link>
              <Link
                href="/notebook"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Open the notebook
              </Link>
            </div>
          </div>
          <div className="mt-12 grid gap-8 border-y border-border py-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Automation Lab
              </h2>
              <p className="mt-3 text-muted-foreground">
                Workflow systems, Google Sheets tools, Apps Script snippets,
                AI-assisted operations, and implementation notes with practical
                artifacts.
              </p>
              <Link
                href="/freelance"
                className="mt-4 inline-flex text-sm font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-300"
              >
                Hire me for automation and internal tools
              </Link>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Reporter&apos;s Notebook
              </h2>
              <p className="mt-3 text-muted-foreground">
                Public research logs, source trails, FOIA/public-record methods,
                and cleaned investigation notes that show the evidence path.
              </p>
            </div>
          </div>
        </section>
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
