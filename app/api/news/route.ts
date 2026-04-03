import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") || "1";
  const section = searchParams.get("section") || "";
  const query = searchParams.get("q") || "";

  const apiKey = process.env.GUARDIAN_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing API key" },
      { status: 500 }
    );
  }

  const url = new URL("https://content.guardianapis.com/search");

  url.searchParams.set("api-key", apiKey);
  url.searchParams.set("page-size", "12");
  url.searchParams.set("page", page);
  url.searchParams.set("show-fields", "headline,trailText,thumbnail,byline");

  if (section) url.searchParams.set("section", section);
  if (query) url.searchParams.set("q", query);

  try {
    const res = await fetch(url.toString());
    const data = await res.json();

    return NextResponse.json({
      articles: data.response.results,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch from Guardian" },
      { status: 500 }
    );
  }
}
