import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { WarehouseItem, CreateWarehouseItemRequest } from './models/warehouse-item.model';

@Injectable({ providedIn: 'root' })
export class WarehouseItemApiService {
  private http = inject(HttpClient);
  private url  = `${environment.apiUrl}/warehouseitem`;

  getAll(): Observable<WarehouseItem[]> {
    return this.http.get<WarehouseItem[]>(this.url);
  }

  getById(id: number): Observable<WarehouseItem> {
    return this.http.get<WarehouseItem>(`${this.url}/${id}`);
  }

  create(req: CreateWarehouseItemRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.url, req);
  }

  update(id: number, req: CreateWarehouseItemRequest): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.url}/${id}`, req);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
