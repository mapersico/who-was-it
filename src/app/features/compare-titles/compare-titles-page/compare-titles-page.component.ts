import { Component, inject } from '@angular/core';

import { TitlePickerComponent } from '../title-picker/title-picker.component';
import { CastInCommonListComponent } from '../cast-in-common-list/cast-in-common-list.component';

import { TitleService } from '../../../shared/services/title.service';
import { CastService } from '../../../shared/services/cast.service';

@Component({
  selector: 'app-compare-titles-page',
  imports: [TitlePickerComponent, CastInCommonListComponent],
  template: `
    <div class="compare-titles-page" [class.loading-glow]="castState.loading()">
      <div
        [class.top-blank]="!castState.actorsItem().length"
        [class.top-results]="
          castState.actorsItem().length ||
          titleState.mediaItems().length ||
          titleState.selectedTitles().length
        "
        class="compare-titles-page_header animate__animated animate__fadeIn"
      >
        <img src="/logo.svg" alt="logo" width="225" />
        <p>Compare the cast of movies and TV shows</p>
        <div>
          <app-title-picker
            (dataChanged)="onPickerDataChanged()"
          ></app-title-picker>
          @if (titleState.selectedTitles().length > 1 &&
          !titleState.mediaItems().length && !castState.actorsItem().length) {
          <button class="compare-titles-page_action" (click)="compareTitles()">
            Compare Titles
          </button>
          }
        </div>
        <app-cast-in-common-list></app-cast-in-common-list>
      </div>
      <span class="compare-titles-page_powered-by"
        >powered by
        <img width="120" src="/tmdb-logo.svg" alt="TMDB" />
      </span>
    </div>
  `,
  styleUrl: './compare-titles-page.component.scss',
})
export class CompareTitlesPageComponent {
  private readonly titleService = inject(TitleService);
  private readonly castService = inject(CastService);
  readonly castState = this.castService.state;
  readonly titleState = this.titleService.state;

  compareTitles() {
    this.castService.getCastInCommon(this.titleState.selectedTitles());
  }

  onPickerDataChanged() {
    this.castService.clearActors();
  }
}
