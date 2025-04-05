import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

export default async function Post(props: any) {
  const { params } = props;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const { heading, content } = await markdownToHtml(post.content || "");
  
  // Use the extracted heading from markdown if available, otherwise use frontmatter title
  const displayTitle = heading || post.title;

  return (
    <main>
      {/* <Alert preview={post.preview} /> */}
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={displayTitle}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const { params } = props;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }
  
  // Extract heading from markdown to use in metadata if available
  const { heading } = await markdownToHtml(post.content || "");
  
  // Use the extracted heading if available, otherwise use frontmatter title
  const postTitle = heading || post.title;
  const title = `${postTitle} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
