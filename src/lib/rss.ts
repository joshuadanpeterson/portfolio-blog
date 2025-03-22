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
          let imageUrl =
            item["media:content"]?.$?.url || item.enclosure?.url || "";

          if (!imageUrl && item["content:encoded"]) {
            const match = item["content:encoded"].match(
              /<img.*?src=["'](.*?)["']/,
            );
            if (match) {
              imageUrl = match[1];
            }
          }

          const contentEncoded = item["content:encoded"] || "";
          const description = item.description || "";
          const content = item.content || "";

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

function getContentSnippet(content: string): string {
  if (!content) return "No content";

  const textContent = content
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return textContent.length > 150
    ? textContent.substring(0, 147) + "..."
    : textContent;
}
