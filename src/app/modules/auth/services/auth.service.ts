import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '@auth/models/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, of, tap } from 'rxjs';

import { AuthResponse } from '@auth/models/interfaces/auth-response.interface';

import { environment } from 'src/environments/environment';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _baseURL = `${environment.baseUrl}/auth`;

  private _authStatus = signal('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  private _http = inject(HttpClient);

  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  })

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._user()) return 'authenticated';
    return 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());
  token = computed<string | null>(() => this._token());

  signIn(email: string, password: string): Observable<boolean> {
    return this._http.post<AuthResponse>(`${this._baseURL}/login`, {
      email,
      password,
    }).pipe(
      map(res => this._handleAuthSuccess(res)),
      catchError((error: any) => this._handleAuthError(error)),
    );
  }

  logout(): void {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.clear();
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return of(false);

    return this._http.get<AuthResponse>(`${this._baseURL}/check-status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).pipe(
      map(res => this._handleAuthSuccess(res)),
      catchError((error: any) => this._handleAuthError(error)),
    );
  }

  private _handleAuthSuccess({ token, user }: AuthResponse): boolean {
    this._user.set(user);
    this._token.set(token);
    this._authStatus.set('authenticated');

    localStorage.setItem('token', token);

    return true;
  }

  private _handleAuthError(error: any): Observable<boolean> {
    this.logout();
    return of(false);
  }
}
