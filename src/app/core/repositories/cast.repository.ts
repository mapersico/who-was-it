import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ResponseHandler } from '../../../api/base/base.controller';
import { ActorItem, MediaItem } from '../models/title.model';
import { CastApiClient } from '../api/cast.api.client';

@Injectable({ providedIn: 'root' })
export class CastRepository {
  constructor(private api: CastApiClient) {}

  getCastInCommon(
    titles: MediaItem[]
  ): Observable<ResponseHandler<ActorItem[]>> {
    return this.api.getCastInCommon(titles);
  }
}
