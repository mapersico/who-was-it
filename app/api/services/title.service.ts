"server only";

import {
  MediaItem,
  MediaType,
  ResponseMultipleResults,
  TmdbSearchResult,
} from "@/app/models/api.model";

import { fetchJson } from "../utils/utils";
import { _tmdbPosterBaseUrl, tmdbEndpoints } from "./tmdb.service";

const deduplicateByOriginalName = (
  results: TmdbSearchResult[]
): TmdbSearchResult[] => {
  const map = new Map<string, TmdbSearchResult>();

  for (const item of results) {
    const existing = map.get(item?.name || item?.title || "");
    if (!existing || item.popularity > existing.popularity) {
      map.set(item?.name || item?.title || "", item);
    }
  }

  return Array.from(map.values());
};

const mapToMediaItemAdapter = (item: TmdbSearchResult): MediaItem => {
  return {
    id: item.id,
    name: item?.name || item?.title || "",
    overview: item.overview,
    releaseDate: item.first_air_date ?? item.release_date ?? "",
    posterUrl: `${
      item.poster_path ? `${_tmdbPosterBaseUrl}${item.poster_path}` : ""
    }`,
    mediaType: MediaType[item.media_type],
  };
};

export async function getTvAndMoviesByQuery(
  query: string
): Promise<MediaItem[]> {
  const data = await fetchJson<ResponseMultipleResults>(
    tmdbEndpoints.TitlesByQuery(query)
  );
  const resultByPopularity: TmdbSearchResult[] = deduplicateByOriginalName(
    data.results
  );

  return resultByPopularity
    .map((item) => mapToMediaItemAdapter(item))
    .filter((item) => item.name && item.releaseDate);
}
