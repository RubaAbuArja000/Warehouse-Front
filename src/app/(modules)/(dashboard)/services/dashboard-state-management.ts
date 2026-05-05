import { Injectable, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DashboardApiService } from '../../../services/api/dashboard/dashboard-api-service';
import { WarehouseStatus, DashboardItem } from '../../../models/dashboard.model';

@Injectable()
export class DashboardStateService {
  private api = inject(DashboardApiService);

  status        = signal<WarehouseStatus[]>([]);
  highItems     = signal<DashboardItem[]>([]);
  lowItems      = signal<DashboardItem[]>([]);
  sellingItems  = signal<DashboardItem[]>([]);
  lowStockItems = signal<DashboardItem[]>([]);
  outOfStock    = signal<DashboardItem[]>([]);
  loading       = signal(true);

  load(): void {
    this.loading.set(true);
    forkJoin({
      status:   this.api.getWarehouseStatus(),
      high:     this.api.getTopHighItems(),
      low:      this.api.getTopLowItems(),
      selling:  this.api.getTopSellingItems(),
      lowStock: this.api.getLowStockItems(),
      outStock: this.api.getOutOfStockItems(),
    }).subscribe({
      next: ({ status, high, low, selling, lowStock, outStock }) => {
        this.status.set(status);
        this.highItems.set(high);
        this.lowItems.set(low);
        this.sellingItems.set(selling);
        this.lowStockItems.set(lowStock);
        this.outOfStock.set(outStock);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
