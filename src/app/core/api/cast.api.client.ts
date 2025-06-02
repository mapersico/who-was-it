import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ActorItem, MediaItem } from '../models/title.model';
import { ResponseHandler } from '../../../api/base/base.controller';

enum RoutePath {
  GetCastInCommon = '/get-cast-in-common',
}

@Injectable({ providedIn: 'root' })
export class CastApiClient {
  private baseUrl: string = '/api/v1/cast';

  constructor(private http: HttpClient) {}

  getCastInCommon(
    titles: MediaItem[]
  ): Observable<ResponseHandler<ActorItem[]>> {
    return this.http.post<ResponseHandler<ActorItem[]>>(
      `${this.baseUrl}${RoutePath.GetCastInCommon}`,
      {
        titles: titles,
      }
    );
  }
}
