import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { JwtHelper } from '../../../helpers/jwt.helper';

import { LoginRequest, LoginResponse } from './auth.model';

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

  private claimsCache: Record<string, unknown> | null = null;

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.endpoint}/login`, request).pipe(
      tap((res) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(TOKEN_KEY, res.token);
          this.claimsCache = null;
        }
      }),
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      this.claimsCache = null;
    }
  }

  getToken(): string | null {
    return readToken();
  }

  isLoggedIn(): boolean {
    const token = readToken();
    return !!token && !tokenExpired(token);
  }

  getClaims(): Record<string, unknown> {
    if (this.claimsCache) return this.claimsCache;

    const token = readToken();
    if (!token || tokenExpired(token)) return {};

    this.claimsCache = JwtHelper.decode(token) ?? {};
    return this.claimsCache;
  }

  getUserName(): string {
    const c = this.getClaims();
    return (c['FullName'] as string) ?? (c['name'] as string) ?? 'User';
  }

  getRole(): string {
    const c = this.getClaims();
    return (c['role'] as string) ?? '';
  }

  getInitials(): string {
    return this.getUserName()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return auth.isLoggedIn() ? true : router.parseUrl('/auth/login');
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const token = auth.getToken();

  if (!token || tokenExpired(token)) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
