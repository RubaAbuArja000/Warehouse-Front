import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { WarehouseStatus, DashboardItem } from '../../../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  private http = inject(HttpClient);
  private url  = `${environment.apiUrl}/dashboard`;

  getWarehouseStatus(): Observable<WarehouseStatus[]> {
    return this.http.get<WarehouseStatus[]>(`${this.url}/warehouse-status`);
  }

  getTopHighItems(): Observable<DashboardItem[]> {
    return this.http.get<DashboardItem[]>(`${this.url}/top-high-items`);
  }

  getTopLowItems(): Observable<DashboardItem[]> {
    return this.http.get<DashboardItem[]>(`${this.url}/top-low-items`);
  }

  getTopSellingItems(): Observable<DashboardItem[]> {
    return this.http.get<DashboardItem[]>(`${this.url}/top-selling-items`);
  }

  getLowStockItems(): Observable<DashboardItem[]> {
    return this.http.get<DashboardItem[]>(`${this.url}/low-stock-items`);
  }

  getOutOfStockItems(): Observable<DashboardItem[]> {
    return this.http.get<DashboardItem[]>(`${this.url}/out-of-stock-items`);
  }
}
