import { NextRequest } from "next/server";
import { getTvAndMoviesByQuery } from "../../services/title.service";

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const results = await getTvAndMoviesByQuery(searchParams.get("query")!);

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}
