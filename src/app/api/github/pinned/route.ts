import { NextResponse } from "next/server";
import { fetchPinnedRepos } from "@/lib/github";

export async function GET() {
  try {
    const repos = await fetchPinnedRepos();

    return NextResponse.json(repos, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching pinned repositories:", error);

    return NextResponse.json(
      { error: "Failed to fetch pinned repositories" },
      { status: 500 },
    );
  }
}
