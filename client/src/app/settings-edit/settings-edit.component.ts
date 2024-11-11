import { Component, inject } from '@angular/core';
import { RouterService } from '../router.service';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';

import { KeyComponent } from '../svg/key/key.component';
import { ArrowRightComponent } from '../svg/arrow-right/arrow-right.component';
import { DeleteProfileComponent } from '../svg/delete-profile/delete-profile.component';

@Component({
  selector: 'app-settings-edit',
  standalone: true,
  imports: [
    MainLayoutComponent,
    KeyComponent,
    ArrowRightComponent,
    DeleteProfileComponent,
  ],
  templateUrl: './settings-edit.component.html',
  styleUrl: './settings-edit.component.scss',
})
export class SettingsEditComponent {
  routerService = inject(RouterService);
}
