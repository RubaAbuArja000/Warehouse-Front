import { Routes } from '@angular/router';

export const inventoryRoutes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  {
    path: 'items',
    loadComponent: () =>
      import('./pages/items/items.component').then((m) => m.ItemsComponent),
  },
  {
    path: 'warehouse',
    loadComponent: () =>
      import('./pages/warehouse/warehouse.component').then((m) => m.WarehouseComponent),
  },
];
