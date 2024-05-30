import { Injectable } from '@angular/core';

interface User {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;

  async signIn(username: string, password: string) {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        this.user = {
          username,
        };
        resolve('ok');
      }, 1000);
    });
  }

  async signOut() {
    console.log('ok');
    this.user = null;
  }
}
