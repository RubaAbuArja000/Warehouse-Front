import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../services/api/user/models/user.model';
import { CreateUserRequest } from '../../../services/api/user/models/user.model';
import { UpdateUserRequest } from '../../../services/api/user/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/users`;

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  create(req: CreateUserRequest): Observable<User> {
    return this.http.post<User>(this.url, req);
  }

  update(id: number, req: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.url}/${id}`, req);
  }

  toggleStatus(id: number, isActive: boolean): Observable<User> {
    return this.http.patch<User>(`${this.url}/${id}/status`, { isActive });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
