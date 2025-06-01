import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThrottledInputComponent } from '../../../shared/components/throttled-input.component';
import { TitleService } from '../../../shared/services/title.service';
import { MediaItem } from '../../../core/models/title.model';
import { TitleItemComponent } from '../title-item/title-item.component';

@Component({
  selector: 'app-title-picker',
  imports: [FormsModule, ThrottledInputComponent, TitleItemComponent],
  providers: [TitleService],
  template: `
    <div class="title-picker_wrapper">
      @if (titleState.selectedTitles().length > 0) {
      <div class="title-picker_selected">
        @for (item of titleState.selectedTitles(); track item.id) {
        <app-title-item
          (itemRemoved)="handleRemovedTitle($event)"
          [item]="item"
          [displayOnly]="true"
        ></app-title-item>
        }
      </div>
      }
      <app-throttled-input
        class="title-picker_input"
        placeholder="Search for a movie or TV show"
        [throttleTimeMs]="500"
        [clearInput]="clearInput()"
        (throttledValue)="onSearchChange($event)"
      ></app-throttled-input>
      @if (titleState.loading()) {
      <div class="title-picker_result">
        <p class="loading">Loading...</p>
      </div>
      } @if (titleState.mediaItems().length > 0 && !titleState.loading()) {
      <div class="title-picker_result">
        @for (item of titleState.mediaItems(); track item.id) {
        <app-title-item
          (itemSelected)="handleSelectedTitle($event)"
          [item]="item"
        ></app-title-item>
        }
      </div>
      }
    </div>
  `,
  styleUrl: './title-picker.component.scss',
})
export class TitlePickerComponent {
  private readonly titleService = inject(TitleService);
  readonly titleState = this.titleService.state;
  clearInput = signal(false);

  onSearchChange(query: string) {
    if (query.trim().length && query.length > 2) {
      this.titleService.getTitlesByQuery(query);
    } else this.titleService.clearTitles();
  }

  handleSelectedTitle(title: MediaItem) {
    const alreadySelected = this.titleState
      .selectedTitles()
      .find((item) => item.id === title.id);
    if (alreadySelected) return;
    this.titleService.clearTitles();
    this.clearInput.set(true);
    this.titleService.updateSelectedTitles([
      ...this.titleState.selectedTitles(),
      title,
    ]);
    setTimeout(() => this.clearInput.set(false), 0);
  }

  handleRemovedTitle(title: MediaItem) {
    this.titleService.updateSelectedTitles(
      this.titleState.selectedTitles().filter((item) => item.id !== title.id)
    );
  }
}
