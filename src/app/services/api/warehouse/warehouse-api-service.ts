import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Warehouse, CreateWarehouseRequest, UpdateWarehouseRequest } from './models/warehouse.model';

@Injectable({ providedIn: 'root' })
export class WarehouseApiService {
  private http = inject(HttpClient);
  private url  = `${environment.apiUrl}/warehouse`;

  getAll(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.url);
  }

  getById(id: number): Observable<Warehouse> {
    return this.http.get<Warehouse>(`${this.url}/${id}`);
  }

  create(req: CreateWarehouseRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.url, req);
  }

  update(id: number, req: UpdateWarehouseRequest): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.url}/${id}`, req);
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
