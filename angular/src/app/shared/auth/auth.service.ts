import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async signIn(username: string, password: string) {
    return new Promise((resolve, _) => {
      setTimeout(() => resolve('ok'), 1000);
    });
  }
}
