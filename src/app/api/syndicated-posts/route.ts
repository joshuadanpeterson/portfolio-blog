import { NextResponse } from "next/server";
import { fetchSyndicatedPosts } from "@/lib/syndication";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await fetchSyndicatedPosts();

    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching syndicated posts:", error);

    return NextResponse.json(
      { error: "Failed to fetch syndicated posts" },
      { status: 500 },
    );
  }
}
