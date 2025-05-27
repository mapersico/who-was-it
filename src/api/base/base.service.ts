import { MediaType } from '../models/api.model';

export class BaseService {
  private readonly _omdbBaseUrl: string = 'https://api.themoviedb.org/3';
  private readonly _omdbApiKey: string = process.env['OMDB_API_KEY'] || '';
  protected readonly _omdbPosterBaseUrl: string =
    'https://image.tmdb.org/t/p/original';
  protected readonly omdbEndpoints = {
    MovieByQuery: (query: string) =>
      `${this._omdbBaseUrl}/search/multi?query=${query}&include_adult=false&language=en-US&api_key=${this._omdbApiKey}`,
    MovieCastById: (id: number) =>
      `${this._omdbBaseUrl}/movie/${id}/credits?api_key=${this._omdbApiKey}`,
		TvCastById: (id: number) =>
      `${this._omdbBaseUrl}/tv/${id}/aggregate_credits?api_key=${this._omdbApiKey}`,
  };
}
