import { connectToDB } from "../../utils/db";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const id = searchParams.get("id") || "";

  if (!id)
    return new Response(JSON.stringify({ error: "No id provided" }), {
      headers: { "Content-Type": "application/json" },
    });

  const db = await connectToDB();
  const result = await db.collection("sharedUrls").findOne({ id });

  return new Response(JSON.stringify(result || { query: "" }), {
    headers: { "Content-Type": "application/json" },
  });
}
