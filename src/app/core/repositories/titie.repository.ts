import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TitleApiClient } from '../api/title.api.client';
import { ResponseHandler } from '../../../api/base/base.controller';
import { MediaItem } from '../models/title.model';

@Injectable({ providedIn: 'root' })
export class TitleRepository {
  constructor(private api: TitleApiClient) {}

  getTitlesByQuery(query: string): Observable<ResponseHandler<MediaItem[]>> {
    return this.api.getTitlesByQuery(query);
  }
}
