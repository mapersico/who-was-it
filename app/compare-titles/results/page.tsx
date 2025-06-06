import ActorItem from "@/app/components/actor-item/actor-item";
import { ActorItem as ActorItemType } from "@/app/models/api.model";
import { SearchParams } from "next/dist/server/request/search-params";

import './page.scss';

export default async function ResultsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/compare-titles/get-casts-in-common`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titles: (await searchParams).titles,
    }),
  });
  const result: ActorItemType[] = await data.json();

  return (
    <div className="cast-in-common-list -fadeIn">
      <div className="cast-in-common-list_actors">{result.map((item) => <ActorItem key={item.id} item={item} />)}</div>
    </div>
  );
}