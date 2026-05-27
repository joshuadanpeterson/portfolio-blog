import type { FeedItem } from "@/lib/rss";

const STEEMIT_API_URL = "https://api.steemit.com";
const DEFAULT_STEEMIT_ACCOUNT = "joshpeterson";
const DEFAULT_STEEMIT_LIMIT = 30;

type SteemitMetadata = {
  description?: unknown;
  image?: unknown;
  thumbnail?: unknown;
  video?: {
    content?: {
      description?: unknown;
    };
    info?: {
      snaphash?: unknown;
    };
  };
};

export type SteemitPost = {
  post_id?: number | string;
  author?: string;
  permlink?: string;
  category?: string;
  title?: string;
  body?: string;
  json_metadata?: string | SteemitMetadata;
  created?: string;
  updated?: string;
};

type SteemitApiResponse = {
  result?: SteemitPost[];
  error?: unknown;
};

export async function fetchSteemitPosts(
  account = DEFAULT_STEEMIT_ACCOUNT,
  limit = DEFAULT_STEEMIT_LIMIT,
): Promise<FeedItem[]> {
  try {
    const response = await fetch(STEEMIT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "condenser_api.get_discussions_by_blog",
        params: [{ tag: account, limit }],
        id: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`Steemit API returned ${response.status}`);
    }

    const payload = (await response.json()) as SteemitApiResponse;

    if (payload.error) {
      throw new Error(`Steemit API error: ${JSON.stringify(payload.error)}`);
    }

    return (payload.result || [])
      .filter((post) => post.author === account)
      .map(mapSteemitPost)
      .filter((post): post is FeedItem => Boolean(post));
  } catch (error) {
    console.error("Error fetching Steemit posts:", error);
    return [];
  }
}

export function mapSteemitPost(post: SteemitPost): FeedItem | null {
  if (!post.author || !post.permlink || !post.title) {
    return null;
  }

  const metadata = parseSteemitMetadata(post.json_metadata);
  const description = extractDescription(metadata) || post.body || "";
  const contentSnippet = getPlainTextSnippet(description || post.body || "");
  const imageUrl = extractImageUrl(post.body || "", metadata);

  return {
    title: post.title,
    link: buildSteemitLink(post),
    pubDate: normalizeSteemitDate(post.created || post.updated),
    contentSnippet,
    content: post.body || "",
    description,
    imageUrl,
    source: "steemit",
    externalId: String(post.post_id || `${post.author}/${post.permlink}`),
  };
}

function parseSteemitMetadata(
  metadata: SteemitPost["json_metadata"],
): SteemitMetadata {
  if (!metadata) {
    return {};
  }

  if (typeof metadata === "object") {
    return metadata;
  }

  try {
    const parsed = JSON.parse(metadata);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function extractDescription(metadata: SteemitMetadata): string {
  const description = firstString(
    metadata.description,
    metadata.video?.content?.description,
  );

  return description || "";
}

function extractImageUrl(body: string, metadata: SteemitMetadata): string {
  const metadataImage = firstString(
    metadata.thumbnail,
    metadata.image,
    Array.isArray(metadata.image) ? metadata.image[0] : undefined,
  );

  const bodyImage =
    body.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] ||
    body.match(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/i)?.[1] ||
    "";

  return normalizeImageUrl(metadataImage || bodyImage);
}

function firstString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function normalizeImageUrl(url: string): string {
  if (!url || !/^https?:\/\//i.test(url)) {
    return "";
  }

  return url.replace(/^http:\/\//i, "https://");
}

function buildSteemitLink(post: SteemitPost): string {
  const category = slugSegment(post.category || "blog");
  const author = slugSegment(post.author || DEFAULT_STEEMIT_ACCOUNT);
  const permlink = slugSegment(post.permlink || "");

  return `https://steemit.com/${category}/@${author}/${permlink}`;
}

function slugSegment(value: string): string {
  return encodeURIComponent(value.replace(/^@/, "").trim());
}

function normalizeSteemitDate(date: string | undefined): string {
  if (!date) {
    return new Date(0).toISOString();
  }

  const parsed = new Date(date.endsWith("Z") ? date : `${date}Z`);
  return Number.isNaN(parsed.getTime()) ? new Date(0).toISOString() : parsed.toISOString();
}

function getPlainTextSnippet(content: string): string {
  const textContent = content
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

  if (!textContent) {
    return "No content";
  }

  return textContent.length > 150
    ? `${textContent.substring(0, 147)}...`
    : textContent;
}
