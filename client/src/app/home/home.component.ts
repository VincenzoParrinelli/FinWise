import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserState } from '../store/user/user.selectors';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private store = inject(Store);

  get userData() {
    return this.store.select(selectUserState).pipe(
      map((userState) => {
        return userState.user;
      })
    );
  }
}
