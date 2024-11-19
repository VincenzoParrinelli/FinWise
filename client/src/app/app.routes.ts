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
    path: 'transactions/view',
    loadComponent: () =>
      import('./shared/transactions-view/transactions-view.component').then(
        (m) => m.TransactionsViewComponent
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'transactions/add',
    loadComponent: () =>
      import('./forms/transactions/transactions-form.component').then(
        (m) => m.TransactionsFormComponent
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'transactions/edit',
    loadComponent: () =>
      import('./forms/transactions/transactions-form.component').then(
        (m) => m.TransactionsFormComponent
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'savings',
    loadComponent: () =>
      import('./savings/savings.component').then((m) => m.SavingsComponent),
    // canActivate: [AuthGuard],
  },
  {
    path: 'savings/view',
    loadComponent: () =>
      import('./savings-view/savings-view.component').then(
        (m) => m.SavingsViewComponent
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'savings/add',
    loadComponent: () =>
      import('./forms/savings/savings-form.component').then(
        (m) => m.SavingsFormComponent
      ),
    // canActivate: [AuthGuard],
  },
  // {
  //   path: 'savings/edit',
  //   loadComponent: () =>
  //     import('./savings-edit/').then(
  //       (m) => m.TransactionsFormComponent
  //     ),
  //   // canActivate: [AuthGuard],
  // },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then((m) => m.SettingsComponent),
    // canActivate: [AuthGuard],
  },
  {
    path: 'settings/profile-edit',
    loadComponent: () =>
      import('./profile-edit/profile-edit.component').then(
        (m) => m.ProfileEditComponent
      ),
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
  {
    path: 'settings/edit/password',
    loadComponent: () =>
      import('./password-edit/password-edit.component').then(
        (m) => m.PasswordEditComponent
      ),
    // canActivate: [AuthGuard],
  },
];
