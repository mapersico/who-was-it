import { BaseService } from '../base/base.service';
import { fetchJson } from '../base/utils';
import {
  MediaItem,
  MediaType,
  ResponseMultipleResults,
  TmdbSearchResult,
} from '../models/api.model';

export class TitleService extends BaseService {
  constructor() {
    super();
  }

  private deduplicateByOriginalName(
    results: TmdbSearchResult[]
  ): TmdbSearchResult[] {
    const map = new Map<string, any>();

    for (const item of results) {
      const existing = map.get(item.name);
      if (!existing || item.popularity > existing.popularity) {
        map.set(item.name, item);
      }
    }

    return Array.from(map.values());
  }

  private mapToMediaItemAdapter(item: TmdbSearchResult): MediaItem {
    return {
      id: item.id,
      name: item.name,
      overview: item.overview,
      releaseDate: item.first_air_date ?? item.release_date ?? 'N/A',
      posterUrl: `${this._omdbPosterBaseUrl}${item.poster_path}`,
      mediaType: MediaType[item.media_type],
    };
  }

  async getTvAndMoviesByQuery(query: string): Promise<MediaItem[]> {
    const data = await fetchJson<ResponseMultipleResults>(
      this.omdbEndpoints.MovieByQuery(query)
    );
    const resultByPopularity: TmdbSearchResult[] =
      this.deduplicateByOriginalName(data.results);

    return resultByPopularity
      .filter(
        (item) =>
          item.original_language === 'en' &&
          item.name &&
          item.poster_path
      )
      .map((item) => this.mapToMediaItemAdapter(item));
  }
}
