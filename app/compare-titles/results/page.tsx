import Link from "next/link";
import { redirect } from "next/navigation";
import { SearchParams } from "next/dist/server/request/search-params";

import { ActorItem as ActorItemType, Endpoints, MediaItem } from "@/app/models/api.model";
import ActorItem from "@/app/components/actor-item/actor-item";
import ShareButton from "@/app/components/share-button/share-button";

import './page.scss';
import { decompressFromEncodedURIComponent } from "lz-string";
import TitleItem from "@/app/components/title-item/title-item";

export default async function ResultsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const titles = (await searchParams).titles;
  const decompressedTitles: MediaItem[] = JSON.parse(decompressFromEncodedURIComponent(titles?.toString() || ""));
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${Endpoints.getCastsInCommon}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titles,
    }),
  });

  try {
    const result: ActorItemType[] = await data.json();
    if (result.length === 0) {
      return (
        <div className="cast-in-common-list -fadeIn">
          <div className="cast-in-common-list_empty">
            <h1>No results found</h1>
            <p>Try searching for a different movie or TV show</p>
            <Link className="anchor" href="/compare-titles">Back to the homepage</Link>
          </div>
        </div>
      )
    }
    return (
      <>
        <div className="share-button">
          <ShareButton titles={titles} />
          <Link href="/compare-titles" className="anchor">
            Back to the homepage
          </Link>
        </div>
        <div className="cast-in-common-list_titles">
          {decompressedTitles.length && decompressedTitles.map((title) => (
            <TitleItem key={title.id} item={title} posterOnly readOnly />
          ))}
        </div>
        <div className="cast-in-common-list -fadeIn">
          <div className="cast-in-common-list_actors">
            {result.map((item) => <ActorItem key={item.id} item={item} />)}
          </div>
        </div>
      </>
    )
  } catch {
    return redirect('/compare-titles');
  }
}