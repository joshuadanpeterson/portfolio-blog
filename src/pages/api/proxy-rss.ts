// src/pages/api/proxy-rss.ts
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing RSS feed URL" });
  }

  try {
    const response = await fetch(url);
    const data = await response.text();
    res.setHeader("Content-Type", "application/rss+xml");
    res.status(200).send(data);
  } catch (error) {
    console.error("Error proxying RSS feed:", error);
    res.status(500).json({ error: "Failed to fetch RSS feed" });
  }
}
