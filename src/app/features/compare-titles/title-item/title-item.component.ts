import { DatePipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';

import { MediaItem } from '../../../core/models/title.model';

@Component({
  selector: 'app-title-item',
  imports: [DatePipe],
  template: `
    @if (!displayOnly()) {
    <div class="item" (click)="handleSelection()">
      <div class="item_poster_wrapper">
        <img
          class="item_poster"
          (load)="onImageLoad()"
          [src]="item()?.posterUrl"
          alt="{{ item()?.name }}"
          [class.loaded]="imageLoaded"
        />
      </div>
      <div>
        <h3>{{ item()?.name }} ({{ item()?.releaseDate | date : 'yyyy' }})</h3>
        <p class="item_overview">{{ item()?.overview }}</p>
      </div>
    </div>
    } @if (displayOnly()) {
    <div class="item display-only">
      <div
        class="item_poster_wrapper"
        (mouseenter)="handleHover($event)"
        (mouseleave)="handleHover($event)"
      >
        @if (hovered()) {
        <div (click)="handleRemoval()" class="item_poster_overlay">
          <p>Click to</p>
          <p>Remove</p>
        </div>
        }
        <img
          class="item_poster"
          [class.loaded]="imageLoaded"
          (load)="onImageLoad()"
          [src]="item()?.posterUrl"
          [alt]="item()?.name"
        />
      </div>
    </div>
    }
  `,
  styleUrl: './title-item.component.scss',
})
export class TitleItemComponent {
  itemSelected = output<MediaItem>();
  itemRemoved = output<MediaItem>();
  item = input<MediaItem | null>(null);
  displayOnly = input<boolean>();
  imageLoaded = false;
  hovered = signal(false);

  public handleSelection() {
    const selectedItem = this.item();
    if (selectedItem) this.itemSelected.emit(selectedItem);
  }

  public handleRemoval() {
    const selectedItem = this.item();
    if (selectedItem) this.itemRemoved.emit(selectedItem);
  }

  public onImageLoad() {
    this.imageLoaded = true;
  }

  public handleHover(e: MouseEvent) {
    e.type === 'mouseenter' ? this.hovered.set(true) : this.hovered.set(false);
  }
}
