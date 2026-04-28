import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { StorageHelper } from '../helpers/storage.helper';
import { JwtHelper } from '../helpers/jwt.helper';

const TOKEN_KEY = 'auth_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap((res) => StorageHelper.set(TOKEN_KEY, res.token))
    );
  }

  logout(): void {
    StorageHelper.remove(TOKEN_KEY);
  }

  getToken(): string | null {
    return StorageHelper.get(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !JwtHelper.isExpired(token);
  }
}
