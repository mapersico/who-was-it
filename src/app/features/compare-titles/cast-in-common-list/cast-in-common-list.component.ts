import { Component, inject } from '@angular/core';
import { CastService } from '../../../shared/services/cast.service';
import { CastItemComponent } from '../cast-item/cast-item.component';

@Component({
  selector: 'app-cast-in-common-list',
  imports: [CastItemComponent],
  template: `
    <div class="cast-in-common-list  animate__animated animate__fadeIn">
      @if (actors().length > 0) {
      <div class="cast-in-common-list_actors">
        @for (actor of actors(); track actor.id) {
        <app-cast-item [actor]="actor"></app-cast-item>
        }
      </div>
      }
    </div>
  `,
  styleUrl: './cast-in-common-list.component.scss',
})
export class CastInCommonListComponent {
  private readonly castService = inject(CastService);
  readonly actors = this.castService.state.actorsItem;
}
