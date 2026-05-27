import { fetchRSSFeeds, type FeedItem, type RSSFeedSource } from "@/lib/rss";
import { fetchSteemitPosts } from "@/lib/steemit";

const RSS_SOURCES: RSSFeedSource[] = [
  {
    url: "https://medium.com/feed/@joshpeterson",
    source: "medium",
  },
  {
    url: "https://attentionwars.substack.com/feed",
    source: "substack",
  },
];

export async function fetchSyndicatedPosts(): Promise<FeedItem[]> {
  const [rssPosts, steemitPosts] = await Promise.all([
    fetchRSSFeeds(RSS_SOURCES),
    fetchSteemitPosts(),
  ]);

  return [...rssPosts, ...steemitPosts].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
  );
}
