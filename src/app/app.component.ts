import { HttpClient } from '@angular/common/http';
import { Component, effect, model, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MediaItem, MediaType } from '../api/models/api.model';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, DatePipe, JsonPipe],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'who-was-it';
  data = signal<MediaItem[]>([]);
  selectedTitles = signal<MediaItem[]>([
    {
      id: 1405,
      name: 'Dexter',
      releaseDate: '2006-10-01',
      posterUrl:
        'https://image.tmdb.org/t/p/original/q8dWfc4JwQuv3HayIZeO84jAXED.jpg',
      mediaType: MediaType.tv,
    },
    {
      id: 1100,
      name: 'How I Met Your Mother',
      releaseDate: '2005-09-19',
      posterUrl:
        'https://image.tmdb.org/t/p/original/b34jPzmB0wZy7EjUZoleXOl2RRI.jpg',
      mediaType: MediaType.tv,
    },
  ]);
  searchQuery = model('');
  searchQuery2 = model('');

  constructor(private http: HttpClient) {
    effect(() => {
      if (this.searchQuery().length > 3) {
        this.http
          .get('/api/v1/movie/titles-by-query', {
            params: { query: this.searchQuery() },
          })
          .subscribe((res) => {
            this.data.set((res as any).data);
          });
      }
    });
  }

  ngOnInit() {}

  onItemClick(item: MediaItem) {
    this.selectedTitles.set([...this.selectedTitles(), item]);
    this.searchQuery.set('');
    this.data.set([]);
  }

  compareCast() {
    this.http
      .post('/api/v1/cast/get-cast-in-common', {
        titles: this.selectedTitles(),
      })
      .subscribe((res) => {
        console.log('Cast in common:', res as any);
      });
  }

  get searchValue() {
    return this.searchQuery();
  }
  set searchValue(val: string) {
    this.searchQuery.set(val);
  }
}
