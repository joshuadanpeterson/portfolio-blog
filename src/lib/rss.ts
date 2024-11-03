// src/lib/rss.ts
import Parser from "rss-parser";

export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  content?: string;
  "content:encoded"?: string;
  imageUrl?: string;
  description?: string;
}

// Extend Parser types to include custom fields
interface CustomFeed {
  items: CustomItem[];
}

interface CustomItem {
  title?: string;
  link?: string;
  pubDate?: string;
  contentSnippet?: string;
  "content:encoded"?: string;
  "media:content"?: {
    $: {
      url: string;
    };
  };
  enclosure?: {
    url: string;
  };
  description?: string;
  content?: string;
}

// Configure parser with custom fields
const parser = new Parser<CustomFeed, CustomItem>({
  customFields: {
    item: [
      ["media:content", "media:content"],
      ["content:encoded", "content:encoded"],
      ["description", "description"],
      ["content", "content"],
    ],
  },
  xml2js: {
    // Preserve CDATA content
    xmlMode: true,
    normalize: true,
    trim: true,
  },
});

export async function fetchRSSFeeds(feedUrls: string[]): Promise<FeedItem[]> {
  const feeds = await Promise.all(
    feedUrls.map(async (url) => {
      try {
        const feed = await parser.parseURL(url);
        return feed.items.map((item) => {
          // Get image URL from various possible sources
          let imageUrl =
            item["media:content"]?.$?.url || item.enclosure?.url || "";

          // Fallback: Extract first image from content:encoded
          if (!imageUrl && item["content:encoded"]) {
            const match = item["content:encoded"].match(
              /<img.*?src=["'](.*?)["']/,
            );
            if (match) {
              imageUrl = match[1];
            }
          }

          // Get content from various possible sources
          const contentEncoded = item["content:encoded"] || "";
          const description = item.description || "";
          const content = item.content || "";

          // Extract text content for snippet
          const contentSnippet = getContentSnippet(
            contentEncoded || description || content,
          );

          return {
            title: item.title || "No title",
            link: item.link || "#",
            pubDate: item.pubDate || new Date().toISOString(),
            contentSnippet,
            "content:encoded": contentEncoded,
            description,
            content,
            imageUrl,
          };
        });
      } catch (error) {
        console.error(`Error parsing feed ${url}:`, error);
        return [];
      }
    }),
  );

  return feeds.flat();
}

// Helper function to extract text content for snippet
function getContentSnippet(content: string): string {
  if (!content) return "No content";

  // Remove HTML tags
  const textContent = content
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1") // Remove CDATA
    .replace(/<[^>]+>/g, " ") // Remove HTML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  // Get first 150 characters
  return textContent.length > 150
    ? textContent.substring(0, 147) + "..."
    : textContent;
}
