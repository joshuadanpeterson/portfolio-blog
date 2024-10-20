import { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts } from "@/lib/api";

// This API route fetches all the posts
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPosts(); // Fetch all posts using fs on the server
  res.status(200).json(posts); // Return posts as JSON
}
