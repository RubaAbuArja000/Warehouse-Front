import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../modules/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    loadComponent: () =>
      import('../shared/layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../modules/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('../modules/inventory/inventory.routes').then((m) => m.inventoryRoutes),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../modules/settings/settings.routes').then((m) => m.settingsRoutes),
      },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];
