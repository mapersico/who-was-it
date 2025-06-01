import { Component } from '@angular/core';
import { TitlePickerComponent } from '../../title-picker/title-picker.component';

@Component({
  selector: 'app-compare-titles-page',
  imports: [TitlePickerComponent],
  template: `
    <div class="compare-titles-page_header">
      <h1>Who Was It!</h1>
      <p>Compare the cast of movies and TV shows</p>

      <app-title-picker></app-title-picker>
    </div>
  `,
  styleUrl: './compare-titles-page.component.scss',
})
export class CompareTitlesPageComponent {}
