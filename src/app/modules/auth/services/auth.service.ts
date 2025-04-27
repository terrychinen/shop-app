import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '@auth/models/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs';

import { AuthResponse } from '@auth/models/interfaces/auth-response.interface';

import { environment } from 'src/environments/environment';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _baseURL = `${environment.baseUrl}/auth`;
  private _authStatus = signal('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  private _http = inject(HttpClient);

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._user()) return 'authenticated';
    return 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());
  token = computed<string | null>(() => this._token());

  signIn(email: string, password: string) {
    return this._http.post<AuthResponse>(`${this._baseURL}/auth/sign-in`, {
      email,
      password,
    }).pipe(
      tap(res => {
        this._user.set(res.user);
        this._token.set(res.token);
        this._authStatus.set('authenticated');

        localStorage.setItem('token', res.token);
      }),
    );
  }
}
