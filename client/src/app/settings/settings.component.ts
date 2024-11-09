import { Component, inject } from '@angular/core';
import { MainLayoutComponent } from '../shared/layouts/main/main.component';

import { Store } from '@ngrx/store';
import { UserState } from '../store/user/user.model';
import { selectUserName } from '../store/user/user.selectors';

import { EditProfileComponent } from '../svg/edit-profile/edit-profile.component';
import { SecurityComponent } from '../svg/security/security.component';
import { GearComponent } from '../svg/gear/gear.component';
import { LogoutComponent } from '../svg/logout/logout.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MainLayoutComponent,
    EditProfileComponent,
    SecurityComponent,
    GearComponent,
    LogoutComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private store = inject(Store<UserState>);
  userFullName = this.store.selectSignal(selectUserName);
}
