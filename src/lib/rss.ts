// src/lib/rss.ts
import Parser from "rss-parser";

export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  image?: string;
}

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "media:content"],
      ["content:encoded", "contentEncoded"],
    ],
  },
});

export async function fetchRSSFeeds(feedUrls: string[]): Promise<FeedItem[]> {
  const feeds = await Promise.all(
    feedUrls.map(async (url) => {
      const feed = await parser.parseURL(url);
      return feed.items.map((item) => {
        let imageUrl = item["media:content"]?.url || item.enclosure?.url || "";

        // Fallback: Attempt to extract the first image from content
        if (!imageUrl && item.contentEncoded) {
          const match = item.contentEncoded.match(/<img.*?src=["'](.*?)["']/);
          if (match) {
            imageUrl = match[1];
          }
        }

        return {
          title: item.title || "No title",
          link: item.link || "#",
          pubDate: item.pubDate || new Date().toISOString(),
          contentSnippet: item.contentSnippet || "No content",
          imageUrl, // Ensure consistent naming
        };
      });
    }),
  );

  return feeds.flat();
}
