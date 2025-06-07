import ActorItem from "@/app/components/actor-item/actor-item";
import { ActorItem as ActorItemType, Endpoints } from "@/app/models/api.model";
import { SearchParams } from "next/dist/server/request/search-params";

import './page.scss';
import { redirect } from "next/navigation";

export default async function ResultsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${Endpoints.getCastsInCommon}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titles: (await searchParams).titles,
    }),
  });

  try {
    const result: ActorItemType[] = await data.json();
    if (result.length === 0) return redirect('/compare-titles');
    return (
      <div className="cast-in-common-list -fadeIn">
        <div className="cast-in-common-list_actors">
          {result.map((item) => <ActorItem key={item.id} item={item} />)}
        </div>
      </div>
    )
  } catch {
    return redirect('/compare-titles');
  }
}