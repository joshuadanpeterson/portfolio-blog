// src/lib/rss.ts
import Parser from "rss-parser";

export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

const parser = new Parser();

export async function fetchRSSFeeds(feedUrls: string[]): Promise<FeedItem[]> {
  const feeds = await Promise.all(
    feedUrls.map(async (url) => {
      const feed = await parser.parseURL(url);
      return feed.items.map((item) => ({
        title: item.title || "No title",
        link: item.link || "#",
        pubDate: item.pubDate || new Date().toISOString(),
        contentSnippet: item.contentSnippet || "No content",
      }));
    }),
  );

  return feeds.flat();
}
