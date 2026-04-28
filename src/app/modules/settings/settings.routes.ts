import { Routes } from '@angular/router';

export const settingsRoutes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'logs',
    loadComponent: () =>
      import('./pages/logs/logs.component').then((m) => m.LogsComponent),
  },
];
