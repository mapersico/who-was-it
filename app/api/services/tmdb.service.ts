"server only";

const _tmdbBaseUrl: string = "https://api.themoviedb.org/3";
const _tmdbApiKey: string = process.env.TMDB_API_KEY || "";

export const _tmdbPosterBaseUrl: string = "https://image.tmdb.org/t/p/original";

export const tmdbEndpoints = {
  TitlesByQuery: (query: string) =>
    `${_tmdbBaseUrl}/search/multi?query=${query}&include_adult=false&language=en-US&api_key=${_tmdbApiKey}`,
  MovieCastById: (id: number) =>
    `${_tmdbBaseUrl}/movie/${id}/credits?api_key=${_tmdbApiKey}`,
  TvCastById: (id: number) =>
    `${_tmdbBaseUrl}/tv/${id}/aggregate_credits?api_key=${_tmdbApiKey}`,
};
