import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MediaItem } from '../models/title.model';
import { ResponseHandler } from '../../../api/base/base.controller';

enum RoutePath {
  TitlesByQuery = '/titles-by-query',
}

@Injectable({ providedIn: 'root' })
export class TitleApiClient {
  private baseUrl: string = '/api/v1/movie';
  constructor(private http: HttpClient) {}

  getTitlesByQuery(query: string): Observable<ResponseHandler<MediaItem[]>> {
    return this.http.get<ResponseHandler<MediaItem[]>>(
      `${this.baseUrl}${RoutePath.TitlesByQuery}`,
      {
        params: { query: query },
      }
    );
  }
}
