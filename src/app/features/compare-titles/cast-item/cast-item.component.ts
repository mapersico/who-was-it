import { Component, input } from '@angular/core';
import { ActorItem } from '../../../core/models/title.model';

@Component({
  selector: 'app-cast-item',
  imports: [],
  template: `
    <div class="actor">
      <div class="actor_poster_wrapper">
        <img
          class="actor_poster"
          src="https://image.tmdb.org/t/p/w500{{ actor()?.profileUrl }}"
          alt="{{ actor()?.name }}"
          (load)="onImageLoad()"
          [class.loaded]="imageLoaded"
        />
      </div>
      <div>
        <h3>{{ actor()?.name }}</h3>
        <ul class="actor_roles">
          @for (item of actor()?.roles; track item.character) {
          <li>
            {{ item.character }} ({{ item.episodeCount }} Eps) -
            <strong>{{ item.title }}</strong>
          </li>
          }
        </ul>
      </div>
    </div>
  `,
  styleUrl: './cast-item.component.scss',
})
export class CastItemComponent {
  actor = input<ActorItem>();
  imageLoaded = false;

  onImageLoad() {
    this.imageLoaded = true;
  }
}
