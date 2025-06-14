"server only";

import {
  ActorItem,
  AdaptedCast,
  MediaItem,
  MediaType,
  TmdbMovieCast,
  TmdbMovieCastResponse,
  TmdbTvCast,
  TmdbTvCastResponse,
} from "@/app/models/api.model";
import { fetchJson } from "../utils/utils";
import { _tmdbPosterBaseUrl, tmdbEndpoints } from "./tmdb.service";
import { connectToDB } from "../utils/db";

export async function getCastInCommon(titles: MediaItem[]) {
  const casts: Array<AdaptedCast[]> = [];
  for (const title of titles) {
    const cast = (await _getCastByTitleId(title.id, title.mediaType)).map(
      (cast) => ({
        ...cast,
        titleId: title.id,
        title: title.name,
        titleReleaseDate: title.releaseDate || "",
      })
    );
    if (cast) casts.push(cast);
  }
  const castInCommon: ActorItem[] = _compareCasts(casts[0], casts[1]);
  await saveSearch(titles);
  return castInCommon;
}

const saveSearch = async (titles: MediaItem[]) => {
  const db = await connectToDB();
  await db
    .collection("searches")
    .insertOne({ titles: JSON.stringify(titles), createdAt: new Date() });
};

async function _getCastByTitleId(titleId: number, mediaType: MediaType) {
  if (mediaType === MediaType.movie) {
    const data = await fetchJson<TmdbMovieCastResponse>(
      tmdbEndpoints.MovieCastById(titleId)
    );

    return data.cast.map((cast) => formatCastAdapter(new TmdbMovieCast(cast)));
  }

  if (mediaType === MediaType.tv) {
    const data = await fetchJson<TmdbTvCastResponse>(
      tmdbEndpoints.TvCastById(titleId)
    );

    return data.cast.map((cast) => formatCastAdapter(new TmdbTvCast(cast)));
  }

  return [];
}

function formatCastAdapter(cast: TmdbMovieCast | TmdbTvCast): AdaptedCast {
  if (cast instanceof TmdbMovieCast) {
    return {
      id: cast.id,
      name: cast.name,
      titleId: 0,
      title: "",
      titleReleaseDate: "",
      profileUrl: `${_tmdbPosterBaseUrl}${cast.profile_path}`,
      roles: [
        {
          character: cast.character,
          episodeCount: 0,
          id: "",
        },
      ],
    };
  }
  if (cast instanceof TmdbTvCast) {
    return {
      id: cast.id,
      name: cast.name,
      profileUrl: `${_tmdbPosterBaseUrl}${cast.profile_path}`,
      titleId: 0,
      title: "",
      titleReleaseDate: "",
      roles: cast.roles.map((role) => ({
        character: role.character,
        episodeCount: role.episode_count,
        id: role.credit_id,
      })),
    };
  }

  return {
    id: 0,
    name: "",
    profileUrl: "",
    titleId: 0,
    title: "",
    titleReleaseDate: "",
    roles: [],
  };
}

function _compareCasts(cast1: AdaptedCast[], cast2: AdaptedCast[]) {
  const actorsInCommon: ActorItem[] = [];
  cast1.forEach((actor) => {
    const matchedActor = cast2.find((actor2) => actor2.id === actor.id);
    if (matchedActor) {
      const actorToAdd = {
        id: actor.id,
        name: actor.name,
        profileUrl: actor.profileUrl,
        roles: [
          ...actor.roles.map((role) => ({
            character: role.character,
            title: actor.title,
            titleReleaseDate: actor.titleReleaseDate,
            posterUrl: "",
            episodeCount: role.episodeCount,
            id: role.id,
          })),
          ...matchedActor.roles.map((role) => ({
            character: role.character,
            title: matchedActor.title,
            titleReleaseDate: matchedActor.titleReleaseDate,
            posterUrl: "",
            episodeCount: role.episodeCount,
            id: role.id,
          })),
        ],
        totalEpisodes:
          matchedActor.roles.reduce((acc, role) => acc + role.episodeCount, 0) +
          actor.roles.reduce((acc, role) => acc + role.episodeCount, 0),
      };
      actorToAdd.roles = actorToAdd.roles.filter((role) => role.character);
      actorsInCommon.push(actorToAdd);
    }
  });

  return actorsInCommon.sort((a, b) => b.totalEpisodes - a.totalEpisodes);
}
