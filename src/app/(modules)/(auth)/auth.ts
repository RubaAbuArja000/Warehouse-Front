import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
}

const TOKEN_KEY = 'auth_token';

function readToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

function tokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as { exp?: number };
    return !payload.exp || Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/auth`;

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.endpoint}/login`, request).pipe(
      tap((res) => {
        if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, res.token);
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return readToken();
  }

  isLoggedIn(): boolean {
    const token = readToken();
    return !!token && !tokenExpired(token);
  }
}

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.parseUrl('/auth/login');
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(Auth).getToken();
  if (!token) return next(req);
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
