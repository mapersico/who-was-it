import {
  Component,
  signal,
  input,
  output,
  inject,
  Injector,
  runInInjectionContext,
  effect,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-throttled-input',
  template: `
    <input
      type="text"
      [value]="input()"
      (input)="onInput($event)"
      [class]="class()"
      [placeholder]="placeholder()"
    />
  `,
})
export class ThrottledInputComponent {
  placeholder = input('Type something...');
  throttledValue = output<string>();
  throttleTimeMs = input(300);
  type = input('text');
  input = signal('');
  class = input('');
  clearInput = input(false);

  constructor() {
    const injector = inject(Injector);

    runInInjectionContext(injector, () => {
      const input$ = toObservable(this.input);

      input$
        .pipe(debounceTime(this.throttleTimeMs()))
        .subscribe((value) => this.throttledValue.emit(value));
    });

    effect(() => {
      if (this.clearInput()) {
        this.input.set('');
      }
    });
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.input.set(value);
  }
}
