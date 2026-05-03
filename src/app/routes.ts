import { Routes } from '@angular/router';
import { authGuard } from './models/auth';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./(modules)/(auth)/(login)/login-page').then((m) => m.LoginComponent),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((m) => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./(modules)/(dashboard)/dashboard-page').then((m) => m.DashboardComponent),
      },
      {
        path: 'warehouses',
        loadComponent: () =>
          import('./(modules)/(warehouses)/warehouses-page').then((m) => m.WarehousesComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./(modules)/(settings)/settings-page').then((m) => m.SettingsComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];
