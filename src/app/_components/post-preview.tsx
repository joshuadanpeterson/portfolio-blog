// src/app/_components/post-preview.tsx

import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          href={`/posts/${slug}`}
          className="text-black hover:underline hover:text-blue-600 transition-colors duration-200"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4 text-gray-600">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4 text-gray-700">{excerpt}</p>
      {author && <Avatar name={author.name} picture={author.picture} />}
    </div>
  );
}
