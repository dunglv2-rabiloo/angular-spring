import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface User {
  displayName: string;
  avatar: string;
}

interface Token {
  value: string;
  expiredAt: string;
}

interface AuthResponse {
  accessToken: Token;
  refreshToken: Token;
}

const AUTHENTICATED_KEY = 'authenticated';
const ACCESS_TOKEN_EXPIRATION = 'access-expiration';
const REFRESH_TOKEN_EXPIRATION = 'refresh-expiration';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated = false;

  constructor(private http: HttpClient) {
    if (localStorage.getItem(AUTHENTICATED_KEY)) {
      this.authenticated = true;
    }
  }

  async signIn(username: string, password: string) {
    const resp = await firstValueFrom(
      this.http.post<AuthResponse>('/api/auth/login', {
        username,
        password,
      })
    );

    this._processAuthResult(resp);
  }

  async refreshToken() {
    try {
      const resp = await firstValueFrom(
        this.http.post<AuthResponse>('/api/auth/refresh', {})
      );

      this._processAuthResult(resp);
    } catch (e) {
      console.error(e);
    }
  }

  isAccessTokenExpired(): boolean {
    const expiredAt = localStorage.getItem(ACCESS_TOKEN_EXPIRATION);
    return expiredAt != null && new Date(expiredAt as string) < new Date();
  }

  private _processAuthResult(authResult: AuthResponse) {
    localStorage.setItem(AUTHENTICATED_KEY, 'true');
    localStorage.setItem(
      ACCESS_TOKEN_EXPIRATION,
      authResult.accessToken.expiredAt
    );
    localStorage.setItem(
      REFRESH_TOKEN_EXPIRATION,
      authResult.refreshToken.expiredAt
    );
    this.authenticated = true;
  }

  async getUserProfiles() {
    const resp = await firstValueFrom(this.http.get<User>('/api/me/profile'));
    return resp;
  }

  async changeAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    await firstValueFrom(
      this.http.post('/api/me/profile/avatar/upload', formData)
    );
  }

  async signOut() {
    await firstValueFrom(this.http.post('/api/auth/logout', {}));
    localStorage.removeItem(AUTHENTICATED_KEY);
    localStorage.removeItem(ACCESS_TOKEN_EXPIRATION);
    localStorage.removeItem(REFRESH_TOKEN_EXPIRATION);
    this.authenticated = false;
  }
}
