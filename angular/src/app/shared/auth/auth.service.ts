import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface User {
  username: string;
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

  signIn(username: string, password: string) {
    this.http
      .post<AuthRespose>('/api/auth/login', {
        username,
        password,
      })
      .subscribe((resp) => {
        console.log(resp.displayName);
      });
  }

  async signOut() {
    console.log('ok');
    this.user = null;
  }
}
