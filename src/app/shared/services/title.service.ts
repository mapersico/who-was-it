import { Injectable, signal, computed, effect } from '@angular/core';

import { MediaItem } from '../../core/models/title.model';
import { TitleRepository } from '../../core/repositories/titie.repository';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private mediaItems = signal<MediaItem[]>([]);
  private selectedTitles = signal<MediaItem[]>([]);
  private loading = signal(false);
  private error = signal<string | null>(null);

  constructor(private repo: TitleRepository) {}

  readonly state = {
    selectedTitles: computed(() => this.selectedTitles()),
    mediaItems: computed(() => this.mediaItems()),
    loading: computed(() => this.loading()),
    error: computed(() => this.error()),
  };

  getTitlesByQuery(query: string) {
    this.loading.set(true);
    this.error.set(null);

    this.repo.getTitlesByQuery(query).subscribe({
      next: (data) => {
        this.mediaItems.set(data.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  updateSelectedTitles(titles: MediaItem[]) {
    this.selectedTitles.set(titles);
  }

  clearTitles() {
    this.mediaItems.set([]);
    this.loading.set(false);
    this.error.set(null);
  }
}
