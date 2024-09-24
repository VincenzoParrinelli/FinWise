import { Routes } from '@angular/router';
import { LaunchComponent } from './launch/launch.component';
import { OnBoardingComponent } from './on-boarding/on-boarding.component';
import { LoginComponent } from './forms/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/launch',
    pathMatch: 'full',
  },
  {
    path: 'launch',
    component: LaunchComponent,
  },
  {
    path: 'onBoarding',
    component: OnBoardingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
