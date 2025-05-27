export enum MediaType {
  movie = 'movie',
  tv = 'tv',
}

type MediaTypeString = `${MediaType}`;

export interface TmdbSearchResult {
  backdrop_path: string | null;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  media_type: MediaTypeString;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date?: string;
  release_date?: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export interface ResponseMultipleResults {
  page: number;
  results: TmdbSearchResult[];
}

export interface MediaItem {
  id: number;
  name: string;
  releaseDate: string;
  posterUrl: string;
  mediaType: MediaType;
}

export interface ActorItem {
  id: number;
  name: string;
  profileUrl: string;
  roles: RoleItem[];
}

interface RoleItem {
  character: string;
  title: string;
  titleReleaseDate: string;
  posterUrl: string;
  episodeCount: number;
}

export interface TmdbTvRole {
  credit_id: string;
  character: string;
  episode_count: number;
}

export class TmdbTvCast {
  adult!: boolean;
  gender!: number;
  id!: number;
  known_for_department!: string;
  name!: string;
  original_name!: string;
  popularity!: number;
  profile_path!: string;
  roles!: TmdbTvRole[];
  total_episode_count!: number;
  order!: number;

  constructor(data: TmdbTvCast) {
    this.adult = data.adult;
    this.gender = data.gender;
    this.id = data.id;
    this.known_for_department = data.known_for_department;
    this.name = data.name;
    this.original_name = data.original_name;
    this.popularity = data.popularity;
    this.profile_path = data.profile_path;
    this.roles = data.roles;
    this.total_episode_count = data.total_episode_count;
    this.order = data.order;
  }
}

export interface TmdbTvCastResponse {
  id: number;
  cast: TmdbTvCast[];
  crew: TmdbTvCast[];
}

export class TmdbMovieCast {
  adult: boolean = false;
  gender!: number;
  id!: number;
  known_for_department!: string;
  name!: string;
  original_name!: string;
  popularity!: number;
  profile_path!: string | null;
  cast_id!: number;
  character!: string;
  credit_id!: string;
  order!: number;

  constructor(data: TmdbMovieCast) {
    this.adult = data.adult;
    this.gender = data.gender;
    this.id = data.id;
    this.known_for_department = data.known_for_department;
    this.name = data.name;
    this.original_name = data.original_name;
    this.popularity = data.popularity;
    this.profile_path = data.profile_path;
    this.cast_id = data.cast_id;
    this.character = data.character;
    this.credit_id = data.credit_id;
    this.order = data.order;
  }
}

export interface TmdbMovieCrew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface TmdbMovieCastResponse {
  id: number;
  cast: TmdbMovieCast[];
  crew: TmdbMovieCrew[];
}

export interface AdaptedCast {
  id: number;
  name: string;
  profileUrl: string;
  title: string;
  titleReleaseDate: string;
  titleId: number;
  roles: AdaptedRole[];
}

export interface AdaptedRole {
  character: string;
  episodeCount: number;
}
