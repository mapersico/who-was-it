import { randomUUID } from "crypto";
import { connectToDB } from "../../utils/db";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const titles = searchParams.get("titles") || "";

  if (!titles)
    return new Response(JSON.stringify({ error: "No titles provided" }), {
      headers: { "Content-Type": "application/json" },
    });

  const uuid = randomUUID();
  const db = await connectToDB();
  await db
    .collection("sharedUrls")
    .insertOne({ id: uuid, query: titles, createdAt: new Date() });
  const created = await db.collection("sharedUrls").findOne({ id: uuid });

  return new Response(JSON.stringify(created), {
    headers: { "Content-Type": "application/json" },
  });
}
