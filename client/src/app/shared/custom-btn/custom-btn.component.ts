import { Component, inject, input } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app/app.reducer';
import { selectLoading } from '../../store/app/app.selectors';

@Component({
  selector: 'app-custom-btn',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './custom-btn.component.html',
})
export class CustomBtnComponent {
  bgColor = input<'primary' | 'secondary'>('primary');
  text = input<string>();
  width = input<'full' | 'half'>('full');
  type = input<'button' | 'submit' | 'reset'>('button');
  form = input<string>();
  private store = inject(Store<AppState>);
  loading = this.store.selectSignal(selectLoading);
}
