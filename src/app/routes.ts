import { Routes } from '@angular/router';
import { authGuard } from './models/auth';
import { UsersState } from './(modules)/(settings)/state-management/users-state';

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
      import('./shared/main-layout/main-layout').then((m) => m.MainLayoutComponent),
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
        path: 'inventory',
        loadComponent: () =>
          import('./(modules)/(inventory)/inventory-page').then((m) => m.InventoryComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./(modules)/(settings)/settings-page').then((m) => m.SettingsComponent),
        providers: [UsersState],
        children: [
          { path: '', redirectTo: 'users', pathMatch: 'full' },
          {
            path: 'users',
            loadComponent: () =>
              import('./(modules)/(settings)/pages/users/users-list-page').then(
                (m) => m.UsersListPage,
              ),
          },
          {
            path: 'users/new',
            loadComponent: () =>
              import('./(modules)/(settings)/pages/users/user-create-page').then(
                (m) => m.UserCreatePage,
              ),
          },
          {
            path: 'users/:id/edit',
            loadComponent: () =>
              import('./(modules)/(settings)/pages/users/user-edit-page').then(
                (m) => m.UserEditPage,
              ),
          },
          {
            path: 'logs',
            loadComponent: () =>
              import('./(modules)/(settings)/pages/logs/logs-page').then((m) => m.LogsPage),
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];
