import { Injectable, signal, computed } from '@angular/core';

import { ActorItem, MediaItem } from '../../core/models/title.model';
import { CastRepository } from '../../core/repositories/cast.repository';

@Injectable({
  providedIn: 'root',
})
export class CastService {
  private actorsItem = signal<ActorItem[]>([]);
  private loading = signal(false);
  private error = signal<string | null>(null);

  constructor(private repo: CastRepository) {}

  readonly state = {
    actorsItem: computed(() => this.actorsItem()),
    loading: computed(() => this.loading()),
    error: computed(() => this.error()),
  };

  getCastInCommon(titles: MediaItem[]) {
    this.loading.set(true);
    this.error.set(null);

    this.repo.getCastInCommon(titles).subscribe({
      next: (data) => {
        this.actorsItem.set(data.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  clearActors() {
    this.actorsItem.set([]);
    this.loading.set(false);
    this.error.set(null);
  }
}
