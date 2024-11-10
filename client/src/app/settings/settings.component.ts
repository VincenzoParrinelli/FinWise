import { Component, inject, signal } from '@angular/core';
import { MainLayoutComponent } from '../shared/layouts/main/main.component';

import { Store } from '@ngrx/store';

import { selectLoading } from '../store/app/app.selectors';

import { UserState } from '../store/user/user.model';
import { selectUserName } from '../store/user/user.selectors';
import * as UserActions from '../store/user/user.actions';

import { RouterService } from '../router.service';

import { EditProfileComponent } from '../svg/edit-profile/edit-profile.component';
import { SecurityComponent } from '../svg/security/security.component';
import { GearComponent } from '../svg/gear/gear.component';
import { LogoutComponent } from '../svg/logout/logout.component';

import { CustomBtnComponent } from '../shared/custom-btn/custom-btn.component';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MainLayoutComponent,
    EditProfileComponent,
    SecurityComponent,
    GearComponent,
    LogoutComponent,
    CustomBtnComponent,
    DialogComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private store = inject(Store<UserState>);
  userFullName = this.store.selectSignal(selectUserName);
  routerService = inject(RouterService);
  isDialogOpen = signal<boolean>(false);
  loading = this.store.selectSignal(selectLoading);

  openDialog() {
    this.isDialogOpen.set(true);
  }

  closeDialog() {
    this.isDialogOpen.set(false);
  }

  logout() {
    this.store.dispatch(UserActions.logoutUser());
  }
}
