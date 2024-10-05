import { Routes } from '@angular/router';
import { LaunchComponent } from './launch/launch.component';
import { OnBoardingComponent } from './on-boarding/on-boarding.component';
import { LoginComponent } from './forms/login/login.component';
import { SignupComponent } from './forms/signup/signup.component';
import { AuthGuard } from './store/auth/auth.guard';

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
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [AuthGuard],
  },
];
