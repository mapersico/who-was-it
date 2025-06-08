import { redirect } from "next/navigation";
import { Endpoints } from "../models/api.model";

export default async function SharedUrl({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const id = (await searchParams).id;
  if ((await searchParams).id) {
    const urlId = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${Endpoints.getSharedUrl}?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await urlId.json();

    if (!result.query) return redirect('/compare-titles');
    redirect(`/compare-titles/results?titles=${result.query}`);
  } else {
    redirect('/compare-titles');
  }
}