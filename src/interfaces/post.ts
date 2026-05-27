import { type Author } from "./author";
import { type ArtifactType, type PostLane } from "@/lib/post-lanes";

export type Post = {
  slug: string;
  title: string;
  date: string | Date;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  lane: PostLane;
  artifactType?: ArtifactType;
  tags?: string[];
  preview?: boolean;
};
