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
    casts.push(cast);
  }

  const castInCommon: ActorItem[] = _compareMultipleCasts(casts);
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

function _compareMultipleCasts(casts: AdaptedCast[][]): ActorItem[] {
  const actorMap = new Map<number, AdaptedCast[]>();

  // Agrupar todos los actores por ID
  for (const cast of casts) {
    const seenInThisCast = new Set<number>();

    for (const actor of cast) {
      if (seenInThisCast.has(actor.id)) continue;
      seenInThisCast.add(actor.id);

      if (!actorMap.has(actor.id)) {
        actorMap.set(actor.id, []);
      }
      actorMap.get(actor.id)!.push(actor);
    }
  }

  const commonActors: ActorItem[] = [];

  for (const [id, appearances] of actorMap.entries()) {
    if (appearances.length >= 2) {
      const allRoles = appearances.flatMap((a) =>
        a.roles.map((role) => ({
          character: role.character,
          title: a.title,
          titleReleaseDate: a.titleReleaseDate,
          posterUrl: "", // Agregá el poster si lo necesitás
          episodeCount: role.episodeCount,
          id: role.id,
        }))
      );

      const totalEpisodes = allRoles.reduce(
        (acc, role) => acc + (role.episodeCount || 0),
        0
      );

      commonActors.push({
        id,
        name: appearances[0].name,
        profileUrl: appearances[0].profileUrl,
        roles: allRoles.filter((r) => r.character),
        totalEpisodes,
      });
    }
  }

  return commonActors.sort((a, b) => b.totalEpisodes - a.totalEpisodes);
}

