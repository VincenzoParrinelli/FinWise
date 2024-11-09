import { Routes } from '@angular/router';
import { LaunchComponent } from './launch/launch.component';
import { OnBoardingComponent } from './on-boarding/on-boarding.component';
import { LoginComponent } from './forms/login/login.component';
import { SignupComponent } from './forms/signup/signup.component';
import { noAuthGuard } from './guards/auth/noAuth.guard';
import { AuthGuard } from './guards/auth/auth.guard';

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
    canActivate: [noAuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    // canActivate: [AuthGuard],
  },
  {
    path: 'analysis',
    loadComponent: () =>
      import('./analysis/analysis.component').then((m) => m.AnalysisComponent),
    // canActivate: [AuthGuard],
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./transactions/transactions.component').then(
        (m) => m.TransactionsComponent
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'transactions/add',
    loadComponent: () =>
      import('./shared/transactions-add/transactions-add.component').then(
        (m) => m.TransactionsAddComponent
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then((m) => m.SettingsComponent),
    // canActivate: [AuthGuard],
  },
  {
    path: 'settings/edit',
    loadComponent: () =>
      import('./settings-edit/settings-edit.component').then(
        (m) => m.SettingsEditComponent
      ),
    // canActivate: [AuthGuard],
  },
];
