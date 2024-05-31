import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface User {
  displayName: string;
}

interface AuthRespose {
  displayName: string;
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
    };
  }

  async signOut() {
    console.log('ok');
    this.user = null;
  }
}
