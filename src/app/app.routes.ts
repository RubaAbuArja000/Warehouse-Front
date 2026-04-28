import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth').then((m) => m.AuthComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then((m) => m.LoginComponent),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((m) => m.MainLayoutComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then((m) => m.DashboardComponent),
      },
      {
        path: 'warehouse',
        loadComponent: () =>
          import('./features/warehouse/warehouse').then((m) => m.WarehouseComponent),
      },
      {
        path: 'items',
        loadComponent: () => import('./features/items/items').then((m) => m.ItemsComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./features/users/users').then((m) => m.UsersComponent),
      },
      {
        path: 'logs',
        loadComponent: () => import('./features/logs/logs').then((l) => l.LogsComponent),
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
