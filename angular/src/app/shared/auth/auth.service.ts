import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface User {
  displayName: string;
  avatar: string;
}

interface AuthRespose {
  displayName: string;
  avatar: string;
}

const AUTHENTICATED_KEY = 'authenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated = false;
  user: User | null = null;

  constructor(private http: HttpClient) {
    if (localStorage.getItem(AUTHENTICATED_KEY)) {
      this.authenticated = true;
    }
  }

  async signIn(username: string, password: string) {
    const resp = await firstValueFrom(
      this.http.post<AuthRespose>('/api/auth/login', {
        username,
        password,
      })
    );

    this.user = {
      displayName: resp.displayName,
      avatar: resp.avatar,
    };

    localStorage.setItem(AUTHENTICATED_KEY, 'true');
    this.authenticated = true;
    console.log(this.authenticated);
  }

  async getUserProfiles() {
    const resp = await firstValueFrom(this.http.get<User>('/api/me/profile'));
    this.user = resp;
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
    this.user = null;
    localStorage.removeItem(AUTHENTICATED_KEY);
    this.authenticated = false;
  }
}
