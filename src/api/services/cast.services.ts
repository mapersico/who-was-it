import { BaseService } from '../base/base.service';
import { fetchJson } from '../base/utils';
import {
  ActorItem,
  AdaptedCast,
  MediaItem,
  MediaType,
  TmdbMovieCast,
  TmdbMovieCastResponse,
  TmdbTvCast,
  TmdbTvCastResponse,
} from '../models/api.model';

export class CastService extends BaseService {
  constructor() {
    super();
  }

  private _compareCasts(cast1: AdaptedCast[], cast2: AdaptedCast[]) {
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
              posterUrl: '',
              episodeCount: role.episodeCount,
            })),
            ...matchedActor.roles.map((role) => ({
              character: role.character,
              title: matchedActor.title,
              titleReleaseDate: matchedActor.titleReleaseDate,
              posterUrl: '',
              episodeCount: role.episodeCount,
            })),
          ],
        };
        actorToAdd.roles = actorToAdd.roles.filter((role) => role.character);
        actorsInCommon.push(actorToAdd);
      }
    });

    return actorsInCommon;
  }

  private formatCastAdapter(cast: TmdbMovieCast | TmdbTvCast): AdaptedCast {
    if (cast instanceof TmdbMovieCast) {
      return {
        id: cast.id,
        name: cast.name,
        titleId: 0,
        title: '',
        titleReleaseDate: '',
        profileUrl: `${this._omdbPosterBaseUrl}${cast.profile_path}`,
        roles: [
          {
            character: cast.character,
            episodeCount: 0,
          },
        ],
      };
    }
    if (cast instanceof TmdbTvCast) {
      return {
        id: cast.id,
        name: cast.name,
        profileUrl: `${this._omdbPosterBaseUrl}${cast.profile_path}`,
        titleId: 0,
        title: '',
        titleReleaseDate: '',
        roles: cast.roles.map((role) => ({
          character: role.character,
          episodeCount: role.episode_count,
        })),
      };
    }

    return {
      id: 0,
      name: '',
      profileUrl: '',
      titleId: 0,
      title: '',
      titleReleaseDate: '',
      roles: [],
    };
  }

  private async _getCastByTitleId(titleId: number, mediaType: MediaType) {
    if (mediaType === MediaType.movie) {
      const data = await fetchJson<TmdbMovieCastResponse>(
        this.omdbEndpoints.MovieCastById(titleId)
      );

      return data.cast.map((cast) =>
        this.formatCastAdapter(new TmdbMovieCast(cast))
      );
    }

    if (mediaType === MediaType.tv) {
      const data = await fetchJson<TmdbTvCastResponse>(
        this.omdbEndpoints.TvCastById(titleId)
      );

      return data.cast.map((cast) =>
        this.formatCastAdapter(new TmdbTvCast(cast))
      );
    }

    return [];
  }

  async getCastInCommon(titles: MediaItem[]) {
    const casts: Array<AdaptedCast[]> = [];
    for (const title of titles) {
      const cast = (
        await this._getCastByTitleId(title.id, title.mediaType)
      ).map((cast) => ({
        ...cast,
        titleId: title.id,
        title: title.name,
        titleReleaseDate: title.releaseDate || '',
      }));
      if (cast) casts.push(cast);
    }
    const castInCommon: ActorItem[] = this._compareCasts(casts[0], casts[1]);

    return castInCommon;
  }
}
