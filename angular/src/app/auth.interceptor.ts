import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import {
  asyncScheduler,
  from,
  map,
  mergeMap,
  scheduled,
  switchMap,
} from 'rxjs';

async function sendRefreshTokenAndGetNewToken(): Promise<any> {
  return 10;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.url !== '/api/auth/refresh' && authService.isAccessTokenExpired()) {
    return from(authService.refreshToken()).pipe(switchMap(() => next(req)));
  }

  return next(req);
};
