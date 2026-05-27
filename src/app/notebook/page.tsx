import Container from "@/app/_components/container";
import { PostPreview } from "@/app/_components/post-preview";
import TitleUpdater from "@/app/_components/title-updater";
import { getPostsByLane } from "@/lib/api";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reporter's Notebook | Josh Peterson",
  description:
    "Cleaned public research logs, source trails, FOIA/public-record methods, and investigation notes from Josh Peterson.",
};

export default function NotebookPage() {
  const posts = getPostsByLane("reporters-notebook");

  return (
    <main>
      <TitleUpdater title="Reporter's Notebook | Josh Peterson" />
      <Container>
        <section className="mb-16 mt-16">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight text-foreground">
            Reporter&apos;s Notebook
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-muted-foreground">
            Cleaned public research logs, source trails, FOIA/public-record
            methods, and investigation notes. Raw reporting stays private until
            it can be published with clear sourcing and safe boundaries.
          </p>
          <div className="mt-8 border-y border-border py-6">
            <p className="max-w-3xl text-muted-foreground">
              The notebook favors evidence artifacts: source maps, document
              trails, methodology notes, open questions, and public-record
              context that make the reporting path inspectable.
            </p>
          </div>
        </section>

        {posts.length > 0 ? (
          <section className="mb-32">
            <h2 className="mb-8 text-4xl md:text-6xl font-bold tracking-tighter leading-tight text-foreground">
              Notebook Entries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32">
              {posts.map((post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  excerpt={post.excerpt}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className="mb-32 max-w-2xl">
            <p className="text-lg text-muted-foreground">
              No public notebook entries are published yet. The full lab index
              is available in{" "}
              <Link
                href="/posts"
                className="text-blue-600 underline hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-300"
              >
                Lab Notes
              </Link>
              .
            </p>
          </section>
        )}
      </Container>
    </main>
  );
}
