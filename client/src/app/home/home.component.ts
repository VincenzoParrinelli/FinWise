import { Component, inject, signal } from '@angular/core';
import { map } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectUserState } from '../store/user/user.selectors';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { BellComponent } from '../svg/bell/bell.component';
import { CustomBtnComponent } from '../shared/custom-btn/custom-btn.component';
import { BtnBgColor, BtnWidth } from '../shared/custom-btn/custom-btn.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainLayoutComponent, BellComponent, CustomBtnComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private store = inject(Store);

  btnsShared = signal({
    bgColor: 'cyprus' as BtnBgColor,
    width: 'full' as BtnWidth,
    textColor: 'white',
  });

  btnsData = signal([
    {
      text: 'Daily',
      selected: true,
    },
    {
      text: 'Weekly',
      selected: false,
    },
    {
      text: 'Monthly',
      selected: false,
    },
  ]);

  get userData() {
    return this.store.select(selectUserState).pipe(
      map((userState) => {
        return userState.user;
      })
    );
  }

  selectedBtnToggle(index: number) {
    this.btnsData.update((items) => {
      items.forEach((item, i) => {
        item.selected = index === i;
      });

      return items;
    });
  }
}
