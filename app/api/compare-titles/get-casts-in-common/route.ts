import { NextRequest } from "next/server";
import { getCastInCommon } from "../../services/cast.service";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const titles = atob(body.titles?.toString() || "");
    const titlesArray = JSON.parse(titles);
    const castsInCommon = await getCastInCommon(titlesArray);

    return new Response(JSON.stringify(castsInCommon), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
