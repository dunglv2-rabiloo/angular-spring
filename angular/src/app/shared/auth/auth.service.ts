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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;

  constructor(private http: HttpClient) {}

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
  }
}
